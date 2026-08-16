import React from 'react';
import { MultiTargetConfig, MultiTargetPoint } from '../types';
import { Plus, Trash2, Target, Crosshair, Layers } from 'lucide-react';

interface MultiTargetProps {
  config: MultiTargetConfig;
  onChange: (newConfig: MultiTargetConfig) => void;
  onPickLocationForPoint: (index: number) => void;
}

export const MultiTargetPanel: React.FC<MultiTargetProps> = ({
  config,
  onChange,
}) => {
  const addPoint = () => {
    const newPoint: MultiTargetPoint = {
      id: Date.now().toString(),
      name: `Target #${config.points.length + 1}`,
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
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            padding: '8px',
            borderRadius: '10px',
            background: 'rgba(0, 240, 255, 0.12)',
            color: 'var(--accent-cyan)'
          }}>
            <Layers size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFF' }}>Multi-Target Clicker (Otomatisasi Sekuensial Titik)</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Eksekusi klik pada urutan koordinat $(X_1, Y_1), (X_2, Y_2)$ secara otomatis.
            </p>
          </div>
        </div>

        <button
          onClick={addPoint}
          style={{
            padding: '10px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #00F0FF 0%, #3A86FF 100%)',
            color: '#07090E',
            fontWeight: 800,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 0 16px rgba(0, 240, 255, 0.3)'
          }}
        >
          <Plus size={18} /> Tambah Titik Target Baru
        </button>
      </div>

      {config.points.length === 0 ? (
        <div style={{
          padding: '50px 20px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          border: '2px dashed var(--border-color)',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(12, 17, 29, 0.4)'
        }}>
          <Target size={36} className="text-cyan" style={{ opacity: 0.5, marginBottom: '12px' }} />
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Belum Ada Titik Target</h4>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Klik "Tambah Titik Target Baru" di atas untuk menambahkan urutan koordinat klik.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {config.points.map((pt, idx) => (
            <div
              key={pt.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 18px',
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(0, 240, 255, 0.15)',
                color: 'var(--accent-cyan)',
                fontWeight: 800,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                fontFamily: 'var(--font-mono)'
              }}>
                #{idx + 1}
              </div>

              <input
                type="text"
                value={pt.name}
                onChange={(e) => updatePoint(idx, { name: e.target.value })}
                style={{ flex: 1, minWidth: '140px', fontWeight: 700 }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>X:</span>
                <input
                  type="number"
                  value={pt.x}
                  onChange={(e) => updatePoint(idx, { x: parseInt(e.target.value) || 0 })}
                  style={{ width: '75px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                />
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Y:</span>
                <input
                  type="number"
                  value={pt.y}
                  onChange={(e) => updatePoint(idx, { y: parseInt(e.target.value) || 0 })}
                  style={{ width: '75px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Jeda (ms):</span>
                <input
                  type="number"
                  value={pt.delayAfterMs}
                  onChange={(e) => updatePoint(idx, { delayAfterMs: parseInt(e.target.value) || 0 })}
                  style={{ width: '85px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <button
                onClick={() => removePoint(pt.id)}
                title="Hapus Titik Ini"
                style={{
                  background: 'rgba(255, 0, 122, 0.12)',
                  color: 'var(--accent-pink)',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 0, 122, 0.3)'
                }}
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
