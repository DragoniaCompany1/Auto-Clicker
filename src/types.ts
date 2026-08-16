export type MouseButton = 'left' | 'right' | 'middle';
export type ClickType = 'single' | 'double' | 'triple' | 'hold';
export type LocationType = 'cursor' | 'fixed';

export interface IntervalConfig {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface SingleClickerConfig {
  interval: IntervalConfig;
  turboMode: boolean;
  button: MouseButton;
  clickType: ClickType;
  locationType: LocationType;
  fixedX: number;
  fixedY: number;
  repeatMode: 'until_stopped' | 'count';
  repeatCount: number;
  autoStopDurationMs: number; // 0 = off
  downTimeMs: number;
  upTimeMs: number;
}

export interface MultiTargetPoint {
  id: string;
  name: string;
  x: number;
  y: number;
  delayAfterMs: number;
  button: MouseButton;
  clickType: ClickType;
}

export interface MultiTargetConfig {
  points: MultiTargetPoint[];
  repeatMode: 'until_stopped' | 'count';
  repeatCount: number;
  randomizeOrder: boolean;
}

export interface MacroEvent {
  type: 'click' | 'move';
  x: number;
  y: number;
  button?: MouseButton;
  delayMs: number;
}

export interface MacroConfig {
  events: MacroEvent[];
  playbackSpeed: number; // 1x, 2x, 5x
  loop: boolean;
}

export interface HotkeyConfig {
  toggleClicker: string; // e.g. 'F6'
  pickLocation: string;  // e.g. 'F7'
  toggleTurbo: string;    // e.g. 'F8'
  toggleMacro: string;    // e.g. 'F9'
  emergencyStop: string;  // e.g. 'Escape'
}

export interface Profile {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  singleClicker: SingleClickerConfig;
  multiTarget: MultiTargetConfig;
  hotkeys: HotkeyConfig;
}

export interface SystemStats {
  totalClicks: number;
  currentCPS: number;
  peakCPS: number;
  activeTimeSeconds: number;
  isRunning: boolean;
  activeTab: 'single' | 'multi' | 'macro' | 'benchmark' | 'profiles' | 'hotkeys' | 'about';
}
