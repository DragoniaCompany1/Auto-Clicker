import React, { useState } from 'react';
import { Disc, Play, Square, Download, Upload, Trash2 } from 'lucide-react';
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
    <div className="glass-panel" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Perekam Makro & Playback Aksi Mouse</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Rekam urutan gerakan kursor & klik mouse lalu putar ulang dengan kecepatan presisi.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={toggleRecording}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: isRecording ? 'var(--accent-pink)' : 'rgba(255, 0, 122, 0.2)',
              color: isRecording ? '#FFF' : 'var(--accent-pink)',
              border: '1px solid var(--accent-pink)',
            }}
          >
            {isRecording ? <Square size={16} /> : <Disc size={16} />}
            {isRecording ? 'Hentikan Rekaman (F9)' : 'Mulai Rekam (F9)'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={{ background: 'var(--bg-input)', borderRadius: '12px', padding: '16px', border: '1px solid var(--border-color)', height: '280px', overflowY: 'auto' }}>
          <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>Daftar Event Terrekam ({config.events.length} event)</h4>
          {config.events.length === 0 ? (
            <p style={{ fontSize: '12px', color: 'var(--text-dim)', textAlign: 'center', marginTop: '80px' }}>
              Tekan tombol "Mulai Rekam (F9)" untuk mulai mencatat aksi mouse Anda.
            </p>
          ) : (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {config.events.map((ev, i) => (
                <li key={i} style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', padding: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                  #{i + 1} - Klik {ev.button?.toUpperCase()} di ({ev.x}, {ev.y}) - Delay: {ev.delayMs}ms
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Kecepatan Playback</label>
            <select
              value={config.playbackSpeed}
              onChange={(e) => onChange({ ...config, playbackSpeed: parseFloat(e.target.value) })}
              style={{ width: '100%' }}
            >
              <option value="1">1x Normal Speed</option>
              <option value="2">2x Fast Speed</option>
              <option value="5">5x Ultra Speed</option>
            </select>
          </div>

          <button
            onClick={() => onChange({ ...config, events: [] })}
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'rgba(255, 0, 122, 0.1)',
              color: 'var(--accent-pink)',
              border: '1px solid rgba(255, 0, 122, 0.3)',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <Trash2 size={14} /> Hapus Makro
          </button>
        </div>
      </div>
    </div>
  );
};
