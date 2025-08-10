
import { AdMob, AdOptions } from '@capacitor-community/admob';
import { ADMOB_CONFIG, AD_SETTINGS } from './config';

class AppOpenAdService {
  private lastShown = 0;
  private isLoaded = false;

  async preload() {
    try {
      const options: AdOptions = {
        adId: ADMOB_CONFIG.appOpenAdUnitId,
        isTesting: true // Set to false for production
      };

      await AdMob.prepareInterstitial(options);
      this.isLoaded = true;
      console.log('App Open ad preloaded');
    } catch (error) {
      console.error('Failed to preload App Open ad:', error);
      this.isLoaded = false;
    }
  }

  async show() {
    const now = Date.now();
    
    // Check cooldown
    if (now - this.lastShown < AD_SETTINGS.appOpenCooldown) {
      console.log('App Open ad on cooldown');
      return false;
    }

    if (!this.isLoaded) {
      await this.preload();
    }

    try {
      await AdMob.showInterstitial();
      this.lastShown = now;
      this.isLoaded = false;
      console.log('App Open ad shown');
      
      // Preload next ad
      setTimeout(() => this.preload(), 1000);
      return true;
    } catch (error) {
      console.error('Failed to show App Open ad:', error);
      return false;
    }
  }
}

export const appOpenAdService = new AppOpenAdService();
