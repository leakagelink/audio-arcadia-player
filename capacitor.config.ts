
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
      appId: 'ca-app-pub-2211398170597117~5066377773',
      testingDevices: []
    }
  },
  android: {
    appendUserAgent: 'AudioArcadiaPlayer/1.0'
  }
};

export default config;
