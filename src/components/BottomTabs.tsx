
import React from 'react';
import { Home, Music, Search } from 'lucide-react';

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomTabs({ activeTab, onTabChange }: BottomTabsProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'library', label: 'Library', icon: Music },
    { id: 'search', label: 'Search', icon: Search },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-t border-border/50 pb-safe">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
