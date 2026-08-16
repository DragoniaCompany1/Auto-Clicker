import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { SingleClicker } from './components/SingleClicker';
import { MultiTargetPanel } from './components/MultiTargetPanel';
import { MacroRecorder } from './components/MacroRecorder';
import { CPSBenchmark } from './components/CPSBenchmark';
import { ProfilesPanel } from './components/ProfilesPanel';
import { HotkeysPanel } from './components/HotkeysPanel';
import { AboutPanel } from './components/AboutPanel';
import { StatsPanel } from './components/StatsPanel';
import { soundFx } from './services/audio';
import { SingleClickerConfig, MultiTargetConfig, MacroConfig, HotkeyConfig, SystemStats } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'multi' | 'macro' | 'benchmark' | 'profiles' | 'hotkeys' | 'about'>('single');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // States
  const [singleConfig, setSingleConfig] = useState<SingleClickerConfig>({
    interval: { hours: 0, minutes: 0, seconds: 0, milliseconds: 100 },
    turboMode: false,
    button: 'left',
    clickType: 'single',
    locationType: 'cursor',
    fixedX: 500,
    fixedY: 500,
    repeatMode: 'until_stopped',
    repeatCount: 100,
    autoStopDurationMs: 0,
    downTimeMs: 2,
    upTimeMs: 2,
  });

  const [multiConfig, setMultiConfig] = useState<MultiTargetConfig>({
    points: [],
    repeatMode: 'until_stopped',
    repeatCount: 1,
    randomizeOrder: false,
  });

  const [macroConfig, setMacroConfig] = useState<MacroConfig>({
    events: [],
    playbackSpeed: 1,
    loop: false,
  });

  const [hotkeyConfig, setHotkeyConfig] = useState<HotkeyConfig>({
    toggleClicker: 'F6',
    pickLocation: 'F7',
    toggleTurbo: 'F8',
    toggleMacro: 'F9',
    emergencyStop: 'Escape',
  });

  const [stats, setStats] = useState<SystemStats>({
    totalClicks: 0,
    currentCPS: 0,
    peakCPS: 0,
    activeTimeSeconds: 0,
    isRunning: false,
    activeTab: 'single',
  });

  // Electron IPC Listeners if running inside Electron
  useEffect(() => {
    if (window.require) {
      const { ipcRenderer } = window.require('electron');

      const handleStatsUpdate = (_: any, data: any) => {
        setStats((prev) => ({
          ...prev,
          isRunning: data.isClicking,
          totalClicks: data.totalClicks,
          currentCPS: data.currentCPS,
          peakCPS: data.peakCPS,
          activeTimeSeconds: data.activeTimeSeconds,
        }));
        if (data.isClicking) {
          soundFx.playClickSound();
        }
      };

      const handleLocationPicked = (_: any, point: { x: number; y: number }) => {
        setSingleConfig((prev) => ({
          ...prev,
          fixedX: point.x,
          fixedY: point.y,
          locationType: 'fixed',
        }));
        soundFx.playStartBeep();
      };

      ipcRenderer.on('clicker-stats-update', handleStatsUpdate);
      ipcRenderer.on('location-picked', handleLocationPicked);

      return () => {
        ipcRenderer.removeListener('clicker-stats-update', handleStatsUpdate);
        ipcRenderer.removeListener('location-picked', handleLocationPicked);
      };
    }
  }, []);

  const handleToggleClicker = () => {
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      if (stats.isRunning) {
        ipcRenderer.send('stop-clicker');
        soundFx.playStopBeep();
      } else {
        ipcRenderer.send('start-clicker', singleConfig);
        soundFx.playStartBeep();
      }
    } else {
      // Dev Browser simulation toggle
      const newRunning = !stats.isRunning;
      setStats((prev) => ({ ...prev, isRunning: newRunning }));
      if (newRunning) soundFx.playStartBeep();
      else soundFx.playStopBeep();
    }
  };

  const handlePickLocation = () => {
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send('get-cursor-pos');
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.enabled = next;
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Header
        isClicking={stats.isRunning}
        onToggleClicker={handleToggleClicker}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main>
        {activeTab === 'single' && (
          <SingleClicker
            config={singleConfig}
            onChange={(cfg) => {
              setSingleConfig(cfg);
              if (window.require) {
                const { ipcRenderer } = window.require('electron');
                ipcRenderer.send('update-config', cfg);
              }
            }}
            onPickLocation={handlePickLocation}
          />
        )}

        {activeTab === 'multi' && (
          <MultiTargetPanel
            config={multiConfig}
            onChange={setMultiConfig}
            onPickLocationForPoint={() => {}}
          />
        )}

        {activeTab === 'macro' && (
          <MacroRecorder config={macroConfig} onChange={setMacroConfig} />
        )}

        {activeTab === 'benchmark' && <CPSBenchmark />}

        {activeTab === 'profiles' && (
          <ProfilesPanel
            currentConfig={singleConfig}
            onLoadConfig={(loaded) => {
              setSingleConfig(loaded);
              setActiveTab('single');
              soundFx.playStartBeep();
            }}
          />
        )}

        {activeTab === 'hotkeys' && (
          <HotkeysPanel
            hotkeys={hotkeyConfig}
            onChange={(hk) => {
              setHotkeyConfig(hk);
              if (window.require) {
                const { ipcRenderer } = window.require('electron');
                ipcRenderer.send('update-hotkeys', hk);
              }
            }}
          />
        )}

        {activeTab === 'about' && <AboutPanel />}
      </main>

      <StatsPanel stats={stats} />
    </div>
  );
};
