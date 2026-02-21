# PayMe Protocol - iOS Native UI Demo

A React Native mobile application showcasing pixel-perfect iOS-native design using Expo. This demo app demonstrates Apple Human Interface Guidelines implementation with San Francisco typography, system colors, native navigation patterns, and iOS-style modals.

## Features

- **iOS-Native Design**: Matches Apple's Human Interface Guidelines pixel-perfectly
- **Design System**: Complete component library with Typography, Button, Input, Card, Section, and Modal
- **Native Navigation**: iOS-style navigation stack with large titles and slide transitions
- **Haptic Feedback**: iOS haptic patterns for button presses and confirmations
- **Biometric Authentication**: Face ID / Touch ID integration
- **Accessibility**: Full VoiceOver support and Dynamic Type scaling
- **Offline Demo**: Runs entirely on localhost with mock data (no backend required)

## Screenshots

The app includes:
- **Onboarding Screen**: Welcome screen with centered icon and CTA button
- **Dashboard Screen**: Balance card and transaction list with iOS Settings-style layout
- **Transaction Detail Screen**: Detailed transaction view with action buttons
- **Settings Screen**: iOS Settings-style preferences with toggle switches

## Tech Stack

- **React Native** 0.81.5
- **Expo** ~54.0
- **TypeScript** ~5.9
- **React Navigation** 7.x (Native Stack)
- **expo-haptics** for iOS haptic feedback
- **expo-local-authentication** for biometric authentication
- **AsyncStorage** for local data persistence

## Project Structure

```
PayMeProtocol/
├── src/
│   ├── components/
│   │   └── design-system/      # Reusable UI components
│   │       ├── Typography.tsx
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       ├── Section.tsx
│   │       └── Modal.tsx
│   ├── screens/                # Screen components
│   │   ├── DashboardScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── TransactionDetailScreen.tsx
│   ├── navigation/             # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── theme/                  # Design tokens
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── animations.ts
│   ├── data/                   # Mock data
│   │   └── mockData.ts
│   ├── hooks/                  # Custom React hooks
│   │   ├── useHaptics.ts
│   │   └── useBiometrics.ts
│   ├── context/                # React Context providers
│   │   └── SettingsContext.tsx
│   └── utils/                  # Utility functions
├── App.tsx                     # App entry point
└── package.json
```

## Installation

### Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Xcode) or physical iOS device
- Android Studio (optional, for Android testing)

### Setup Steps

1. **Clone the repository**
   ```bash
   cd PayMeProtocol
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on iOS Simulator**
   ```bash
   npm run ios
   ```

5. **Run on Android Emulator** (optional)
   ```bash
   npm run android
   ```

6. **Run on physical device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or use `expo start --tunnel` for remote testing

## Design System Usage

### Typography

```tsx
import { Typography } from './components/design-system';

<Typography variant="largeTitle">Welcome</Typography>
<Typography variant="title2">Section Title</Typography>
<Typography variant="body" color="secondaryLabel">Body text</Typography>
<Typography variant="caption">Small text</Typography>
```

### Buttons

```tsx
import { Button } from './components/design-system';

<Button variant="primary" size="large" onPress={handlePress}>
  Get Started
</Button>

<Button variant="destructive" onPress={handleDelete}>
  Delete
</Button>

<Button variant="secondary" onPress={handleCancel}>
  Cancel
</Button>
```

### Cards and Sections

```tsx
import { Card, Section } from './components/design-system';

<Section title="Recent Activity">
  <Card onPress={handlePress} showChevron>
    <Typography variant="body">Transaction #1234</Typography>
  </Card>
</Section>
```

### Modal

```tsx
import { Modal } from './components/design-system';

<Modal
  visible={showModal}
  title="Confirm Action"
  message="Are you sure you want to proceed?"
  primaryAction={{
    label: "Confirm",
    onPress: handleConfirm,
  }}
  secondaryAction={{
    label: "Cancel",
    onPress: handleCancel,
  }}
/>
```

## Mock Data Structure

The app uses hardcoded mock data for demo purposes:

### User Profile
```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  balance: number;
  currency: string;
}
```

### Transaction
```typescript
interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  currency: string;
  recipient?: string;
  sender?: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  description?: string;
}
```

### App Settings
```typescript
interface AppSettings {
  biometricsEnabled: boolean;
  notificationsEnabled: boolean;
  hapticFeedbackEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
}
```

## Custom Hooks

### useHaptics

```tsx
import { useHaptics } from './hooks/useHaptics';

const haptics = useHaptics();

// Light haptic for button press
await haptics.light();

// Medium haptic for confirmation
await haptics.medium();

// Heavy haptic for biometric success
await haptics.heavy();
```

### useBiometrics

```tsx
import { useBiometrics } from './hooks/useBiometrics';

const biometrics = useBiometrics();

if (biometrics.isAvailable) {
  const result = await biometrics.authenticate('Authenticate to continue');
  
  if (result.success) {
    // Authentication successful
  }
}
```

## Building and Deployment

For production builds and App Store / Google Play Store deployment, see the comprehensive [BUILD_GUIDE.md](./BUILD_GUIDE.md).

**Quick Start:**

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Initialize project
eas init

# Build for production
eas build --profile production --platform all
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

## Design Principles

This app follows Apple's Human Interface Guidelines:

1. **Typography**: San Francisco font family with iOS text styles
2. **Colors**: iOS system colors (blue, red, gray) and grouped backgrounds
3. **Spacing**: 8pt grid system for consistent alignment
4. **Navigation**: Native stack with large titles and slide transitions
5. **Animations**: Subtle, 200-300ms duration, no bounce effects
6. **Haptics**: Light for buttons, medium for confirmations, heavy for biometrics
7. **Accessibility**: VoiceOver support, Dynamic Type, 44pt minimum touch targets

## iOS Fidelity Checklist

- ✅ San Francisco typography
- ✅ iOS system colors
- ✅ Grouped background layout
- ✅ Native navigation stack
- ✅ Large collapsing titles
- ✅ System-style modals
- ✅ Haptic feedback patterns
- ✅ Biometric authentication
- ✅ VoiceOver accessibility
- ✅ Dynamic Type support
- ✅ No custom shadows or gradients
- ✅ No Material Design elements

## Known Limitations

- This is a demo app with hardcoded data (no real backend)
- Biometric authentication requires physical device or simulator with Face ID/Touch ID
- Some features are placeholder implementations (e.g., "Send Money" action)
- Optimized for iOS; Android uses iOS design patterns (not Material Design)

## Cross-Platform Compatibility

This app implements **iOS-native design as the primary design language** on both iOS and Android platforms. For detailed information about platform-specific implementation, see [PLATFORM_COMPATIBILITY.md](./PLATFORM_COMPATIBILITY.md).

**Key Points:**
- iOS design patterns are applied on both iOS and Android (Requirement 13.2)
- No Material Design components are used on Android (Requirement 13.3)
- Consistent visual appearance across platforms (Requirement 13.4)
- iOS design fidelity prioritized over platform conventions (Requirement 13.5)

## Contributing

This is a demo project showcasing iOS-native design patterns. Feel free to use it as a reference for your own projects.

## License

MIT License - feel free to use this code in your own projects.

## Acknowledgments

- Design inspired by Apple's Human Interface Guidelines
- Built with React Native and Expo
- Typography uses San Francisco font family (iOS system font)

---

**Note**: This app is designed to run on localhost as a standalone demo. No backend services or API keys are required.
