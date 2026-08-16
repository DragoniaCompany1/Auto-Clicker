import React from 'react';
import { Bookmark, Download, Upload, Trash2, Play } from 'lucide-react';
import { Profile, SingleClickerConfig } from '../types';

interface ProfilesProps {
  currentConfig: SingleClickerConfig;
  onLoadConfig: (config: SingleClickerConfig) => void;
}

export const ProfilesPanel: React.FC<ProfilesProps> = ({ currentConfig, onLoadConfig }) => {
  const defaultProfiles: Profile[] = [
    {
      id: 'roblox-pvp',
      name: 'Roblox Fast CPS',
      description: 'Konfigurasi ultra cepat 50 CPS untuk game PVP Roblox.',
      createdAt: '2026-08-07',
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
      name: 'Uncapped Speed 0ms',
      description: 'Kecepatan maksimum fisik hardware (0ms delay).',
      createdAt: '2026-08-07',
      singleClicker: {
        ...currentConfig,
        turboMode: true,
      },
      multiTarget: { points: [], repeatMode: 'until_stopped', repeatCount: 1, randomizeOrder: false },
      hotkeys: { toggleClicker: 'F6', pickLocation: 'F7', toggleTurbo: 'F8', toggleMacro: 'F9', emergencyStop: 'Escape' },
    },
  ];

  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Manajemen Profil & Preset Game</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Simpan, muat, dan ekspor konfigurasi preset untuk game Roblox, Mining, & Automation.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        {defaultProfiles.map((p) => (
          <div
            key={p.id}
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Bookmark className="text-cyan" size={16} />
                <h4 style={{ fontSize: '14px', fontWeight: 700 }}>{p.name}</h4>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>{p.description}</p>
            </div>

            <button
              onClick={() => onLoadConfig(p.singleClicker)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'rgba(0, 240, 255, 0.15)',
                color: 'var(--accent-cyan)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Play size={14} /> Gunakan Preset Ini
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
