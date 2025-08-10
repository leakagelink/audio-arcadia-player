
import { useEffect, useState } from 'react';
import { adMobService } from '@/ads/AdMobService';

interface AdBannerManagerProps {
  isNowPlayingOpen: boolean;
  hasCurrentTrack: boolean;
}

export default function AdBannerManager({ isNowPlayingOpen, hasCurrentTrack }: AdBannerManagerProps) {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    // Show banner when app loads
    const initBanner = async () => {
      await adMobService.initialize();
      await adMobService.showBanner();
      setIsBannerVisible(true);
    };

    initBanner();

    // Cleanup on unmount
    return () => {
      adMobService.removeBanner();
    };
  }, []);

  useEffect(() => {
    // Hide banner when Now Playing sheet is open
    if (isNowPlayingOpen && isBannerVisible) {
      adMobService.hideBanner();
    } else if (!isNowPlayingOpen && isBannerVisible) {
      adMobService.showBanner();
    }
  }, [isNowPlayingOpen, isBannerVisible]);

  // This component doesn't render anything visible
  return null;
}
