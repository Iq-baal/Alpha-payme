# Project Structure

## Directory Organization

```
src/
├── components/
│   └── design-system/     # Reusable UI components
├── screens/               # Screen components
├── navigation/            # Navigation configuration
├── theme/                 # Design tokens (colors, typography, spacing, animations)
├── data/                  # Mock data
├── hooks/                 # Custom React hooks
├── context/               # React Context providers
└── utils/                 # Utility functions
```

## Component Architecture

### Design System (`src/components/design-system/`)

Reusable UI components following iOS Human Interface Guidelines:
- Typography: Text component with iOS text styles
- Button: Primary, destructive, and secondary variants
- Input: Text input with iOS styling
- Card: Container with iOS card styling
- Section: Grouped list section with title
- Modal: iOS-style modal dialogs

Each component includes:
- TypeScript interfaces for props
- Comprehensive JSDoc comments
- Accessibility support (VoiceOver, Dynamic Type)
- Example files (*.example.tsx) for documentation
- Test files (*.test.tsx) for validation

### Screens (`src/screens/`)

Full-screen components representing app views:
- OnboardingScreen: Welcome screen with CTA
- DashboardScreen: Main app screen with balance and transactions
- TransactionDetailScreen: Detailed transaction view
- SettingsScreen: App settings with iOS-style toggles

### Theme (`src/theme/`)

Design tokens matching iOS system standards:
- colors.ts: iOS system colors (blue, red, gray, backgrounds, labels)
- typography.ts: San Francisco font styles (largeTitle, title2, body, caption)
- spacing.ts: 8pt grid system
- animations.ts: Timing and easing functions

### Hooks (`src/hooks/`)

Custom React hooks for platform features:
- useHaptics: Haptic feedback wrapper (light, medium, heavy)
- useBiometrics: Face ID / Touch ID authentication

## Code Conventions

- Use functional components with TypeScript
- Export interfaces for all component props
- Include JSDoc comments with requirement references
- Use path aliases (@components, @theme, etc.)
- Follow iOS naming conventions (e.g., systemBlue, secondaryLabel)
- Minimum 44pt touch targets for accessibility
- All text components support Dynamic Type scaling
