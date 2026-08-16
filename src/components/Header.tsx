import React from 'react';
import { MousePointer2, Zap, ShieldCheck, Volume2, VolumeX } from 'lucide-react';
import { soundFx } from '../services/audio';

interface HeaderProps {
  isClicking: boolean;
  onToggleClicker: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isClicking,
  onToggleClicker,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="glass-panel" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #00F0FF, #8338EC)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)'
        }}>
          <MousePointer2 style={{ color: '#0B0E14', width: '24px', height: '24px' }} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px' }}>
              A <span className="text-cyan">click</span>
            </h1>
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '20px',
              background: 'rgba(0, 240, 255, 0.15)',
              color: 'var(--accent-cyan)',
              border: '1px solid rgba(0, 240, 255, 0.3)'
            }}>
              ENTERPRISE v1.0
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Dibuat oleh <strong style={{ color: '#fff' }}>axel (drgxel)</strong> & <strong style={{ color: '#fff' }}>M.B.A</strong>
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Status Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '20px',
          background: isClicking ? 'rgba(0, 255, 135, 0.1)' : 'rgba(148, 163, 184, 0.1)',
          border: isClicking ? '1px solid rgba(0, 255, 135, 0.3)' : '1px solid rgba(148, 163, 184, 0.2)'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isClicking ? 'var(--accent-green)' : 'var(--text-dim)',
            boxShadow: isClicking ? '0 0 10px var(--accent-green)' : 'none'
          }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: isClicking ? 'var(--accent-green)' : 'var(--text-muted)' }}>
            {isClicking ? 'BERJALAN (F6)' : 'SIAP (F6)'}
          </span>
        </div>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Matikan Suara FX' : 'Aktifkan Suara FX'}
          style={{
            background: 'var(--bg-input)',
            padding: '10px',
            borderRadius: '10px',
            color: soundEnabled ? 'var(--accent-cyan)' : 'var(--text-dim)',
            border: '1px solid var(--border-color)'
          }}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        {/* Main Start / Stop Toggle */}
        <button
          onClick={onToggleClicker}
          className={isClicking ? 'active-danger-glow' : 'active-glow'}
          style={{
            padding: '10px 24px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: isClicking
              ? 'linear-gradient(135deg, #FF007A, #8338EC)'
              : 'linear-gradient(135deg, #00F0FF, #3A86FF)',
            color: isClicking ? '#FFFFFF' : '#0B0E14',
          }}
        >
          <Zap size={18} />
          {isClicking ? 'Hentikan (F6)' : 'Mulai Auto Clicker'}
        </button>
      </div>
    </header>
  );
};
