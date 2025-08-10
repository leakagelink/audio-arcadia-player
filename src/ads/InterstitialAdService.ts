
import { AdMob, AdOptions } from '@capacitor-community/admob';
import { ADMOB_CONFIG, AD_SETTINGS } from './config';

class InterstitialAdService {
  private lastShown = 0;
  private tracksPlayed = 0;
  private isLoaded = false;

  async preload() {
    try {
      const options: AdOptions = {
        adId: ADMOB_CONFIG.interstitialAdUnitId,
        isTesting: true // Set to false for production
      };

      await AdMob.prepareInterstitial(options);
      this.isLoaded = true;
      console.log('Interstitial ad preloaded');
    } catch (error) {
      console.error('Failed to preload interstitial:', error);
      this.isLoaded = false;
    }
  }

  async show() {
    const now = Date.now();
    
    // Check cooldown
    if (now - this.lastShown < AD_SETTINGS.interstitialCooldown) {
      console.log('Interstitial ad on cooldown');
      return false;
    }

    // Check track count
    if (this.tracksPlayed < AD_SETTINGS.maxTracksBeforeInterstitial) {
      console.log('Not enough tracks played for interstitial');
      return false;
    }

    if (!this.isLoaded) {
      await this.preload();
    }

    try {
      await AdMob.showInterstitial();
      this.lastShown = now;
      this.tracksPlayed = 0;
      this.isLoaded = false;
      console.log('Interstitial ad shown');
      
      // Preload next ad
      setTimeout(() => this.preload(), 1000);
      return true;
    } catch (error) {
      console.error('Failed to show interstitial:', error);
      return false;
    }
  }

  onTrackChange() {
    this.tracksPlayed++;
    console.log(`Tracks played: ${this.tracksPlayed}`);
  }
}

export const interstitialAdService = new InterstitialAdService();
