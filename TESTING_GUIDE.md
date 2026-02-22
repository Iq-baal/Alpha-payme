# Testing Guide - PayMe Protocol

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

This opens the Expo Dev Tools with options to run on:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser

## Platform-Specific Testing

### iOS Simulator (Mac only)

**Prerequisites:**
- Xcode installed from Mac App Store
- Xcode Command Line Tools: `xcode-select --install`

**Run:**
```bash
npm run ios
```

**Or manually:**
1. `npm start`
2. Press `i` in terminal
3. App opens in iOS Simulator

**Test features:**
- Face ID simulation: Hardware → Face ID → Enrolled
- Trigger Face ID: Hardware → Face ID → Matching Face
- Haptic feedback (won't feel it, but logs show)
- Dynamic Type: Settings → Accessibility → Display & Text Size

### Android Emulator

**Prerequisites:**
- Android Studio installed
- Android Virtual Device (AVD) created
- Android SDK installed

**Run:**
```bash
npm run android
```

**Or manually:**
1. Open Android Studio → AVD Manager → Start emulator
2. `npm start`
3. Press `a` in terminal

**Test features:**
- Fingerprint: Extended controls (⋯) → Fingerprint → Touch sensor
- Haptic feedback works on physical devices
- Back button navigation

### Web Browser

**Run:**
```bash
npm run web
```

**Or manually:**
1. `npm start`
2. Press `w` in terminal
3. Opens at `http://localhost:8081` or `http://localhost:19006`

**What works on web:**
- All navigation and UI
- Form inputs and buttons
- Layout and styling
- Mock data display

**What doesn't work on web:**
- Biometric authentication (Face ID/Touch ID)
- Haptic feedback
- Native keyboard types
- Some iOS-specific animations

**Testing tips:**
- Open browser DevTools (F12)
- Use mobile device emulation (Ctrl+Shift+M / Cmd+Shift+M)
- Test different screen sizes
- Check console for errors

## Testing the Secure Onboarding Flow

### Full Flow Test:

1. **Start app** → Welcome Screen
2. **Tap "Get Started"** → Login Screen
3. **Enter any email/password** → Secure Onboarding
4. **Step 1: Welcome** → Tap "Continue"
5. **Step 2: Device Key** → Tap "Create Device Key"
   - On iOS: Face ID prompt appears
   - On web: Skips biometric, continues
6. **Step 3: Cloud Key** → Tap "Configure Cloud Backup"
   - 1.5s loading simulation
7. **Step 4: Recovery Key** → Enter email → Tap "Verify"
   - 1.5s loading simulation
8. **Step 5: Complete** → Tap "Go to Dashboard"
9. **Dashboard** → See balance, transactions, quick actions

### Quick Test (Skip Login):

Temporarily modify `AppNavigator.tsx`:
```typescript
initialRouteName="SecureOnboarding"  // Instead of "Welcome"
```

Then just `npm start` and press `w` for instant web testing.

## Testing Individual Screens

### Test Dashboard:
```typescript
// In AppNavigator.tsx, change:
initialRouteName="Dashboard"
```

### Test Settings:
```typescript
// In AppNavigator.tsx, change:
initialRouteName="Settings"
```

## Common Issues & Solutions

### Issue: "Metro bundler not starting"
```bash
# Clear cache and restart
npm start -- --reset-cache
```

### Issue: "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue: iOS simulator not opening
```bash
# Check Xcode installation
xcode-select -p

# Should output: /Applications/Xcode.app/Contents/Developer
# If not, install Xcode from App Store
```

### Issue: Android emulator not connecting
```bash
# Check ADB devices
adb devices

# Restart ADB if needed
adb kill-server
adb start-server
```

### Issue: Web version shows blank screen
```bash
# Check browser console (F12) for errors
# Common fix: Clear browser cache and reload
```

## Testing Checklist

### Functionality:
- [ ] Welcome screen displays correctly
- [ ] Login navigation works
- [ ] Biometric prompt appears (iOS only)
- [ ] Secure onboarding steps progress
- [ ] Progress bar updates correctly
- [ ] Email input accepts text
- [ ] Loading states show during key generation
- [ ] Dashboard displays balance and transactions
- [ ] Transaction rows are tappable
- [ ] Navigation back button works
- [ ] Settings screen accessible

### Design (iOS-native):
- [ ] San Francisco font renders
- [ ] System blue color (#007AFF) on buttons
- [ ] 8pt grid spacing consistent
- [ ] Large titles display correctly
- [ ] Cards have proper rounded corners
- [ ] No drop shadows or gradients
- [ ] Text is readable (high contrast)

### Accessibility:
- [ ] VoiceOver reads all elements (iOS)
- [ ] TalkBack works (Android)
- [ ] Touch targets are 44x44pt minimum
- [ ] Text scales with Dynamic Type
- [ ] Color contrast meets WCAG standards

### Performance:
- [ ] App loads in < 3 seconds
- [ ] Animations are smooth (60fps)
- [ ] No lag when scrolling
- [ ] Transitions are 200-300ms

## Debugging Tips

### Enable Debug Mode:
```bash
# iOS: Cmd+D in simulator
# Android: Cmd+M (Mac) or Ctrl+M (Windows/Linux)
# Web: F12 for DevTools
```

### View Console Logs:
```bash
# Terminal shows all console.log() output
# Or use React Native Debugger
```

### Inspect Element (Web):
```bash
# Right-click → Inspect Element
# Check styles, layout, console errors
```

## Physical Device Testing

### iOS (requires Apple Developer account):
```bash
# Install Expo Go app from App Store
# Scan QR code from terminal after npm start
```

### Android:
```bash
# Install Expo Go app from Play Store
# Scan QR code from terminal after npm start
```

## Automated Testing

### Run Unit Tests:
```bash
npm test
```

### Run Tests in Watch Mode:
```bash
npm run test:watch
```

### Generate Coverage Report:
```bash
npm run test:coverage
```

## Next Steps After Testing

1. **Found bugs?** → Check console logs, fix issues
2. **Design tweaks?** → Modify theme files in `src/theme/`
3. **Add features?** → Create new screens in `src/screens/`
4. **Ready to build?** → See `DEPLOYMENT.md` for build instructions

## Need Help?

- Expo docs: https://docs.expo.dev
- React Navigation: https://reactnavigation.org
- React Native: https://reactnavigation.org
