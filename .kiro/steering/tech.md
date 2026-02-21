# Tech Stack

## Core Technologies

- React Native 0.81.5
- Expo SDK ~54.0
- TypeScript ~5.9.2
- React 19.1.0
- React Navigation 7.x (Native Stack)

## Key Dependencies

- expo-haptics: iOS haptic feedback patterns
- expo-local-authentication: Face ID / Touch ID integration
- expo-blur: Native blur effects
- @react-native-async-storage/async-storage: Local data persistence
- react-native-safe-area-context: Safe area handling
- react-native-screens: Native screen optimization

## Development Tools

- Jest 30.x: Testing framework
- @testing-library/react-native: Component testing
- Babel: JavaScript transpilation
- EAS CLI: Build and deployment

## Common Commands

```bash
# Development
npm start              # Start Expo dev server
npm run ios            # Run on iOS simulator
npm run android        # Run on Android emulator
npm run web            # Run in web browser

# Testing
npm test               # Run test suite
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate coverage report

# Building (requires EAS CLI)
eas build --profile production --platform ios
eas build --profile production --platform android
```

## Path Aliases

TypeScript path aliases are configured in tsconfig.json:
- @components/* → src/components/*
- @design-system/* → src/components/design-system/*
- @screens/* → src/screens/*
- @navigation/* → src/navigation/*
- @theme/* → src/theme/*
- @data/* → src/data/*
- @hooks/* → src/hooks/*
- @utils/* → src/utils/*

## Build System

- Expo managed workflow (no native code modifications)
- Metro bundler for JavaScript bundling
- Babel for TypeScript transpilation
- EAS Build for production builds
