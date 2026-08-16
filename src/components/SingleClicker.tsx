import React from 'react';
import { SingleClickerConfig, MouseButton, ClickType, LocationType } from '../types';
import { Clock, Zap, Crosshair, RefreshCw, ShieldAlert } from 'lucide-react';

interface SingleClickerProps {
  config: SingleClickerConfig;
  onChange: (newConfig: SingleClickerConfig) => void;
  onPickLocation: () => void;
}

export const SingleClicker: React.FC<SingleClickerProps> = ({
  config,
  onChange,
  onPickLocation,
}) => {
  const updateInterval = (field: keyof SingleClickerConfig['interval'], val: number) => {
    onChange({
      ...config,
      interval: {
        ...config.interval,
        [field]: Math.max(0, val),
      },
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {/* Interval & Turbo */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock className="text-cyan" size={20} />
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Interval & Kecepatan Klik</h3>
          </div>

          {/* Turbo Toggle */}
          <button
            onClick={() => onChange({ ...config, turboMode: !config.turboMode })}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: config.turboMode ? 'rgba(255, 214, 0, 0.2)' : 'var(--bg-input)',
              color: config.turboMode ? 'var(--accent-yellow)' : 'var(--text-muted)',
              border: config.turboMode ? '1px solid var(--accent-yellow)' : '1px solid var(--border-color)',
            }}
          >
            <Zap size={14} />
            {config.turboMode ? 'TURBO (0ms Uncapped)' : 'Mode Normal'}
          </button>
        </div>

        {config.turboMode ? (
          <div style={{
            padding: '16px',
            borderRadius: '10px',
            background: 'rgba(255, 214, 0, 0.08)',
            border: '1px solid rgba(255, 214, 0, 0.3)',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-yellow)', fontWeight: 700, fontSize: '14px' }}>
              <Zap size={16} /> Mode Turbo Kecepatan Fisik Maksimum (0ms Delay)
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Auto clicker akan menembakkan klik secepat batas hardware dan CPU tanpa delay buatan.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Jam</label>
              <input
                type="number"
                value={config.interval.hours}
                onChange={(e) => updateInterval('hours', parseInt(e.target.value) || 0)}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Menit</label>
              <input
                type="number"
                value={config.interval.minutes}
                onChange={(e) => updateInterval('minutes', parseInt(e.target.value) || 0)}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Detik</label>
              <input
                type="number"
                value={config.interval.seconds}
                onChange={(e) => updateInterval('seconds', parseInt(e.target.value) || 0)}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Milidetik (ms)</label>
              <input
                type="number"
                value={config.interval.milliseconds}
                onChange={(e) => updateInterval('milliseconds', parseInt(e.target.value) || 0)}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        )}

        {/* Quick Presets */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onChange({ ...config, turboMode: false, interval: { hours: 0, minutes: 0, seconds: 0, milliseconds: 100 } })}
            style={{ flex: 1, padding: '6px', fontSize: '12px', background: 'var(--bg-input)', color: 'var(--text-main)', borderRadius: '6px', border: '1px solid var(--border-color)' }}
          >
            10 CPS (100ms)
          </button>
          <button
            onClick={() => onChange({ ...config, turboMode: false, interval: { hours: 0, minutes: 0, seconds: 0, milliseconds: 20 } })}
            style={{ flex: 1, padding: '6px', fontSize: '12px', background: 'var(--bg-input)', color: 'var(--text-main)', borderRadius: '6px', border: '1px solid var(--border-color)' }}
          >
            50 CPS (20ms)
          </button>
          <button
            onClick={() => onChange({ ...config, turboMode: false, interval: { hours: 0, minutes: 0, seconds: 0, milliseconds: 10 } })}
            style={{ flex: 1, padding: '6px', fontSize: '12px', background: 'var(--bg-input)', color: 'var(--text-main)', borderRadius: '6px', border: '1px solid var(--border-color)' }}
          >
            100 CPS (10ms)
          </button>
        </div>
      </div>

      {/* Mouse Button & Click Options */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Crosshair className="text-purple" size={20} />
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Pengaturan Mouse & Tipe Klik</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Tombol Mouse</label>
            <select
              value={config.button}
              onChange={(e) => onChange({ ...config, button: e.target.value as MouseButton })}
              style={{ width: '100%' }}
            >
              <option value="left">Kiri (Left Click)</option>
              <option value="right">Kanan (Right Click)</option>
              <option value="middle">Tengah (Middle Click)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Tipe Klik</label>
            <select
              value={config.clickType}
              onChange={(e) => onChange({ ...config, clickType: e.target.value as ClickType })}
              style={{ width: '100%' }}
            >
              <option value="single">Single Click (Klik Tunggal)</option>
              <option value="double">Double Click (Klik Ganda)</option>
              <option value="triple">Triple Click</option>
              <option value="hold">Hold Down (Tahan)</option>
            </select>
          </div>
        </div>

        {/* Location Picker */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Lokasi Klik Target</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px' }}>
              <input
                type="radio"
                name="locationType"
                checked={config.locationType === 'cursor'}
                onChange={() => onChange({ ...config, locationType: 'cursor' })}
              />
              Ikuti Kursor Saat Ini
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px' }}>
              <input
                type="radio"
                name="locationType"
                checked={config.locationType === 'fixed'}
                onChange={() => onChange({ ...config, locationType: 'fixed' })}
              />
              Koordinat Tetap (X, Y)
            </label>
          </div>

          {config.locationType === 'fixed' && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px', alignItems: 'center' }}>
              <input
                type="number"
                placeholder="X"
                value={config.fixedX}
                onChange={(e) => onChange({ ...config, fixedX: parseInt(e.target.value) || 0 })}
                style={{ width: '90px' }}
              />
              <input
                type="number"
                placeholder="Y"
                value={config.fixedY}
                onChange={(e) => onChange({ ...config, fixedY: parseInt(e.target.value) || 0 })}
                style={{ width: '90px' }}
              />
              <button
                onClick={onPickLocation}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: 'rgba(131, 56, 236, 0.2)',
                  color: 'var(--accent-purple)',
                  border: '1px solid rgba(131, 56, 236, 0.4)'
                }}
              >
                Pilih Lokasi (F7)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
