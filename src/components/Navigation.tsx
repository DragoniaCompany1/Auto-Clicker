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
    <nav className="glass-panel" style={{ padding: '8px', display: 'flex', gap: '6px', marginBottom: '20px', overflowX: 'auto' }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              background: isActive ? 'rgba(0, 240, 255, 0.12)' : 'transparent',
              color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
              border: isActive ? '1px solid rgba(0, 240, 255, 0.3)' : '1px solid transparent',
            }}
          >
            <Icon size={16} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
