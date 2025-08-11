
import { useEffect } from 'react';
import { interstitialAdService } from '@/ads/InterstitialAdService';
import { appOpenAdService } from '@/ads/AppOpenAdService';
import { adMobService } from '@/ads/AdMobService';

export function useAds() {
  useEffect(() => {
    // Initialize ad services with delay
    const initAds = async () => {
      try {
        console.log('Starting ad services initialization...');
        
        // Initialize AdMob first
        await adMobService.initialize();
        
        // Then initialize ad services
        await Promise.all([
          interstitialAdService.initialize(),
          appOpenAdService.initialize()
        ]);
        
        // Preload ads after initialization
        setTimeout(async () => {
          await Promise.all([
            interstitialAdService.preload(),
            appOpenAdService.preload()
          ]);
        }, 2000);
        
        console.log('Ad services initialization completed');
      } catch (error) {
        console.error('Failed to initialize ad services:', error);
      }
    };

    initAds();

    // Remove automatic app state change handler for now to prevent crashes
    // We'll add it back once the app is stable
    
  }, []);

  const showInterstitial = () => {
    return interstitialAdService.show();
  };

  const showAppOpen = () => {
    return appOpenAdService.show();
  };

  const onTrackChange = () => {
    interstitialAdService.onTrackChange();
  };

  return {
    showInterstitial,
    showAppOpen,
    onTrackChange
  };
}
