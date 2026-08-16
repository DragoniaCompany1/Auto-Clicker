import React from 'react';
import { MousePointer2, Zap, Volume2, VolumeX, ShieldCheck, Sparkles } from 'lucide-react';

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
    <header className="glass-card" style={{ padding: '18px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
      {/* Brand & Developers */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #00F0FF 0%, #8338EC 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.3)',
          position: 'relative'
        }}>
          <MousePointer2 style={{ color: '#07090E', width: '26px', height: '26px' }} />
          <Sparkles style={{ position: 'absolute', top: '-4px', right: '-4px', width: '14px', height: '14px', color: '#FFD600' }} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.6px', color: '#FFFFFF' }}>
              A <span className="text-cyan">click</span>
            </h1>
            <span style={{
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '20px',
              background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.15), rgba(131, 56, 236, 0.2))',
              color: 'var(--accent-cyan)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              letterSpacing: '0.5px'
            }}>
              ENTERPRISE v1.0
            </span>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Dibuat oleh <strong style={{ color: '#F1F5F9', fontWeight: 700 }}>axel (drgxel)</strong> & <strong style={{ color: '#F1F5F9', fontWeight: 700 }}>M.B.A</strong>
          </p>
        </div>
      </div>

      {/* Control Actions & Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Status Indicator Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 18px',
          borderRadius: 'var(--radius-full)',
          background: isClicking ? 'rgba(0, 255, 135, 0.12)' : 'rgba(148, 163, 184, 0.08)',
          border: isClicking ? '1px solid rgba(0, 255, 135, 0.4)' : '1px solid rgba(148, 163, 184, 0.2)',
          boxShadow: isClicking ? '0 0 15px rgba(0, 255, 135, 0.2)' : 'none'
        }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: isClicking ? 'var(--accent-green)' : 'var(--text-muted)',
            boxShadow: isClicking ? '0 0 12px var(--accent-green)' : 'none'
          }} />
          <span style={{
            fontSize: '13px',
            fontWeight: 800,
            color: isClicking ? 'var(--accent-green)' : 'var(--text-secondary)',
            letterSpacing: '0.5px'
          }}>
            {isClicking ? 'BERJALAN (F6)' : 'SIAP (F6)'}
          </span>
        </div>

        {/* Audio FX Mute/Unmute */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Matikan Suara FX' : 'Aktifkan Suara FX'}
          style={{
            background: 'var(--bg-input)',
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            color: soundEnabled ? 'var(--accent-cyan)' : 'var(--text-muted)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        {/* Start / Stop Master Button */}
        <button
          onClick={onToggleClicker}
          className={isClicking ? 'btn-stop-glow' : 'btn-start-glow'}
          style={{
            padding: '12px 28px',
            borderRadius: 'var(--radius-md)',
            fontSize: '14.5px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: isClicking
              ? 'linear-gradient(135deg, #FF007A 0%, #8338EC 100%)'
              : 'linear-gradient(135deg, #00F0FF 0%, #3A86FF 100%)',
            color: isClicking ? '#FFFFFF' : '#07090E',
            letterSpacing: '0.3px',
            boxShadow: isClicking
              ? '0 0 25px rgba(255, 0, 122, 0.4)'
              : '0 0 25px rgba(0, 240, 255, 0.4)'
          }}
        >
          <Zap size={20} fill={isClicking ? '#FFF' : '#07090E'} />
          {isClicking ? 'Hentikan Auto Clicker (F6)' : 'Mulai Auto Clicker (F6)'}
        </button>
      </div>
    </header>
  );
};
