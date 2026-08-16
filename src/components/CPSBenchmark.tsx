import React, { useState, useEffect } from 'react';
import { Gauge, Zap, Trophy, RotateCcw } from 'lucide-react';
import { soundFx } from '../services/audio';

export const CPSBenchmark: React.FC = () => {
  const [clicking, setClicking] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [resultCPS, setResultCPS] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (clicking && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && clicking) {
      setClicking(false);
      setResultCPS(clicks / 5);
      soundFx.playStartBeep();
    }
    return () => clearInterval(timer);
  }, [clicking, timeLeft, clicks]);

  const handleClick = () => {
    if (!clicking && timeLeft === 5) {
      setClicking(true);
      setClicks(1);
    } else if (clicking) {
      setClicks((prev) => prev + 1);
    }
    soundFx.playClickSound();
  };

  const resetBenchmark = () => {
    setClicking(false);
    setClicks(0);
    setTimeLeft(5);
    setResultCPS(null);
  };

  const getRankBadge = (cps: number) => {
    if (cps >= 50) return { title: '⚡ GODLIKE TURBO', color: 'var(--accent-yellow)' };
    if (cps >= 25) return { title: '🔥 LIGHTNING FAST', color: 'var(--accent-cyan)' };
    if (cps >= 12) return { title: '⚡ PRO CLICKER', color: 'var(--accent-green)' };
    return { title: '👍 REGULAR SPEED', color: 'var(--text-secondary)' };
  };

  return (
    <div className="glass-card" style={{ padding: '28px', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
        <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(0, 240, 255, 0.12)', color: 'var(--accent-cyan)' }}>
          <Gauge size={24} />
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#FFF' }}>CPS Benchmark & Stress Test (5 Detik)</h3>
      </div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Uji batas kemampuan fisik mouse atau kecepatan Auto Clicker Anda secara real-time.
      </p>

      {/* Interactive Hit Arena */}
      <div
        onClick={handleClick}
        className={clicking ? 'btn-start-glow' : ''}
        style={{
          width: '280px',
          height: '170px',
          margin: '0 auto 24px auto',
          borderRadius: 'var(--radius-lg)',
          background: clicking ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.25) 0%, rgba(131, 56, 236, 0.25) 100%)' : 'var(--bg-input)',
          border: clicking ? '2px solid var(--accent-cyan)' : '2px dashed var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'all 0.15s ease',
          boxShadow: clicking ? '0 0 35px rgba(0, 240, 255, 0.4)' : 'none',
        }}
      >
        <Zap className="text-cyan floating-element" size={36} style={{ marginBottom: '10px' }} />
        <span style={{ fontSize: '17px', fontWeight: 900, color: '#FFF' }}>
          {clicking ? 'KLIK SECEPAT MUNGKIN!' : 'TEKAN UNTUK MULAI TES'}
        </span>
        <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--accent-yellow)', marginTop: '6px' }}>
          Sisa Waktu: {timeLeft} Detik
        </span>
      </div>

      {/* Stats Counter Display */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-input)', padding: '14px 28px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>Total Klik</span>
          <h2 style={{ fontSize: '32px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#FFF' }}>{clicks}</h2>
        </div>

        <div style={{ background: 'var(--bg-input)', padding: '14px 28px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>Rata-Rata CPS</span>
          <h2 style={{ fontSize: '32px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--accent-green)' }}>
            {resultCPS !== null ? resultCPS.toFixed(1) : (clicking ? (clicks / Math.max(1, 5 - timeLeft)).toFixed(1) : '0.0')}
          </h2>
        </div>
      </div>

      {resultCPS !== null && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <div style={{
            padding: '8px 20px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 214, 0, 0.15)',
            border: '1px solid var(--accent-yellow)',
            color: getRankBadge(resultCPS).color,
            fontWeight: 800,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Trophy size={18} /> Rank: {getRankBadge(resultCPS).title}
          </div>

          <button
            onClick={resetBenchmark}
            style={{
              padding: '10px 24px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <RotateCcw size={16} /> Ulangi Tes CPS
          </button>
        </div>
      )}
    </div>
  );
};
