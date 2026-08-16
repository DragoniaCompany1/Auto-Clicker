import React from 'react';
import { Info, Shield, Code, Heart, CheckCircle } from 'lucide-react';

export const AboutPanel: React.FC = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {/* App Info & Authors */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Info className="text-cyan" size={24} />
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Tentang Aplikasi A click</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Versi Enterprise 1.0.0</span>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
          <strong>A click</strong> adalah aplikasi desktop Auto Clicker & Task Automation Suite serbaguna berkecepatan tinggi yang dirancang untuk mendukung berbagai kebutuhan otomatisasi serta game (seperti Roblox, Minecraft, Simulator, & Clicker games).
        </p>

        <div style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
          <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Dibuat Oleh (Developers):
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700 }}>
              <Code size={16} className="text-cyan" />
              <span>axel <span className="text-cyan">(drgxel)</span></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700 }}>
              <Heart size={16} className="text-pink" />
              <span>M.B.A</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--accent-green)' }}>
          <CheckCircle size={16} /> Terkonfigurasi penuh dengan electron-builder siap kompilasi.
        </div>
      </div>

      {/* MIT License & System Info */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Shield className="text-purple" size={24} />
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Lisensi Perangkat Lunak</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>MIT License</span>
          </div>
        </div>

        <div style={{
          background: '#07090D',
          padding: '16px',
          borderRadius: '10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-muted)',
          lineHeight: '1.5',
          height: '240px',
          overflowY: 'auto',
          border: '1px solid var(--border-color)'
        }}>
          <strong>MIT LICENSE</strong><br /><br />
          Copyright (c) 2026 <strong>axel (drgxel) & M.B.A</strong><br /><br />
          Dengan ini diberikan izin, secara gratis, kepada siapapun yang mendapatkan salinan perangkat lunak ini dan file dokumentasi terkait ("Perangkat Lunak"), untuk mempergunakan Perangkat Lunak tanpa pembatasan, termasuk tanpa batasan hak untuk menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, menyisipkan lisensi lanjutan, dan/atau menjual salinan Perangkat Lunak.
        </div>
      </div>
    </div>
  );
};
