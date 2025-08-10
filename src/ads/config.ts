
export const ADMOB_CONFIG = {
  appId: 'ca-app-pub-2211398170597117~5066377773',
  bannerAdUnitId: 'ca-app-pub-2211398170597117/6391067735',
  interstitialAdUnitId: 'ca-app-pub-2211398170597117/2373568151',
  appOpenAdUnitId: 'ca-app-pub-2211398170597117/7226439587',
  
  // Test IDs for development (switch these when testing)
  testIds: {
    banner: 'ca-app-pub-3940256099942544/6300978111',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
    appOpen: 'ca-app-pub-3940256099942544/3419835294'
  }
};

export const AD_SETTINGS = {
  interstitialCooldown: 2 * 60 * 1000, // 2 minutes
  appOpenCooldown: 30 * 1000, // 30 seconds
  maxTracksBeforeInterstitial: 3
};
