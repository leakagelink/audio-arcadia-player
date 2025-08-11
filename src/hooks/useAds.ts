
import { useEffect } from 'react';
// Temporarily commented out to fix app crashes
// import { interstitialAdService } from '@/ads/InterstitialAdService';
// import { appOpenAdService } from '@/ads/AppOpenAdService';
// import { adMobService } from '@/ads/AdMobService';

export function useAds() {
  useEffect(() => {
    // Temporarily disabled ad initialization to fix crashes
    console.log('Ad services temporarily disabled for debugging');
    
    // TODO: Re-enable after fixing AdMob configuration
    /*
    const initAds = async () => {
      try {
        console.log('Starting ad services initialization...');
        
        await adMobService.initialize();
        
        await Promise.all([
          interstitialAdService.initialize(),
          appOpenAdService.initialize()
        ]);
        
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
    */
  }, []);

  // Return empty functions to prevent crashes
  const showInterstitial = () => {
    console.log('Interstitial ad disabled');
    return Promise.resolve(false);
  };

  const showAppOpen = () => {
    console.log('App open ad disabled');
    return Promise.resolve(false);
  };

  const onTrackChange = () => {
    console.log('Track change ad trigger disabled');
  };

  return {
    showInterstitial,
    showAppOpen,
    onTrackChange
  };
}
