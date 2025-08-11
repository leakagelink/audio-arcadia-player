
# Mobile Development Setup

## Prerequisites

### Java Requirements
- **Required:** Java 21 (JDK 21)
- **Alternative:** Configure Gradle to use Java 17 if Java 21 is not available

## After making changes to the project:

1. **Build the web application:**
   ```bash
   npm run build
   ```

2. **Sync the project:**
   ```bash
   npx cap sync
   ```

3. **Run on Android:**
   ```bash
   npx cap run android
   ```

## Initial Setup

### 1. Install Java 21 (Recommended)
Download and install Java 21 from Oracle or use a package manager:

**Using Chocolatey (Windows):**
```bash
choco install openjdk21
```

**Manual Download:**
- Visit: https://www.oracle.com/java/technologies/downloads/#java21
- Install Java 21 JDK

### 2. Set Environment Variables
After installing Java 21:
```bash
# Set JAVA_HOME to Java 21
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21"

# Add to PATH
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

# Set Android SDK
$env:ANDROID_HOME = "C:\Users\[Username]\AppData\Local\Android\Sdk"
$env:ANDROID_SDK_ROOT = "C:\Users\[Username]\AppData\Local\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\tools;$env:ANDROID_HOME\platform-tools"
```

### 3. Verify Installation
```bash
java -version
javac -version
```

## Alternative: Use Java 17 with Gradle Override

If you can't install Java 21, you can configure Gradle to use Java 17:

### Create gradle.properties file:
Create `android/gradle.properties` with:
```properties
org.gradle.java.home=C:\\Program Files\\Java\\jdk-17
```

### Or run with Java 17 directly:
```bash
cd android
./gradlew clean -Dorg.gradle.java.home="C:\Program Files\Java\jdk-17"
cd ..
npx cap sync android
npx cap run android
```

## AdMob Configuration Status

⚠️ **Current Status: AdMob Temporarily Disabled**

AdMob services have been temporarily disabled to fix app crashes. The following files have been modified:
- `src/hooks/useAds.ts` - All ad initialization commented out
- `src/components/AdBannerManager.tsx` - Banner ad logic commented out

### To Re-enable AdMob Later:
1. Uncomment the code in `useAds.ts` and `AdBannerManager.tsx`
2. Ensure proper App ID configuration in `capacitor.config.ts`
3. Test with AdMob test ads first before using production IDs

## Troubleshooting

### App Crashes on Startup
1. **Clean and rebuild:**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run build
   npx cap sync android
   npx cap run android
   ```

2. **Alternative - Use Android Studio:**
   ```bash
   npx cap open android
   # Then build and run from Android Studio
   ```

3. **Uninstall previous version:**
   ```bash
   adb uninstall com.musicarcamusi.com
   npx cap run android
   ```

### Java Version Issues
If you get "invalid source release: 21" error:

1. **Check Java version:**
   ```bash
   java -version
   javac -version
   ```

2. **Install Java 21 or configure Gradle for Java 17:**
   ```bash
   # Option 1: Install Java 21 and set JAVA_HOME
   $env:JAVA_HOME = "C:\Program Files\Java\jdk-21"
   
   # Option 2: Use Android Studio (handles Java automatically)
   npx cap open android
   ```

### Build Failures
- Ensure Android SDK is properly installed
- Verify ANDROID_HOME points to correct SDK location
- Check that Java version matches project requirements
- Use Android Studio for automatic configuration if manual setup fails

## Quick Start Commands (After Java Setup)

```bash
# Set environment variables (replace [Username] with your username)
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21"
$env:ANDROID_HOME = "C:\Users\[Username]\AppData\Local\Android\Sdk"
$env:ANDROID_SDK_ROOT = "C:\Users\[Username]\AppData\Local\Android\Sdk"
$env:PATH = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\tools;$env:ANDROID_HOME\platform-tools;$env:PATH"

# Build and run
npm install --legacy-peer-deps
npm run build
npx cap sync android
npx cap run android
```

## Next Steps After App Works

Once the app builds and runs successfully without crashes:
1. Test all basic functionality (play music, navigation, etc.)
2. Re-enable AdMob step by step
3. Test with AdMob test ads first
4. Configure production Ad Unit IDs when ready for release
