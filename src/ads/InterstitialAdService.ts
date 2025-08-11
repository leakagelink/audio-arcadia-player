
import { AdMob, AdOptions } from '@capacitor-community/admob';
import { ADMOB_CONFIG, AD_SETTINGS } from './config';

class InterstitialAdService {
  private lastShown = 0;
  private tracksPlayed = 0;
  private isLoaded = false;
  private isLoading = false;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      console.log('Initializing Interstitial Ad Service...');
      await new Promise(resolve => setTimeout(resolve, AD_SETTINGS.adInitDelay));
      this.isInitialized = true;
      console.log('Interstitial Ad Service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Interstitial Ad Service:', error);
    }
  }

  async preload() {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (this.isLoading || this.isLoaded) {
      console.log('Interstitial ad already loading or loaded');
      return;
    }

    this.isLoading = true;

    try {
      const options: AdOptions = {
        adId: ADMOB_CONFIG.interstitialAdUnitId,
        isTesting: true
      };

      await AdMob.prepareInterstitial(options);
      this.isLoaded = true;
      this.isLoading = false;
      console.log('Interstitial ad preloaded successfully');
    } catch (error) {
      console.error('Failed to preload interstitial ad:', error);
      this.isLoaded = false;
      this.isLoading = false;
    }
  }

  async show() {
    if (!this.isInitialized) {
      console.log('Interstitial ad service not initialized');
      return false;
    }

    const now = Date.now();
    
    // Check cooldown
    if (now - this.lastShown < AD_SETTINGS.interstitialCooldown) {
      console.log('Interstitial ad on cooldown');
      return false;
    }

    // Check track count
    if (this.tracksPlayed < AD_SETTINGS.maxTracksBeforeInterstitial) {
      console.log(`Not enough tracks played for interstitial (${this.tracksPlayed}/${AD_SETTINGS.maxTracksBeforeInterstitial})`);
      return false;
    }

    if (!this.isLoaded) {
      console.log('Interstitial ad not loaded, attempting to preload...');
      await this.preload();
      
      if (!this.isLoaded) {
        console.log('Failed to load interstitial ad');
        return false;
      }
    }

    try {
      await AdMob.showInterstitial();
      this.lastShown = now;
      this.tracksPlayed = 0;
      this.isLoaded = false;
      console.log('Interstitial ad shown successfully');
      
      // Preload next ad after a delay
      setTimeout(() => this.preload(), 2000);
      return true;
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
      this.isLoaded = false;
      return false;
    }
  }

  onTrackChange() {
    this.tracksPlayed++;
    console.log(`Tracks played: ${this.tracksPlayed}/${AD_SETTINGS.maxTracksBeforeInterstitial}`);
  }
}

export const interstitialAdService = new InterstitialAdService();
