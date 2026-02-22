# Native Code Setup Summary

## ✅ What's Been Done

### Android Native Code Generated
- Location: `android/` folder in your project
- Ready to open in Android Studio
- Can build APKs directly
- Full access to native Android features

### iOS Native Code
- ⚠️ Can only be generated on macOS
- Windows doesn't support iOS development
- If you have a Mac, run: `npx expo prebuild --platform ios`

## Quick Start

### Open in Android Studio (Windows)

1. **Launch Android Studio**
2. **File → Open**
3. **Navigate to:** `C:\Users\engin\Desktop\Alpha-Payme\Alpha-payme\android`
4. **Click OK**
5. **Wait for Gradle sync** (2-5 minutes)
6. **Click Run ▶** to build and launch

See `ANDROID_STUDIO_GUIDE.md` for detailed instructions.

### Open in Xcode (macOS only)

If you're on a Mac:
```bash
npx expo prebuild --platform ios
open ios/PayMeProtocol.xcworkspace
```

## Project Structure Now

```
Alpha-payme/
├── android/              ← Native Android code (NEW)
│   ├── app/
│   │   ├── src/main/
│   │   └── build.gradle
│   └── build.gradle
├── ios/                  ← Native iOS code (Mac only)
│   └── (not generated on Windows)
├── src/                  ← Your React Native code
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   └── theme/
├── package.json
└── app.json
```

## What Changed?

### Before (Managed Expo):
- Expo handled all native code
- Used `expo build` for builds
- Simpler but less control

### After (Bare Workflow):
- You manage native code
- Use Android Studio / Xcode for builds
- Full control over native features

## Development Workflow

### Option 1: Android Studio (Recommended for Android)
```bash
# Terminal 1: Start Metro bundler
npm start

# Android Studio: Click Run ▶
```

### Option 2: Expo CLI (Still works!)
```bash
npm run android
```

Both methods work! Choose based on your needs:
- **Android Studio:** Better debugging, native code access
- **Expo CLI:** Faster, simpler, no Android Studio needed

## Building APKs

### Debug APK (for testing):
```bash
cd android
./gradlew assembleDebug
```
Output: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (for distribution):
```bash
cd android
./gradlew assembleRelease
```
Output: `android/app/build/outputs/apk/release/app-release.apk`

Or use Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)

## Important Commands

### Regenerate Native Code:
```bash
npx expo prebuild --clean
```
Use this when:
- Installing new native dependencies
- Updating Expo SDK
- Native code gets corrupted

### Remove Native Code (go back to managed):
```bash
rm -rf android ios
```
Then use `expo build` or EAS Build instead.

## Testing Your App

### 1. Web (Easiest):
```bash
npm run web
```
Opens in browser at http://localhost:8081

### 2. Android Emulator:
```bash
npm run android
```
Or click Run ▶ in Android Studio

### 3. Physical Android Device:
- Enable USB debugging
- Connect via USB
- Run from Android Studio or `npm run android`

### 4. iOS (Mac only):
```bash
npm run ios
```
Or open in Xcode

## Files You Can Now Edit

### Android Native:
- `android/app/src/main/AndroidManifest.xml` - App permissions, config
- `android/app/build.gradle` - Dependencies, build config
- `android/app/src/main/res/` - Icons, splash screens, resources
- `android/app/src/main/java/` - Native Java/Kotlin code

### React Native (unchanged):
- `src/` - All your screens, components, logic
- `App.tsx` - Root component
- `app.json` - App configuration

## Next Steps

1. ✅ **Open Android Studio** → See `ANDROID_STUDIO_GUIDE.md`
2. ✅ **Build APK** → Test on real device
3. ✅ **Customize native code** → Edit AndroidManifest.xml, add permissions
4. ✅ **Test thoroughly** → See `TESTING_GUIDE.md`

## Need Help?

- **Android Studio setup:** See `ANDROID_STUDIO_GUIDE.md`
- **Testing guide:** See `TESTING_GUIDE.md`
- **Onboarding flow:** See `ONBOARDING_INTEGRATION.md`
- **General docs:** See `README.md`

## Troubleshooting

### "Gradle sync failed"
```bash
cd android
./gradlew clean
```

### "SDK not found"
Create `android/local.properties`:
```
sdk.dir=C:\\Users\\engin\\AppData\\Local\\Android\\Sdk
```

### "App crashes"
1. Check Logcat in Android Studio
2. Ensure `npm start` is running
3. Rebuild: `./gradlew clean assembleDebug`

### "Want to go back to managed Expo"
```bash
rm -rf android
# Use expo build or EAS Build instead
```

## Resources

- Expo Bare Workflow: https://docs.expo.dev/bare/overview/
- Android Studio: https://developer.android.com/studio
- React Native: https://reactnavigation.org/
