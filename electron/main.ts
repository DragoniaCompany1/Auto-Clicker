import { app, BrowserWindow, ipcMain, globalShortcut, screen } from 'electron';
import path from 'node:path';
import { spawn, ChildProcess } from 'node:child_process';
import fs from 'node:fs';
import { SingleClickerConfig, MultiTargetConfig, HotkeyConfig } from '../src/types';

let mainWindow: BrowserWindow | null = null;
let isClicking = false;
let clickTimer: NodeJS.Timeout | null = null;
let totalClicks = 0;
let clickStartTime = 0;
let lastCpsCalculateTime = 0;
let clicksInLastSecond = 0;
let currentCPS = 0;
let peakCPS = 0;

let clickerDaemon: ChildProcess | null = null;

function initClickerDaemon() {
  if (process.platform !== 'linux') return;

  const nativeClickerPath = path.join(app.getAppPath(), 'native_clicker');
  const rootNativeClickerPath = path.join(__dirname, '../native_clicker');
  const binPath = fs.existsSync(nativeClickerPath) ? nativeClickerPath : rootNativeClickerPath;

  if (fs.existsSync(binPath)) {
    try {
      clickerDaemon = spawn(binPath, ['daemon'], {
        stdio: ['pipe', 'ignore', 'ignore'],
      });
      clickerDaemon.on('exit', () => {
        clickerDaemon = null;
      });
    } catch (e) {
      console.error('Failed to spawn native_clicker daemon', e);
    }
  }
}

// Config state
let currentSingleConfig: SingleClickerConfig = {
  interval: { hours: 0, minutes: 0, seconds: 0, milliseconds: 100 },
  turboMode: false,
  button: 'left',
  clickType: 'single',
  locationType: 'cursor',
  fixedX: 0,
  fixedY: 0,
  repeatMode: 'until_stopped',
  repeatCount: 100,
  autoStopDurationMs: 0,
  downTimeMs: 2,
  upTimeMs: 2,
};

let currentHotkeys: HotkeyConfig = {
  toggleClicker: 'F6',
  pickLocation: 'F7',
  toggleTurbo: 'F8',
  toggleMacro: 'F9',
  emergencyStop: 'Escape',
};

function triggerOSClick(button: string, clickType: string, x?: number, y?: number) {
  let btnNum = 1;
  if (button === 'right') btnNum = 3;
  if (button === 'middle') btnNum = 2;

  let clickRepeat = 1;
  if (clickType === 'double') clickRepeat = 2;
  if (clickType === 'triple') clickRepeat = 3;

  if (process.platform === 'linux') {
    if (!clickerDaemon || clickerDaemon.killed) {
      initClickerDaemon();
    }

    if (clickerDaemon && clickerDaemon.stdin && !clickerDaemon.stdin.destroyed) {
      let cmdStr = `${btnNum} ${clickRepeat}`;
      if (x !== undefined && y !== undefined) {
        cmdStr += ` ${x} ${y}`;
      }
      clickerDaemon.stdin.write(cmdStr + '\n');
    }
  } else if (process.platform === 'win32') {
    // Windows fallback
    const { exec } = require('node:child_process');
    let psCmd = `[Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms");`;
    if (x !== undefined && y !== undefined) {
      psCmd += `[System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point(${x}, ${y});`;
    }
    let eventFlag = button === 'right' ? '0x0008, 0, 0, 0, 0' : '0x0002, 0, 0, 0, 0';
    let upFlag = button === 'right' ? '0x0010, 0, 0, 0, 0' : '0x0004, 0, 0, 0, 0';
    psCmd += `$user32 = Add-Type -memberDefinition '[DllImport("user32.dll")] public static extern void mouse_event(int dwFlags, int dx, int dy, int cButtons, int dwExtraInfo);' -name Win32 -namespace Win32API -passThru;`;
    for (let i = 0; i < clickRepeat; i++) {
      psCmd += `$user32::mouse_event(${eventFlag}); $user32::mouse_event(${upFlag});`;
    }
    exec(`powershell -command "${psCmd}"`);
  }
}

