import React, { useState, useEffect } from 'react';
import { usePlayer } from '@/contexts/PlayerContext';
import { useAds } from '@/hooks/useAds';
import TrackList from './TrackList';
import SearchScreen from './SearchScreen';
import MiniPlayer from './MiniPlayer';
import NowPlayingSheet from './NowPlayingSheet';
import BottomTabs from './BottomTabs';
import AdBannerManager from './AdBannerManager';

export default function MobilePlayer() {
  const [activeTab, setActiveTab] = useState('home');
  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState(false);
  const { currentTrack, queue } = usePlayer();
  const { showInterstitial, onTrackChange } = useAds();

  // Expose ad functions globally for PlayerContext
  useEffect(() => {
    (window as any).adEvents = {
      showInterstitial,
      onTrackChange
    };

    return () => {
      delete (window as any).adEvents;
    };
  }, [showInterstitial, onTrackChange]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="flex-1 overflow-auto pb-24">
            <div className="p-6 border-b border-border/50">
              <h1 className="text-3xl font-bold gradient-text">Good Evening</h1>
              <p className="text-muted-foreground mt-1">What would you like to hear?</p>
            </div>
            <div className="pt-4">
              <TrackList tracks={queue} />
            </div>
          </div>
        );
      
      case 'library':
        return (
          <div className="flex-1 overflow-auto pb-24">
            <div className="p-6 border-b border-border/50">
              <h1 className="text-3xl font-bold gradient-text">Your Library</h1>
              <p className="text-muted-foreground mt-1">Recently played and favorites</p>
            </div>
            <div className="pt-4">
              <TrackList tracks={queue} />
            </div>
          </div>
        );
      
      case 'search':
        return <SearchScreen />;
      
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-background via-secondary/50 to-background flex flex-col">
      {renderTabContent()}
      
      {currentTrack && (
        <MiniPlayer onExpandClick={() => setIsNowPlayingOpen(true)} />
      )}
      
      <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <NowPlayingSheet 
        isOpen={isNowPlayingOpen} 
        onOpenChange={setIsNowPlayingOpen} 
      />

      <AdBannerManager 
        isNowPlayingOpen={isNowPlayingOpen}
        hasCurrentTrack={!!currentTrack}
      />
    </div>
  );
}
