# EAS Build Configuration Guide

This document provides comprehensive instructions for building and deploying the PayMe Protocol mobile application using Expo Application Services (EAS Build).

## Prerequisites

Before building the application, ensure you have:

1. **EAS CLI installed globally:**
   ```bash
   npm install -g eas-cli
   ```

2. **Expo account:**
   - Create an account at https://expo.dev
   - Login via CLI: `eas login`

3. **Project configured:**
   - Update `extra.eas.projectId` in `app.json` with your actual project ID
   - Get your project ID by running: `eas init`

## Build Profiles

The `eas.json` configuration defines three build profiles:

### 1. Development Profile

**Purpose:** For local development and testing with Expo Dev Client

**Features:**
- Includes development client for hot reloading
- iOS builds run on simulator
- Android builds generate APK files
- Internal distribution only

**Build Commands:**
```bash
# iOS development build (simulator)
eas build --profile development --platform ios

# Android development build (APK)
eas build --profile development --platform android

# Both platforms
eas build --profile development --platform all
```

### 2. Preview Profile

**Purpose:** For internal testing and QA before production release

**Features:**
- Release configuration for iOS
- APK format for Android (easier distribution for testing)
- Internal distribution
- No simulator builds

**Build Commands:**
```bash
# iOS preview build
eas build --profile preview --platform ios

# Android preview build (APK)
eas build --profile preview --platform android

# Both platforms
eas build --profile preview --platform all
```

### 3. Production Profile

**Purpose:** For App Store and Google Play Store releases

**Features:**
- Release configuration for both platforms
- iOS: Auto-increments build number
- Android: Generates AAB (Android App Bundle) with auto-incrementing version code
- Optimized for store submission

**Build Commands:**
```bash
# iOS production build
eas build --profile production --platform ios

# Android production build (AAB)
eas build --profile production --platform android

# Both platforms
eas build --profile production --platform all
```

## iOS Build Configuration

### Requirements

1. **Apple Developer Account:**
   - Individual or Organization account ($99/year)
   - Enrolled in Apple Developer Program

2. **Bundle Identifier:**
   - Already configured in `app.json`: `com.paymeprotocol.app`
   - Must match your App Store Connect app

3. **Certificates and Provisioning Profiles:**
   - EAS Build handles this automatically
   - Or manage manually via Apple Developer Portal

### iOS Build Process

1. **First-time setup:**
   ```bash
   eas build:configure
   ```

2. **Build for production:**
   ```bash
   eas build --profile production --platform ios
   ```

3. **Monitor build:**
   - View progress at https://expo.dev/accounts/[your-account]/projects/payme-protocol/builds
   - Download IPA file when complete

### iOS Submission

After a successful production build:

```bash
# Submit to App Store Connect
eas submit --platform ios --profile production
```

**Before submitting, update `eas.json` submit configuration:**
- `appleId`: Your Apple ID email
- `ascAppId`: App Store Connect app ID (found in App Store Connect)
- `appleTeamId`: Your Apple Developer Team ID

## Android Build Configuration

### Requirements

1. **Google Play Console Account:**
   - One-time $25 registration fee
   - Create app in Google Play Console

2. **Package Name:**
   - Already configured in `app.json`: `com.paymeprotocol.app`
   - Must match your Google Play Console app

3. **Keystore:**
   - EAS Build generates and manages keystore automatically
   - Or provide your own keystore

### Android Build Process

1. **Build for production:**
   ```bash
   eas build --profile production --platform android
   ```

2. **Monitor build:**
   - View progress at https://expo.dev
   - Download AAB file when complete

### Android Submission

After a successful production build:

```bash
# Submit to Google Play Store
eas submit --platform android --profile production
```

**Before submitting, update `eas.json` submit configuration:**
- `serviceAccountKeyPath`: Path to Google Play service account JSON key
- `track`: Release track (production, beta, alpha, internal)

**To create a service account key:**
1. Go to Google Play Console → Setup → API access
2. Create a service account
3. Download JSON key file
4. Update path in `eas.json`

## Build Optimization

### iOS Optimizations

The production build includes:
- Release build configuration (optimized, no debugging symbols)
- Automatic build number incrementing
- Code signing handled by EAS
- Bitcode enabled (if required by Apple)

### Android Optimizations

The production build includes:
- AAB format (smaller download size, optimized per-device)
- Automatic version code incrementing
- ProGuard/R8 code shrinking and obfuscation
- Split APKs for different architectures

## Local Development

For local development without EAS Build:

```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## Troubleshooting

### Common Issues

**1. Build fails with "Invalid credentials":**
- Run `eas login` to re-authenticate
- Ensure your Expo account has proper permissions

**2. iOS build fails with provisioning profile error:**
- Run `eas credentials` to manage certificates
- Ensure bundle identifier matches Apple Developer Portal

**3. Android build fails with keystore error:**
- Let EAS generate a new keystore: `eas credentials`
- Or provide your own keystore configuration

**4. Build takes too long:**
- EAS Build runs on cloud servers (typical: 10-20 minutes)
- Check build queue status at expo.dev

**5. App crashes on launch:**
- Check build logs for errors
- Verify all native dependencies are compatible
- Test with preview build before production

### Getting Help

- EAS Build documentation: https://docs.expo.dev/build/introduction/
- Expo forums: https://forums.expo.dev/
- GitHub issues: https://github.com/expo/expo/issues

## Version Management

### iOS Version Management

Update in `app.json`:
```json
{
  "expo": {
    "version": "1.0.0",
    "ios": {
      "buildNumber": "1"
    }
  }
}
```

- `version`: User-facing version (1.0.0, 1.1.0, etc.)
- `buildNumber`: Auto-incremented by EAS in production builds

### Android Version Management

Update in `app.json`:
```json
{
  "expo": {
    "version": "1.0.0",
    "android": {
      "versionCode": 1
    }
  }
}
```

- `version`: User-facing version (1.0.0, 1.1.0, etc.)
- `versionCode`: Auto-incremented by EAS in production builds

## Build Artifacts

After successful builds:

- **iOS:** `.ipa` file (can be installed via TestFlight or submitted to App Store)
- **Android:** `.aab` file (for Play Store) or `.apk` file (for direct installation)

Download artifacts from:
- Expo dashboard: https://expo.dev
- Or via CLI: `eas build:list`

## CI/CD Integration

To integrate EAS Build with CI/CD:

1. **Generate access token:**
   ```bash
   eas login
   eas build:configure
   ```

2. **Set environment variable:**
   ```bash
   export EXPO_TOKEN=your-token-here
   ```

3. **Run builds in CI:**
   ```bash
   eas build --profile production --platform all --non-interactive
   ```

## Requirements Validation

This build configuration satisfies:

- **Requirement 13.1:** Cross-platform compatibility with iOS-first design
  - Separate build profiles for iOS and Android
  - iOS-native design maintained across both platforms

- **Requirement 13.4:** Production deployment readiness
  - Production build profile configured
  - Automatic version management
  - Store submission configuration included
  - Optimized builds for both platforms

## Next Steps

1. **Initialize EAS project:**
   ```bash
   eas init
   ```

2. **Update app.json with your project ID**

3. **Configure credentials:**
   ```bash
   eas credentials
   ```

4. **Run your first build:**
   ```bash
   eas build --profile preview --platform all
   ```

5. **Test the build thoroughly before production release**

6. **Submit to stores when ready:**
   ```bash
   eas submit --platform all --profile production
   ```
