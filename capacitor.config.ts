
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.musicarcamusi.com',
  appName: 'audio-arcadia-player',
  webDir: 'dist',
  server: {
    url: 'https://2a4c6819-89d1-49b1-81b2-a49259ad0a50.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    },
    AdMob: {
      appId: 'ca-app-pub-2211398170597117~5066377773',
      testingDevices: ['YOUR_DEVICE_ID_HERE']
    }
  },
  android: {
    appendUserAgent: 'AudioArcadiaPlayer/1.0'
  }
};

export default config;
