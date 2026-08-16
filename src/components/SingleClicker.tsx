import React from 'react';
import { SingleClickerConfig, MouseButton, ClickType } from '../types';
import { Clock, Zap, Crosshair, Mouse, Target, Sparkles } from 'lucide-react';

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
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '22px' }}>
      {/* Interval & Speed Controls */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              padding: '8px',
              borderRadius: '10px',
              background: 'rgba(0, 240, 255, 0.12)',
              color: 'var(--accent-cyan)'
            }}>
              <Clock size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#FFF' }}>Interval & Kecepatan Klik</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Pengaturan waktu antar-klik</p>
            </div>
          </div>

          {/* Turbo Speed Switch */}
          <button
            onClick={() => onChange({ ...config, turboMode: !config.turboMode })}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12.5px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: config.turboMode
                ? 'linear-gradient(135deg, rgba(255, 214, 0, 0.25) 0%, rgba(255, 0, 122, 0.25) 100%)'
                : 'var(--bg-input)',
              color: config.turboMode ? 'var(--accent-yellow)' : 'var(--text-secondary)',
              border: config.turboMode ? '1px solid var(--accent-yellow)' : '1px solid var(--border-color)',
              boxShadow: config.turboMode ? '0 0 15px rgba(255, 214, 0, 0.25)' : 'none'
            }}
          >
            <Zap size={16} fill={config.turboMode ? 'var(--accent-yellow)' : 'none'} />
            {config.turboMode ? 'TURBO (0ms Uncapped)' : 'Mode Normal'}
          </button>
        </div>

        {config.turboMode ? (
          <div style={{
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(255, 214, 0, 0.1) 0%, rgba(255, 0, 122, 0.08) 100%)',
            border: '1px solid rgba(255, 214, 0, 0.35)',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-yellow)', fontWeight: 800, fontSize: '15px' }}>
              <Sparkles size={18} /> Mode Turbo Kecepatan Fisik Maksimum (0ms Delay)
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
              Sinyal klik ditembakkan langsung ke event queue sistem operasi tanpa interval buatan untuk throughput CPS tertinggi.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Jam</label>
              <input
                type="number"
                value={config.interval.hours}
                onChange={(e) => updateInterval('hours', parseInt(e.target.value) || 0)}
                style={{ width: '100%', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Menit</label>
              <input
                type="number"
                value={config.interval.minutes}
                onChange={(e) => updateInterval('minutes', parseInt(e.target.value) || 0)}
                style={{ width: '100%', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Detik</label>
              <input
                type="number"
                value={config.interval.seconds}
                onChange={(e) => updateInterval('seconds', parseInt(e.target.value) || 0)}
                style={{ width: '100%', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-cyan)', display: 'block', marginBottom: '6px' }}>Milidetik (ms)</label>
              <input
                type="number"
                value={config.interval.milliseconds}
                onChange={(e) => updateInterval('milliseconds', parseInt(e.target.value) || 0)}
                style={{ width: '100%', fontWeight: 700, fontFamily: 'var(--font-mono)', borderColor: 'var(--accent-cyan)' }}
              />
            </div>
          </div>
        )}

        {/* Quick Presets Chips */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Preset Kecepatan Cepat</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <button
              onClick={() => onChange({ ...config, turboMode: false, interval: { hours: 0, minutes: 0, seconds: 0, milliseconds: 100 } })}
              style={{
                padding: '9px',
                fontSize: '12.5px',
                fontWeight: 700,
                background: !config.turboMode && config.interval.milliseconds === 100 ? 'rgba(0, 240, 255, 0.15)' : 'var(--bg-input)',
                color: !config.turboMode && config.interval.milliseconds === 100 ? 'var(--accent-cyan)' : 'var(--text-primary)',
                borderRadius: 'var(--radius-md)',
                border: !config.turboMode && config.interval.milliseconds === 100 ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)'
              }}
            >
              10 CPS (100ms)
            </button>
            <button
              onClick={() => onChange({ ...config, turboMode: false, interval: { hours: 0, minutes: 0, seconds: 0, milliseconds: 20 } })}
              style={{
                padding: '9px',
                fontSize: '12.5px',
                fontWeight: 700,
                background: !config.turboMode && config.interval.milliseconds === 20 ? 'rgba(0, 240, 255, 0.15)' : 'var(--bg-input)',
                color: !config.turboMode && config.interval.milliseconds === 20 ? 'var(--accent-cyan)' : 'var(--text-primary)',
                borderRadius: 'var(--radius-md)',
                border: !config.turboMode && config.interval.milliseconds === 20 ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)'
              }}
            >
              50 CPS (20ms)
            </button>
            <button
              onClick={() => onChange({ ...config, turboMode: false, interval: { hours: 0, minutes: 0, seconds: 0, milliseconds: 10 } })}
              style={{
                padding: '9px',
                fontSize: '12.5px',
                fontWeight: 700,
                background: !config.turboMode && config.interval.milliseconds === 10 ? 'rgba(0, 240, 255, 0.15)' : 'var(--bg-input)',
                color: !config.turboMode && config.interval.milliseconds === 10 ? 'var(--accent-cyan)' : 'var(--text-primary)',
                borderRadius: 'var(--radius-md)',
                border: !config.turboMode && config.interval.milliseconds === 10 ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)'
              }}
            >
              100 CPS (10ms)
            </button>
          </div>
        </div>
      </div>

      {/* Mouse Button, Click Type & Location Target */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{
              padding: '8px',
              borderRadius: '10px',
              background: 'rgba(131, 56, 236, 0.12)',
              color: 'var(--accent-purple)'
            }}>
              <Mouse size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#FFF' }}>Kontrol Sinyal Mouse</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Tipe klik & lokasi target</p>
            </div>
          </div>

          {/* Mouse Button Picker Cards */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Tombol Mouse Target</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {(['left', 'right', 'middle'] as MouseButton[]).map((btn) => (
                <button
                  key={btn}
                  onClick={() => onChange({ ...config, button: btn })}
                  style={{
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    textTransform: 'capitalize',
                    background: config.button === btn ? 'rgba(131, 56, 236, 0.2)' : 'var(--bg-input)',
                    color: config.button === btn ? 'var(--accent-purple)' : 'var(--text-secondary)',
                    border: config.button === btn ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
                  }}
                >
                  {btn === 'left' ? 'Kiri (Left)' : btn === 'right' ? 'Kanan (Right)' : 'Tengah (Mid)'}
                </button>
              ))}
            </div>
          </div>

          {/* Click Type Pills */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Tipe Klik</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {(['single', 'double', 'triple', 'hold'] as ClickType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => onChange({ ...config, clickType: type })}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '12px',
                    fontWeight: 700,
                    background: config.clickType === type ? 'rgba(0, 240, 255, 0.15)' : 'var(--bg-input)',
                    color: config.clickType === type ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    border: config.clickType === type ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                  }}
                >
                  {type === 'single' ? 'Single Click' : type === 'double' ? 'Double Click' : type === 'triple' ? 'Triple Click' : 'Hold (Tahan)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Location Target Selection */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>Lokasi Target Klik</label>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
              <input
                type="radio"
                name="locationType"
                checked={config.locationType === 'cursor'}
                onChange={() => onChange({ ...config, locationType: 'cursor' })}
              />
              Ikuti Kursor Saat Ini
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
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
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>X:</span>
                <input
                  type="number"
                  value={config.fixedX}
                  onChange={(e) => onChange({ ...config, fixedX: parseInt(e.target.value) || 0 })}
                  style={{ width: '80px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>Y:</span>
                <input
                  type="number"
                  value={config.fixedY}
                  onChange={(e) => onChange({ ...config, fixedY: parseInt(e.target.value) || 0 })}
                  style={{ width: '80px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                />
              </div>
              <button
                onClick={onPickLocation}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, rgba(131, 56, 236, 0.25) 0%, rgba(0, 240, 255, 0.25) 100%)',
                  color: 'var(--accent-cyan)',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Crosshair size={15} /> Ambil Posisi (F7)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
