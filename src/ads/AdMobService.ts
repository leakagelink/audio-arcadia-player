
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { ADMOB_CONFIG, AD_SETTINGS } from './config';

class AdMobService {
  private isInitialized = false;
  private isInitializing = false;

  async initialize() {
    if (this.isInitialized || this.isInitializing) return;
    
    this.isInitializing = true;
    
    try {
      console.log('Initializing AdMob...');
      
      // Add delay before initializing AdMob
      await new Promise(resolve => setTimeout(resolve, AD_SETTINGS.adInitDelay));
      
      await AdMob.initialize({
        testingDevices: [],
        initializeForTesting: true
      });
      
      this.isInitialized = true;
      this.isInitializing = false;
      console.log('AdMob initialized successfully');
    } catch (error) {
      console.error('AdMob initialization failed:', error);
      this.isInitializing = false;
    }
  }

  async showBanner() {
    if (!this.isInitialized) {
      console.log('AdMob not initialized, attempting to initialize...');
      await this.initialize();
      
      if (!this.isInitialized) {
        console.log('Failed to initialize AdMob for banner');
        return;
      }
    }
    
    try {
      const options: BannerAdOptions = {
        adId: ADMOB_CONFIG.bannerAdUnitId,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 72,
        isTesting: true
      };

      await AdMob.showBanner(options);
      console.log('Banner ad shown successfully');
    } catch (error) {
      console.error('Failed to show banner ad:', error);
    }
  }

  async hideBanner() {
    try {
      await AdMob.hideBanner();
      console.log('Banner ad hidden successfully');
    } catch (error) {
      console.error('Failed to hide banner ad:', error);
    }
  }

  async removeBanner() {
    try {
      await AdMob.removeBanner();
      console.log('Banner ad removed successfully');
    } catch (error) {
      console.error('Failed to remove banner ad:', error);
    }
  }
}

export const adMobService = new AdMobService();
