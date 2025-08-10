
import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { interstitialAdService } from '@/ads/InterstitialAdService';
import { appOpenAdService } from '@/ads/AppOpenAdService';

export function useAds() {
  useEffect(() => {
    // Initialize and preload ads
    const initAds = async () => {
      await interstitialAdService.preload();
      await appOpenAdService.preload();
    };

    initAds();

    // Handle app state changes for App Open ads
    const handleAppStateChange = (state: { isActive: boolean }) => {
      if (state.isActive) {
        console.log('App resumed, showing App Open ad');
        appOpenAdService.show();
      }
    };

    App.addListener('appStateChange', handleAppStateChange);

    return () => {
      App.removeAllListeners();
    };
  }, []);

  const showInterstitial = () => {
    return interstitialAdService.show();
  };

  const onTrackChange = () => {
    interstitialAdService.onTrackChange();
  };

  return {
    showInterstitial,
    onTrackChange
  };
}
