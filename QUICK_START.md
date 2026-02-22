# Quick Start Guide - PayMe Protocol

## 🚀 You're All Set!

Your React Native app with iOS-native design is ready to test on Android Studio.

## What You Have Now

✅ **React Native app** with iOS-native design  
✅ **Android native code** in `android/` folder  
✅ **Secure onboarding flow** (5-step security setup)  
✅ **Dashboard** with balance and transactions  
✅ **Ready for Android Studio**

## Fastest Way to Test

### Option 1: Android Studio (Full Native Experience)

1. **Open Android Studio**
2. **File → Open** → Select `android` folder
3. **Wait for Gradle sync** (2-5 min first time)
4. **Click Run ▶** button
5. **Select emulator or device**

📖 Detailed guide: `ANDROID_STUDIO_GUIDE.md`

### Option 2: Expo CLI (Quickest)

```bash
npm run android
```

App launches on emulator automatically!

### Option 3: Web Browser (No Setup)

```bash
npm run web
```

Opens at http://localhost:8081

## App Flow

1. **Welcome Screen** → "Payments at light speed"
2. **Login Screen** → Enter any email/password
3. **Secure Onboarding** → 5-step security setup:
   - Welcome intro
   - Device Key (biometric)
   - Cloud Key (backup)
   - Recovery Key (email)
   - Complete
4. **Dashboard** → Balance, transactions, quick actions

## Project Structure

```
Alpha-payme/
├── android/              ← Open this in Android Studio
├── src/
│   ├── screens/
│   │   ├── SecureOnboardingScreen.tsx  ← NEW
│   │   ├── DashboardScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   └── ...
│   ├── components/design-system/
│   ├── navigation/
│   └── theme/
├── ANDROID_STUDIO_GUIDE.md      ← Android Studio instructions
├── TESTING_GUIDE.md             ← Testing on all platforms
├── ONBOARDING_INTEGRATION.md    ← Onboarding flow details
└── NATIVE_CODE_SETUP.md         ← Native code overview
```

## Key Features

### iOS-Native Design
- San Francisco typography
- iOS system colors (#007AFF blue)
- 8pt grid spacing
- Native navigation patterns
- No Material Design

### Security Flow
- Biometric authentication (Face ID/Touch ID)
- Three-layer security (Device, Cloud, Recovery)
- Progress tracking
- Haptic feedback

### Accessibility
- VoiceOver support
- Dynamic Type scaling
- High contrast text
- 44pt touch targets

## Common Commands

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on web
npm run web

# Run tests
npm test

# Build Android APK
cd android && ./gradlew assembleDebug
```

## Building APK

### Debug APK (for testing):
```bash
cd android
./gradlew assembleDebug
```
📦 Output: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (for distribution):
```bash
cd android
./gradlew assembleRelease
```
📦 Output: `android/app/build/outputs/apk/release/app-release.apk`

## Troubleshooting

### Metro bundler not starting?
```bash
npm start -- --reset-cache
```

### Android Studio Gradle sync failed?
```bash
cd android
./gradlew clean
```

### App crashes on launch?
1. Check Logcat in Android Studio
2. Ensure `npm start` is running
3. Rebuild: `./gradlew clean assembleDebug`

### Want to regenerate native code?
```bash
npx expo prebuild --clean
```

## Documentation

| Guide | Purpose |
|-------|---------|
| `ANDROID_STUDIO_GUIDE.md` | Complete Android Studio setup |
| `TESTING_GUIDE.md` | Test on iOS, Android, Web |
| `ONBOARDING_INTEGRATION.md` | Onboarding flow details |
| `NATIVE_CODE_SETUP.md` | Native code overview |
| `README.md` | Project overview |

## Next Steps

### 1. Test in Android Studio
- Open `android/` folder
- Click Run ▶
- Test the full onboarding flow

### 2. Customize
- Edit screens in `src/screens/`
- Modify theme in `src/theme/`
- Add features in `src/components/`

### 3. Build APK
- Debug: `./gradlew assembleDebug`
- Release: `./gradlew assembleRelease`
- Install on device and test

### 4. Deploy
- See `DEPLOYMENT.md` for production builds
- Use EAS Build for app store submission

## Need Help?

- **Android Studio issues:** See `ANDROID_STUDIO_GUIDE.md`
- **Testing problems:** See `TESTING_GUIDE.md`
- **Onboarding questions:** See `ONBOARDING_INTEGRATION.md`
- **General setup:** See `README.md`

## What's Different from Web Version?

Your original web app had:
- Framer Motion animations
- Tailwind CSS styling
- Lucide icons
- Black/orange aesthetic

The React Native app has:
- iOS-native design patterns
- React Native Animated API
- StyleSheet styling
- Emoji icons
- iOS system colors

Both versions work independently:
- **React Native:** Mobile apps (iOS/Android)
- **Web version:** Browser experience

## Important Notes

⚠️ **You're now in "Bare Workflow"**
- You manage native code
- Can't use `expo build` anymore
- Use Android Studio or EAS Build instead

✅ **Benefits:**
- Full control over native Android code
- Can use any Android library
- Better debugging with Android Studio
- Direct APK builds

## Resources

- Expo Docs: https://docs.expo.dev
- React Native: https://reactnavigation.org
- Android Studio: https://developer.android.com/studio
- React Navigation: https://reactnavigation.org

---

**Ready to start?** Open Android Studio and select the `android` folder! 🚀
