
# Mobile Development Setup

## After making changes to the project:

1. **Build the web assets:**
   ```bash
   npm run build
   ```

2. **Sync changes to native platforms:**
   ```bash
   npx cap sync android
   ```

3. **Run the app:**
   ```bash
   npx cap run android
   ```

## AdMob Configuration

- **Development:** Uses Google's sample App ID (`ca-app-pub-3940256099942544~3347511713`)
- **Production:** Update `capacitor.config.ts` to use your real App ID (`ca-app-pub-2211398170597117~5066377773`)

## Troubleshooting

If the app still crashes:
1. Clean and rebuild:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run build
   npx cap sync android
   ```

2. Uninstall previous version:
   ```bash
   adb uninstall com.musicarcamusi.com
   npx cap run android
   ```
