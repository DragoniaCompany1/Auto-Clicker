import React from 'react';
import { Keyboard, AlertCircle } from 'lucide-react';
import { HotkeyConfig } from '../types';

interface HotkeysProps {
  hotkeys: HotkeyConfig;
  onChange: (newHotkeys: HotkeyConfig) => void;
}

export const HotkeysPanel: React.FC<HotkeysProps> = ({ hotkeys, onChange }) => {
  const updateKey = (key: keyof HotkeyConfig, val: string) => {
    onChange({ ...hotkeys, [key]: val.toUpperCase() });
  };

  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <Keyboard className="text-cyan" size={20} />
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Pengaturan Hotkey Global</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Pintasan keyboard ini bekerja di seluruh OS (bahkan saat Roblox dalam mode full screen).
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Mulai / Hentikan Auto Clicker</label>
          <input
            type="text"
            value={hotkeys.toggleClicker}
            onChange={(e) => updateKey('toggleClicker', e.target.value)}
            style={{ width: '100%', fontFamily: 'var(--font-mono)', fontWeight: 700 }}
          />
        </div>

        <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Ambil Koordinat Layar (Picker Target)</label>
          <input
            type="text"
            value={hotkeys.pickLocation}
            onChange={(e) => updateKey('pickLocation', e.target.value)}
            style={{ width: '100%', fontFamily: 'var(--font-mono)', fontWeight: 700 }}
          />
        </div>

        <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Sakelar Turbo Speed (0ms)</label>
          <input
            type="text"
            value={hotkeys.toggleTurbo}
            onChange={(e) => updateKey('toggleTurbo', e.target.value)}
            style={{ width: '100%', fontFamily: 'var(--font-mono)', fontWeight: 700 }}
          />
        </div>

        <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Darurat Henti Seketika (Emergency Stop)</label>
          <input
            type="text"
            value={hotkeys.emergencyStop}
            onChange={(e) => updateKey('emergencyStop', e.target.value)}
            style={{ width: '100%', fontFamily: 'var(--font-mono)', fontWeight: 700 }}
          />
        </div>
      </div>
    </div>
  );
};
