# Android Studio Setup Guide

## What Just Happened?

The `android/` folder has been generated with native Android code. This allows you to:
- Open the project in Android Studio
- Build APKs directly
- Debug with Android Studio tools
- Customize native Android code
- Use Android-specific features

## Project Structure

```
Alpha-payme/
├── android/              ← NEW: Native Android project
│   ├── app/
│   │   ├── src/
│   │   │   └── main/
│   │   │       ├── java/
│   │   │       ├── res/
│   │   │       └── AndroidManifest.xml
│   │   └── build.gradle
│   ├── gradle/
│   ├── build.gradle
│   └── settings.gradle
├── src/                  ← Your React Native code (unchanged)
├── package.json
└── app.json
```

## Opening in Android Studio

### Step 1: Open Android Studio

1. Launch Android Studio
2. Click **"Open"** (not "New Project")
3. Navigate to: `C:\Users\engin\Desktop\Alpha-Payme\Alpha-payme\android`
4. Click **"OK"**

**Important:** Open the `android` folder, not the root project folder!

### Step 2: Wait for Gradle Sync

Android Studio will automatically:
- Sync Gradle files (2-5 minutes first time)
- Download dependencies
- Index the project

You'll see progress at the bottom of the window.

### Step 3: Configure SDK

If prompted:
1. Click **"Install missing SDK packages"**
2. Accept licenses
3. Wait for installation

## Running the App from Android Studio

### Method 1: Using Emulator

1. **Create/Start Emulator:**
   - Tools → Device Manager
   - Click ▶ on an existing device
   - Or create new: Click "+" → Select device → Download system image

2. **Run App:**
   - Click green ▶ "Run" button in toolbar
   - Or: Run → Run 'app'
   - Or: Shift+F10

3. **Select Device:**
   - Choose your emulator from dropdown
   - App builds and installs automatically

### Method 2: Using Physical Device

1. **Enable Developer Options on Phone:**
   - Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back → Developer Options
   - Enable "USB Debugging"

2. **Connect Phone:**
   - Plug in via USB
   - Allow USB debugging on phone
   - Phone appears in device dropdown

3. **Run App:**
   - Click green ▶ "Run" button
   - Select your physical device

## Building APK

### Debug APK (for testing):

**Option 1: Android Studio**
1. Build → Build Bundle(s) / APK(s) → Build APK(s)
2. Wait for build to complete
3. Click "locate" in notification
4. APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

**Option 2: Command Line**
```bash
cd android
./gradlew assembleDebug
```

### Release APK (for distribution):

**Option 1: Android Studio**
1. Build → Generate Signed Bundle / APK
2. Select APK → Next
3. Create/select keystore
4. Choose "release" build variant
5. Finish

**Option 2: Command Line**
```bash
cd android
./gradlew assembleRelease
```

Release APK location: `android/app/build/outputs/apk/release/app-release.apk`

## Important Notes

### ⚠️ You're Now in "Bare Workflow"

Before prebuild: **Managed Expo** (Expo handles native code)
After prebuild: **Bare Workflow** (you manage native code)

**What this means:**
- ✅ Full control over native Android code
- ✅ Can use any Android library
- ✅ Can modify AndroidManifest.xml
- ✅ Can add custom native modules
- ❌ Can't use `expo build` anymore (use EAS Build or Android Studio)
- ❌ Need to manage native dependencies manually

### Keeping Native Code in Sync

When you install new Expo packages:
```bash
npx expo prebuild --clean
```

This regenerates the `android/` folder with updated native code.

### .gitignore

The `android/` folder is typically gitignored in Expo projects. If you want to commit it:

1. Remove `android/` from `.gitignore`
2. Commit the folder: `git add android && git commit -m "Add Android native code"`

**Pros:** Team can build directly in Android Studio
**Cons:** Larger repo, merge conflicts in native code

## Common Android Studio Tasks

### View Logs (Logcat):
1. View → Tool Windows → Logcat
2. Filter by package: `com.yourcompany.paymeprotocol`
3. See all console.log() output and errors

### Debug JavaScript:
1. Run app in debug mode
2. Shake device or Ctrl+M (emulator)
3. Select "Debug"
4. Chrome DevTools opens

### Clean Build:
```bash
cd android
./gradlew clean
```

Or in Android Studio: Build → Clean Project

### Rebuild Project:
Build → Rebuild Project

## Troubleshooting

### Issue: "SDK location not found"
**Fix:**
1. Create `android/local.properties`
2. Add: `sdk.dir=C:\\Users\\engin\\AppData\\Local\\Android\\Sdk`
3. Adjust path to your SDK location

### Issue: "Gradle sync failed"
**Fix:**
```bash
cd android
./gradlew clean
./gradlew --stop
```
Then sync again in Android Studio

### Issue: "App crashes on launch"
**Fix:**
1. Check Logcat for errors
2. Ensure Metro bundler is running: `npm start`
3. Rebuild: `./gradlew clean assembleDebug`

### Issue: "Could not find method implementation()"
**Fix:**
Update Gradle version in `android/gradle/wrapper/gradle-wrapper.properties`

### Issue: "Execution failed for task ':app:mergeDebugResources'"
**Fix:**
```bash
cd android
./gradlew clean
rm -rf .gradle
./gradlew assembleDebug
```

## Development Workflow

### Recommended Setup:

**Terminal 1:** Metro bundler
```bash
npm start
```

**Android Studio:** Build and run app
- Code changes hot-reload automatically
- Native changes require rebuild

### Making Changes:

**JavaScript/TypeScript changes:**
- Edit files in `src/`
- Save → Auto hot-reload
- No rebuild needed

**Native Android changes:**
- Edit files in `android/`
- Rebuild required (click ▶ Run)

## Useful Android Studio Shortcuts

- **Run app:** Shift+F10
- **Debug app:** Shift+F9
- **Stop app:** Ctrl+F2
- **Find file:** Ctrl+Shift+N
- **Search everywhere:** Double Shift
- **Logcat:** Alt+6
- **Terminal:** Alt+F12

## Next Steps

1. ✅ Open `android/` folder in Android Studio
2. ✅ Wait for Gradle sync
3. ✅ Create/start an emulator
4. ✅ Click Run ▶
5. ✅ Test your app!

## Alternative: Keep Using Expo CLI

If you prefer Expo's workflow:
```bash
# Delete android folder
rm -rf android

# Use Expo CLI instead
npm run android
```

This uses Expo Go app instead of building native code.

## Resources

- Android Studio: https://developer.android.com/studio
- React Native Android: https://reactnavigation.org/docs/environment-setup
- Expo Bare Workflow: https://docs.expo.dev/bare/overview/
- Gradle: https://gradle.org/
