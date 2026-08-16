import React from 'react';
import { Bookmark, Play, Gamepad2, Zap } from 'lucide-react';
import { Profile, SingleClickerConfig } from '../types';

interface ProfilesProps {
  currentConfig: SingleClickerConfig;
  onLoadConfig: (config: SingleClickerConfig) => void;
}

export const ProfilesPanel: React.FC<ProfilesProps> = ({ currentConfig, onLoadConfig }) => {
  const defaultProfiles: Profile[] = [
    {
      id: 'roblox-pvp',
      name: 'Roblox Fast CPS (50 CPS)',
      description: 'Konfigurasi 50 CPS berkecepatan tinggi ideal untuk game PvP Roblox & Sword Fighting.',
      createdAt: '2026-08-16',
      singleClicker: {
        ...currentConfig,
        turboMode: false,
        interval: { hours: 0, minutes: 0, seconds: 0, milliseconds: 20 },
      },
      multiTarget: { points: [], repeatMode: 'until_stopped', repeatCount: 1, randomizeOrder: false },
      hotkeys: { toggleClicker: 'F6', pickLocation: 'F7', toggleTurbo: 'F8', toggleMacro: 'F9', emergencyStop: 'Escape' },
    },
    {
      id: 'uncapped-max',
      name: 'Uncapped Speed (0ms Turbo)',
      description: 'Kecepatan fisik maksimum hardware (0ms delay) tanpa jeda buatan.',
      createdAt: '2026-08-16',
      singleClicker: {
        ...currentConfig,
        turboMode: true,
      },
      multiTarget: { points: [], repeatMode: 'until_stopped', repeatCount: 1, randomizeOrder: false },
      hotkeys: { toggleClicker: 'F6', pickLocation: 'F7', toggleTurbo: 'F8', toggleMacro: 'F9', emergencyStop: 'Escape' },
    },
  ];

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(0, 240, 255, 0.12)', color: 'var(--accent-cyan)' }}>
            <Gamepad2 size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFF' }}>Manajemen Profil & Preset Game</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Simpan & muat profil preset untuk game Roblox, Mining Simulator, & Otomatisasi.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px' }}>
        {defaultProfiles.map((p) => (
          <div
            key={p.id}
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Bookmark className="text-cyan" size={18} />
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#FFF' }}>{p.name}</h4>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '18px' }}>{p.description}</p>
            </div>

            <button
              onClick={() => onLoadConfig(p.singleClicker)}
              style={{
                padding: '10px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(131, 56, 236, 0.2) 100%)',
                color: 'var(--accent-cyan)',
                border: '1px solid rgba(0, 240, 255, 0.4)',
                fontSize: '13px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Play size={16} fill="var(--accent-cyan)" /> Gunakan Preset Ini
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
