import React, { useState, useEffect } from 'react';
import { Activity, Gauge, Zap } from 'lucide-react';
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

  return (
    <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
        <Gauge className="text-cyan" size={24} />
        <h3 style={{ fontSize: '18px', fontWeight: 800 }}>CPS Benchmark & Stress Test (5 Detik)</h3>
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '24px' }}>
        Uji kemampuan fisik kursor atau kecepatan Auto Clicker Anda secara real-time.
      </p>

      <div
        onClick={handleClick}
        style={{
          width: '260px',
          height: '160px',
          margin: '0 auto 24px auto',
          borderRadius: '16px',
          background: clicking ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(131, 56, 236, 0.2))' : 'var(--bg-input)',
          border: '2px dashed var(--accent-cyan)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          boxShadow: clicking ? '0 0 25px rgba(0, 240, 255, 0.3)' : 'none',
        }}
      >
        <Zap className="text-cyan" size={32} style={{ marginBottom: '8px' }} />
        <span style={{ fontSize: '16px', fontWeight: 800 }}>
          {clicking ? 'KLIK SECEPAT MUNGKIN!' : 'KLIK DI SINI UNTUK MULAI'}
        </span>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
          Sisa Waktu: {timeLeft}s
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '20px' }}>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Klik</span>
          <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{clicks}</h2>
        </div>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>CPS Rata-Rata</span>
          <h2 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-green)' }}>
            {resultCPS !== null ? resultCPS.toFixed(1) : (clicking ? (clicks / Math.max(1, 5 - timeLeft)).toFixed(1) : '0.0')}
          </h2>
        </div>
      </div>

      {resultCPS !== null && (
        <button
          onClick={resetBenchmark}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          Ulangi Tes
        </button>
      )}
    </div>
  );
};
