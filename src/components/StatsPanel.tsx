import React from 'react';
import { Gauge, MousePointerClick, Clock, Zap } from 'lucide-react';
import { SystemStats } from '../types';

interface StatsPanelProps {
  stats: SystemStats;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  return (
    <div className="glass-panel" style={{ padding: '16px 24px', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <MousePointerClick className="text-cyan" size={22} />
        <div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Total Klik Sesi Ini</span>
          <h3 style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{stats.totalClicks.toLocaleString('id-ID')}</h3>
        </div>
      </div>

      <div style={{ width: '1px', height: '30px', background: 'var(--border-color)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Gauge className="text-green" size={22} />
        <div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>CPS Saat Ini</span>
          <h3 style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-green)' }}>{stats.currentCPS} CPS</h3>
        </div>
      </div>

      <div style={{ width: '1px', height: '30px', background: 'var(--border-color)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Zap className="text-yellow" size={22} />
        <div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Peak CPS (Kecepatan Puncak)</span>
          <h3 style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-yellow)' }}>{stats.peakCPS} CPS</h3>
        </div>
      </div>

      <div style={{ width: '1px', height: '30px', background: 'var(--border-color)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Clock className="text-purple" size={22} />
        <div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Waktu Aktif</span>
          <h3 style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{stats.activeTimeSeconds} detik</h3>
        </div>
      </div>
    </div>
  );
};
