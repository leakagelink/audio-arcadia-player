
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.musicarcamusi.com',
  appName: 'audio-arcadia-player',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a1a'
    },
    AdMob: {
      // Using Google's sample App ID for development to prevent crashes
      appId: 'ca-app-pub-3940256099942544~3347511713',
      
      // Production App ID (uncomment when ready for production)
      // appId: 'ca-app-pub-2211398170597117~5066377773',
      
      testingDevices: []
    }
  },
  android: {
    appendUserAgent: 'AudioArcadiaPlayer/1.0'
  }
};

export default config;
