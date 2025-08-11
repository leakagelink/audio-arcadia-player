
export const ADMOB_CONFIG = {
  appId: 'ca-app-pub-2211398170597117~5066377773',
  
  // Using test IDs for development to prevent crashes
  bannerAdUnitId: 'ca-app-pub-3940256099942544/6300978111', // Test banner
  interstitialAdUnitId: 'ca-app-pub-3940256099942544/1033173712', // Test interstitial
  appOpenAdUnitId: 'ca-app-pub-3940256099942544/3419835294', // Test app open
  
  // Production IDs (comment out test IDs and uncomment these when ready)
  // bannerAdUnitId: 'ca-app-pub-2211398170597117/6391067735',
  // interstitialAdUnitId: 'ca-app-pub-2211398170597117/2373568151',
  // appOpenAdUnitId: 'ca-app-pub-2211398170597117/7226439587',
};

export const AD_SETTINGS = {
  interstitialCooldown: 2 * 60 * 1000, // 2 minutes
  appOpenCooldown: 30 * 1000, // 30 seconds
  maxTracksBeforeInterstitial: 3,
  adInitDelay: 3000, // 3 seconds delay before initializing ads
  appOpenDelay: 5000 // 5 seconds delay before showing app open ads
};
