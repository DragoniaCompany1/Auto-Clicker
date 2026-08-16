import React from 'react';
import { Gauge, MousePointerClick, Clock, Zap } from 'lucide-react';
import { SystemStats } from '../types';

interface StatsPanelProps {
  stats: SystemStats;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  return (
    <div className="glass-card" style={{ padding: '18px 28px', marginTop: '22px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.12)', color: 'var(--accent-cyan)' }}>
          <MousePointerClick size={22} />
        </div>
        <div>
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block' }}>Total Klik Sesi Ini</span>
          <h3 style={{ fontSize: '22px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#FFF' }}>
            {stats.totalClicks.toLocaleString('id-ID')}
          </h3>
        </div>
      </div>

      <div style={{ width: '1px', height: '36px', background: 'var(--border-color)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(0, 255, 135, 0.12)', color: 'var(--accent-green)' }}>
          <Gauge size={22} />
        </div>
        <div>
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block' }}>CPS Saat Ini</span>
          <h3 style={{ fontSize: '22px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--accent-green)' }}>
            {stats.currentCPS} CPS
          </h3>
        </div>
      </div>

      <div style={{ width: '1px', height: '36px', background: 'var(--border-color)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255, 214, 0, 0.12)', color: 'var(--accent-yellow)' }}>
          <Zap size={22} />
        </div>
        <div>
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block' }}>Peak CPS (Kecepatan Puncak)</span>
          <h3 style={{ fontSize: '22px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--accent-yellow)' }}>
            {stats.peakCPS} CPS
          </h3>
        </div>
      </div>

      <div style={{ width: '1px', height: '36px', background: 'var(--border-color)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(131, 56, 236, 0.12)', color: 'var(--accent-purple)' }}>
          <Clock size={22} />
        </div>
        <div>
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block' }}>Waktu Aktif</span>
          <h3 style={{ fontSize: '22px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#FFF' }}>
            {stats.activeTimeSeconds} detik
          </h3>
        </div>
      </div>
    </div>
  );
};