function calculateDelayMs(config: SingleClickerConfig): number {
  if (config.turboMode) return 0;
  const { hours, minutes, seconds, milliseconds } = config.interval;
  const total = hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
  return Math.max(1, total);
}

function startClickerEngine() {
  if (isClicking) return;
  isClicking = true;
  clickStartTime = Date.now();
  lastCpsCalculateTime = Date.now();
  clicksInLastSecond = 0;

  const performClick = () => {
    if (!isClicking) return;

    totalClicks++;
    clicksInLastSecond++;

    triggerOSClick(
      currentSingleConfig.button,
      currentSingleConfig.clickType,
      currentSingleConfig.locationType === 'fixed' ? currentSingleConfig.fixedX : undefined,
      currentSingleConfig.locationType === 'fixed' ? currentSingleConfig.fixedY : undefined
    );

    const now = Date.now();
    if (now - lastCpsCalculateTime >= 1000) {
      currentCPS = clicksInLastSecond;
      if (currentCPS > peakCPS) peakCPS = currentCPS;
      clicksInLastSecond = 0;
      lastCpsCalculateTime = now;
    }

    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('clicker-stats-update', {
        isClicking,
        totalClicks,
        currentCPS,
        peakCPS,
        activeTimeSeconds: Math.floor((now - clickStartTime) / 1000),
      });
    }

    const delay = calculateDelayMs(currentSingleConfig);
    if (delay === 0) {
      setImmediate(performClick);
    } else {
      clickTimer = setTimeout(performClick, delay);
    }
  };

  performClick();
}

function stopClickerEngine() {
  isClicking = false;
  if (clickTimer) {
    clearTimeout(clickTimer);
    clickTimer = null;
  }
  currentCPS = 0;
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('clicker-stats-update', {
      isClicking: false,
      totalClicks,
      currentCPS: 0,
      peakCPS,
      activeTimeSeconds: Math.floor((Date.now() - clickStartTime) / 1000),
    });
  }
}

function registerGlobalHotkeys() {
  globalShortcut.unregisterAll();

  if (currentHotkeys.toggleClicker) {
    try {
      globalShortcut.register(currentHotkeys.toggleClicker, () => {
        if (isClicking) {
          stopClickerEngine();
        } else {
          startClickerEngine();
        }
      });
    } catch (e) {}
  }

  if (currentHotkeys.emergencyStop) {
    try {
      globalShortcut.register(currentHotkeys.emergencyStop, () => {
        stopClickerEngine();
      });
    } catch (e) {}
  }

  if (currentHotkeys.pickLocation) {
    try {
      globalShortcut.register(currentHotkeys.pickLocation, () => {
        const point = screen.getCursorScreenPoint();
        currentSingleConfig.fixedX = point.x;
        currentSingleConfig.fixedY = point.y;
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('location-picked', { x: point.x, y: point.y });
        }
      });
    } catch (e) {}
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1050,
    height: 750,
    minWidth: 900,
    minHeight: 650,
    frame: true,
    title: 'A click - Enterprise Auto Clicker',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  registerGlobalHotkeys();
}

app.whenReady().then(() => {
  initClickerDaemon();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('will-quit', () => {
  if (clickerDaemon) {
    clickerDaemon.kill();
  }
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC Handlers
ipcMain.on('start-clicker', (_, config: SingleClickerConfig) => {
  currentSingleConfig = config;
  startClickerEngine();
});

ipcMain.on('stop-clicker', () => {
  stopClickerEngine();
});

ipcMain.on('update-config', (_, config: SingleClickerConfig) => {
  currentSingleConfig = config;
});

ipcMain.on('update-hotkeys', (_, hotkeys: HotkeyConfig) => {
  currentHotkeys = hotkeys;
  registerGlobalHotkeys();
});

ipcMain.on('get-cursor-pos', (event) => {
  const point = screen.getCursorScreenPoint();
  event.reply('cursor-pos', { x: point.x, y: point.y });
});
