
import { AdMob, AdOptions } from '@capacitor-community/admob';
import { ADMOB_CONFIG, AD_SETTINGS } from './config';

class AppOpenAdService {
  private lastShown = 0;
  private isLoaded = false;
  private isLoading = false;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      console.log('Initializing App Open Ad Service...');
      await new Promise(resolve => setTimeout(resolve, AD_SETTINGS.adInitDelay));
      this.isInitialized = true;
      console.log('App Open Ad Service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize App Open Ad Service:', error);
    }
  }

  async preload() {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (this.isLoading || this.isLoaded) {
      console.log('App Open ad already loading or loaded');
      return;
    }

    this.isLoading = true;

    try {
      const options: AdOptions = {
        adId: ADMOB_CONFIG.appOpenAdUnitId,
        isTesting: true
      };

      // Use prepareInterstitial for App Open ads as they use similar API
      await AdMob.prepareInterstitial(options);
      this.isLoaded = true;
      this.isLoading = false;
      console.log('App Open ad preloaded successfully');
    } catch (error) {
      console.error('Failed to preload App Open ad:', error);
      this.isLoaded = false;
      this.isLoading = false;
    }
  }

  async show() {
    if (!this.isInitialized) {
      console.log('App Open ad service not initialized');
      return false;
    }

    const now = Date.now();
    
    // Check cooldown
    if (now - this.lastShown < AD_SETTINGS.appOpenCooldown) {
      console.log('App Open ad on cooldown');
      return false;
    }

    // Add delay before showing app open ad
    await new Promise(resolve => setTimeout(resolve, AD_SETTINGS.appOpenDelay));

    if (!this.isLoaded) {
      console.log('App Open ad not loaded, attempting to preload...');
      await this.preload();
      
      if (!this.isLoaded) {
        console.log('Failed to load App Open ad');
        return false;
      }
    }

    try {
      // Use showInterstitial for App Open ads as they use similar API
      await AdMob.showInterstitial();
      this.lastShown = now;
      this.isLoaded = false;
      console.log('App Open ad shown successfully');
      
      // Preload next ad after a delay
      setTimeout(() => this.preload(), 2000);
      return true;
    } catch (error) {
      console.error('Failed to show App Open ad:', error);
      this.isLoaded = false;
      return false;
    }
  }
}

export const appOpenAdService = new AppOpenAdService();
