import React from 'react';
import { MousePointer, Target, Disc, Activity, Bookmark, Keyboard, Info } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'single', label: 'Single Clicker', icon: MousePointer },
    { id: 'multi', label: 'Multi Target', icon: Target },
    { id: 'macro', label: 'Perekam Makro', icon: Disc },
    { id: 'benchmark', label: 'CPS Benchmark', icon: Activity },
    { id: 'profiles', label: 'Profil Preset', icon: Bookmark },
    { id: 'hotkeys', label: 'Hotkey (F6-F9)', icon: Keyboard },
    { id: 'about', label: 'Tentang & Lisensi', icon: Info },
  ];

  return (
    <nav className="glass-card" style={{ padding: '8px 10px', display: 'flex', gap: '8px', marginBottom: '22px', overflowX: 'auto' }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              flex: 1,
              padding: '11px 16px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '9px',
              fontSize: '13.5px',
              fontWeight: isActive ? 800 : 600,
              whiteSpace: 'nowrap',
              background: isActive
                ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.18) 0%, rgba(131, 56, 236, 0.18) 100%)'
                : 'transparent',
              color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              border: isActive
                ? '1px solid rgba(0, 240, 255, 0.4)'
                : '1px solid transparent',
              boxShadow: isActive ? '0 0 16px rgba(0, 240, 255, 0.15)' : 'none',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Icon size={17} style={{ color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)' }} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
