import React from 'react';
import { Keyboard, Command, Info } from 'lucide-react';
import { HotkeyConfig } from '../types';

interface HotkeysProps {
  hotkeys: HotkeyConfig;
  onChange: (newHotkeys: HotkeyConfig) => void;
}

export const HotkeysPanel: React.FC<HotkeysProps> = ({ hotkeys, onChange }) => {
  const updateKey = (key: keyof HotkeyConfig, val: string) => {
    onChange({ ...hotkeys, [key]: val.toUpperCase() });
  };

  const hotkeyItems = [
    { key: 'toggleClicker' as const, label: 'Mulai / Hentikan Auto Clicker', desc: 'Bekerja secara global di seluruh OS / Fullscreen Game' },
    { key: 'pickLocation' as const, label: 'Ambil Koordinat Layar Target', desc: 'Menangkap posisi kursor X, Y saat ini' },
    { key: 'toggleTurbo' as const, label: 'Sakelar Turbo Speed (0ms)', desc: 'Mengaktifkan / mematikan mode tanpa batas' },
    { key: 'toggleMacro' as const, label: 'Mulai / Hentikan Perekam Makro', desc: 'Merekam pergerakan & klik mouse secara live' },
    { key: 'emergencyStop' as const, label: 'Darurat Henti Seketika (Kill Switch)', desc: 'Menghentikan seluruh proses otomatisasi' },
  ];

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
        <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(0, 240, 255, 0.12)', color: 'var(--accent-cyan)' }}>
          <Keyboard size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFF' }}>Pengaturan Hotkey Global (Pintasan Keyboard)</h3>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
            Pintasan keyboard ini bekerja di seluruh OS (bahkan saat Roblox dalam mode full screen).
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {hotkeyItems.map((item) => (
          <div
            key={item.key}
            style={{
              background: 'var(--bg-input)',
              padding: '16px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            <div>
              <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFF', marginBottom: '4px' }}>{item.label}</h4>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="key-cap">{hotkeys[item.key]}</span>
              <input
                type="text"
                value={hotkeys[item.key]}
                onChange={(e) => updateKey(item.key, e.target.value)}
                style={{
                  width: '65px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  textAlign: 'center',
                  textTransform: 'uppercase'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
