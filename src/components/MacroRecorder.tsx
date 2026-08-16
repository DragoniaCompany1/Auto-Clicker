import React, { useState } from 'react';
import { Disc, Play, Square, Trash2, Video, Gauge } from 'lucide-react';
import { MacroConfig } from '../types';

interface MacroRecorderProps {
  config: MacroConfig;
  onChange: (newConfig: MacroConfig) => void;
}

export const MacroRecorder: React.FC<MacroRecorderProps> = ({ config, onChange }) => {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            padding: '8px',
            borderRadius: '10px',
            background: 'rgba(255, 0, 122, 0.12)',
            color: 'var(--accent-pink)'
          }}>
            <Video size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFF' }}>Perekam Makro & Playback Aksi Mouse</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Rekam urutan gerakan kursor & klik mouse lalu putar ulang secara otomatis.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={toggleRecording}
            className={isRecording ? 'btn-stop-glow' : ''}
            style={{
              padding: '11px 22px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 800,
              fontSize: '13.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              background: isRecording ? 'var(--accent-pink)' : 'linear-gradient(135deg, rgba(255, 0, 122, 0.25) 0%, rgba(131, 56, 236, 0.25) 100%)',
              color: isRecording ? '#FFF' : 'var(--accent-pink)',
              border: '1px solid var(--accent-pink)',
              boxShadow: isRecording ? '0 0 20px rgba(255, 0, 122, 0.4)' : 'none'
            }}
          >
            {isRecording ? <Square size={18} fill="#FFF" /> : <Disc size={18} />}
            {isRecording ? 'Hentikan Rekaman (F9)' : 'Mulai Rekam (F9)'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '22px' }}>
        <div style={{
          background: 'var(--bg-input)',
          borderRadius: 'var(--radius-md)',
          padding: '18px',
          border: '1px solid var(--border-color)',
          height: '290px',
          overflowY: 'auto'
        }}>
          <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Daftar Event Terrekam ({config.events.length} event)</span>
            {isRecording && (
              <span style={{ fontSize: '11px', color: 'var(--accent-pink)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-pink)' }} className="active-danger-glow" />
                RECORDING LIVE
              </span>
            )}
          </h4>

          {config.events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <Disc size={32} style={{ opacity: 0.4, marginBottom: '8px' }} />
              <p style={{ fontSize: '12.5px' }}>Tekan tombol "Mulai Rekam (F9)" untuk mencatat pergerakan & klik mouse Anda.</p>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {config.events.map((ev, i) => (
                <li key={i} style={{
                  fontSize: '12.5px',
                  fontFamily: 'var(--font-mono)',
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>#{i + 1} - Klik {ev.button?.toUpperCase()} di ({ev.x}, {ev.y})</span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{ev.delayMs}ms</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'space-between' }}>
          <div>
            <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Kecepatan Playback</label>
            <select
              value={config.playbackSpeed}
              onChange={(e) => onChange({ ...config, playbackSpeed: parseFloat(e.target.value) })}
              style={{ width: '100%', fontWeight: 700 }}
            >
              <option value="1">1x Normal Speed</option>
              <option value="2">2x Fast Speed</option>
              <option value="5">5x Ultra Speed</option>
            </select>
          </div>

          <button
            onClick={() => onChange({ ...config, events: [] })}
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 0, 122, 0.12)',
              color: 'var(--accent-pink)',
              border: '1px solid rgba(255, 0, 122, 0.3)',
              fontSize: '13px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Trash2 size={16} /> Hapus Seluruh Makro
          </button>
        </div>
      </div>
    </div>
  );
};
