
import { useEffect, useState } from 'react';
// Temporarily commented out to fix app crashes
// import { adMobService } from '@/ads/AdMobService';

interface AdBannerManagerProps {
  isNowPlayingOpen: boolean;
  hasCurrentTrack: boolean;
}

export default function AdBannerManager({ isNowPlayingOpen, hasCurrentTrack }: AdBannerManagerProps) {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    // Temporarily disabled banner ads to fix crashes
    console.log('Banner ads temporarily disabled for debugging');
    
    // TODO: Re-enable after fixing AdMob configuration
    /*
    const initBanner = async () => {
      await adMobService.initialize();
      await adMobService.showBanner();
      setIsBannerVisible(true);
    };

    initBanner();

    return () => {
      adMobService.removeBanner();
    };
    */
  }, []);

  useEffect(() => {
    // Temporarily disabled banner hide/show logic
    console.log('Banner visibility logic disabled');
    
    // TODO: Re-enable after fixing AdMob configuration
    /*
    if (isNowPlayingOpen && isBannerVisible) {
      adMobService.hideBanner();
    } else if (!isNowPlayingOpen && isBannerVisible) {
      adMobService.showBanner();
    }
    */
  }, [isNowPlayingOpen, isBannerVisible]);

  // This component doesn't render anything visible
  return null;
}
