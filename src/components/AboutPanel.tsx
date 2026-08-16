import React, { useState } from 'react';
import { Info, Shield, Code, Heart, CheckCircle2, Copy, Check } from 'lucide-react';

export const AboutPanel: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const licenseText = `MIT LICENSE

Copyright (c) 2026 axel (drgxel) & M.B.A

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

  const copyLicense = () => {
    navigator.clipboard.writeText(licenseText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px' }}>
      {/* App Info & Developers */}
      <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(0, 240, 255, 0.12)', color: 'var(--accent-cyan)' }}>
              <Info size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#FFF' }}>Tentang Aplikasi A click</h3>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-cyan)' }}>Versi Enterprise 1.0.0</span>
            </div>
          </div>

          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '22px' }}>
            <strong>A click</strong> adalah aplikasi desktop Auto Clicker & Task Automation Suite serbaguna berkecepatan tinggi yang dirancang untuk mendukung berbagai kebutuhan otomatisasi serta game (seperti Roblox, Minecraft, Simulator, & Clicker games).
          </p>

          <div style={{
            background: 'var(--bg-input)',
            padding: '18px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            marginBottom: '20px'
          }}>
            <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Dibuat Oleh (Developers):
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 800, color: '#FFF' }}>
                <Code size={18} className="text-cyan" />
                <span>axel <span className="text-cyan">(drgxel)</span></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: 800, color: '#FFF' }}>
                <Heart size={18} className="text-pink" />
                <span>M.B.A</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px', fontWeight: 700, color: 'var(--accent-green)' }}>
          <CheckCircle2 size={18} /> Terkonfigurasi penuh dengan electron-builder siap kompilasi.
        </div>
      </div>

      {/* MIT License Box */}
      <div className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(131, 56, 236, 0.12)', color: 'var(--accent-purple)' }}>
                <Shield size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#FFF' }}>Lisensi Perangkat Lunak</h3>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>MIT License</span>
              </div>
            </div>

            <button
              onClick={copyLicense}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                color: copied ? 'var(--accent-green)' : 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Tersalin!' : 'Salin Lisensi'}
            </button>
          </div>

          <div style={{
            background: 'rgba(7, 9, 14, 0.95)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            height: '240px',
            overflowY: 'auto',
            border: '1px solid var(--border-color)'
          }}>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit' }}>
              {licenseText}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
