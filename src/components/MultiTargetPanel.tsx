import React from 'react';
import { MultiTargetConfig, MultiTargetPoint } from '../types';
import { Plus, Trash2, Crosshair, Play } from 'lucide-react';

interface MultiTargetProps {
  config: MultiTargetConfig;
  onChange: (newConfig: MultiTargetConfig) => void;
  onPickLocationForPoint: (index: number) => void;
}

export const MultiTargetPanel: React.FC<MultiTargetProps> = ({
  config,
  onChange,
  onPickLocationForPoint,
}) => {
  const addPoint = () => {
    const newPoint: MultiTargetPoint = {
      id: Date.now().toString(),
      name: `Titik Klik ${config.points.length + 1}`,
      x: 500,
      y: 500,
      delayAfterMs: 100,
      button: 'left',
      clickType: 'single',
    };
    onChange({
      ...config,
      points: [...config.points, newPoint],
    });
  };

  const removePoint = (id: string) => {
    onChange({
      ...config,
      points: config.points.filter((p) => p.id !== id),
    });
  };

  const updatePoint = (index: number, updated: Partial<MultiTargetPoint>) => {
    const newPoints = [...config.points];
    newPoints[index] = { ...newPoints[index], ...updated };
    onChange({ ...config, points: newPoints });
  };

  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Multi-Target Clicker (Otomatisasi Sekuensial Titik)</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Eksekusi klik pada urutan koordinat $(X_1, Y_1), (X_2, Y_2)$ secara otomatis.
          </p>
        </div>
        <button
          onClick={addPoint}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: 'var(--accent-cyan)',
            color: '#0B0E14',
            fontWeight: 700,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Plus size={16} /> Tambah Titik Baru
        </button>
      </div>

      {config.points.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
          Belum ada titik target. Klik "Tambah Titik Baru" untuk mengkonfigurasi urutan klik.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {config.points.map((pt, idx) => (
            <div
              key={pt.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: 'var(--bg-input)',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
              }}
            >
              <span style={{ fontWeight: 800, color: 'var(--accent-cyan)', fontSize: '14px', width: '24px' }}>
                #{idx + 1}
              </span>
              <input
                type="text"
                value={pt.name}
                onChange={(e) => updatePoint(idx, { name: e.target.value })}
                style={{ flex: 1, minWidth: '120px' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>X:</span>
                <input
                  type="number"
                  value={pt.x}
                  onChange={(e) => updatePoint(idx, { x: parseInt(e.target.value) || 0 })}
                  style={{ width: '70px' }}
                />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Y:</span>
                <input
                  type="number"
                  value={pt.y}
                  onChange={(e) => updatePoint(idx, { y: parseInt(e.target.value) || 0 })}
                  style={{ width: '70px' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Jeda (ms):</span>
                <input
                  type="number"
                  value={pt.delayAfterMs}
                  onChange={(e) => updatePoint(idx, { delayAfterMs: parseInt(e.target.value) || 0 })}
                  style={{ width: '80px' }}
                />
              </div>
              <button
                onClick={() => removePoint(pt.id)}
                style={{ background: 'transparent', color: 'var(--accent-pink)', padding: '6px' }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
