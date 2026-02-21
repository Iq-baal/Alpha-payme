# Design Document: iOS Native UI Redesign

## Overview

This design transforms the PayMe Protocol mobile application into a native iOS-styled experience using React Native and Expo. The redesign eliminates all custom web3 aesthetics, Convex backend dependencies, and non-native UI patterns, replacing them with components that match Apple's Human Interface Guidelines.

The application will function as a standalone localhost demo with hardcoded data, showcasing iOS-native design patterns including San Francisco typography, system colors, native navigation stacks, and iOS-style modals. Every screen will be indistinguishable from native iOS applications like Settings, Wallet, and system dialogs.

### Key Design Goals

- Match iOS system aesthetics pixel-perfectly
- Remove all backend dependencies (Convex)
- Create self-contained demo with mock data
- Support iOS accessibility features (VoiceOver, Dynamic Type)
- Maintain cross-platform compatibility with iOS-first approach
- Implement comprehensive design system for consistency

## Architecture

### Technology Stack

**Core Framework:**
- React Native 0.73+ (latest stable)
- Expo SDK 50+ for managed workflow and native module access
- TypeScript for type safety

**Navigation:**
- React Navigation 6.x (native stack navigator)
- Configured for iOS-native transitions and gestures

**UI Components:**
- Custom design system built on React Native primitives
- No third-party UI libraries (to ensure iOS fidelity)
- Platform-specific styling using Platform API

**State Management:**
- React Context API for global state (theme, user preferences)
- Local component state for UI interactions
- No external state management library needed (demo app)

**Haptics:**
- expo-haptics for iOS haptic feedback patterns

**Biometrics:**
- expo-local-authentication for Face ID/Touch ID

**Accessibility:**
- React Native Accessibility APIs
- expo-font for San Francisco font loading

### Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── design-system/  # Core design system components
│   │   ├── Typography.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Section.tsx
│   ├── dashboard/      # Dashboard-specific components
│   └── onboarding/     # Onboarding-specific components
├── screens/            # Screen components
│   ├── DashboardScreen.tsx
│   ├── OnboardingScreen.tsx
│   ├── SettingsScreen.tsx
│   └── TransactionDetailScreen.tsx
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── theme/             # Design tokens and theme
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── animations.ts
├── data/              # Mock data for demo
│   └── mockData.ts
├── hooks/             # Custom React hooks
│   ├── useHaptics.ts
│   └── useBiometrics.ts
└── utils/             # Utility functions
    └── accessibility.ts
```

### Design System Architecture

The design system is organized into three layers:

1. **Tokens Layer**: Raw design values (colors, spacing, font sizes)
2. **Primitive Layer**: Basic components (Typography, Button, Input)
3. **Composite Layer**: Complex components built from primitives (Card, Section, Modal)

This layered approach ensures consistency and makes it easy to maintain iOS fidelity across all screens.

## Components and Interfaces

### Design System Tokens

**Colors (theme/colors.ts)**

```typescript
export const colors = {
  // iOS System Colors
  systemBlue: '#007AFF',
  systemRed: '#FF3B30',
  systemGray: '#8E8E93',
  
  // Background Colors
  systemGroupedBackground: '#F2F2F7',      // iOS light mode primary background
  secondarySystemGroupedBackground: '#FFFFFF', // Card backgrounds
  
  // Text Colors
  label: '#000000',                         // Primary text
  secondaryLabel: '#3C3C43',               // Secondary text (60% opacity)
  tertiaryLabel: '#3C3C4399',              // Tertiary text (30% opacity)
  
  // Separator
  separator: '#3C3C4349',                   // Divider lines
};
```

**Typography (theme/typography.ts)**

```typescript
export const typography = {
  largeTitle: {
    fontFamily: 'SF Pro Display',
    fontSize: 34,
    fontWeight: '700' as const,
    lineHeight: 41,
  },
  title2: {
    fontFamily: 'SF Pro Display',
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontFamily: 'SF Pro Text',
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  caption: {
    fontFamily: 'SF Pro Text',
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
};
```

**Spacing (theme/spacing.ts)**

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

// 8pt grid system
export const grid = (multiplier: number) => multiplier * 8;
```

**Animations (theme/animations.ts)**

```typescript
export const animations = {
  duration: {
    fast: 200,
    normal: 250,
    slow: 300,
  },
  easing: {
    standard: 'ease-in-out',
  },
};
```

### Core Components

**Typography Component**

```typescript
interface TypographyProps {
  variant: 'largeTitle' | 'title2' | 'body' | 'caption';
  color?: 'label' | 'secondaryLabel' | 'tertiaryLabel';
  children: React.ReactNode;
  numberOfLines?: number;
  accessibilityLabel?: string;
}

// Supports Dynamic Type scaling
// Uses SF Pro font family
// Applies semantic color values
```

**Button Component**

```typescript
interface ButtonProps {
  variant: 'primary' | 'destructive' | 'secondary';
  size?: 'large' | 'medium';
  onPress: () => void;
  children: string;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

// Primary: system blue background, white text
// Destructive: system red text
// Secondary: system gray text
// Provides haptic feedback on press
// Minimum touch target: 44x44pt
```

**Input Component**

```typescript
interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  secureTextEntry?: boolean;
  accessibilityLabel?: string;
}

// Grouped cell appearance
// Subtle border or secondary background
// Native keyboard handling
// Supports Dynamic Type
```

**Card Component**

```typescript
interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

// Secondary system background
// Rounded corners (10pt radius)
// No drop shadows
// Optional chevron for navigation
```

**Section Component**

```typescript
interface SectionProps {
  title?: string;
  footer?: string;
  children: React.ReactNode;
}

// Groups related content
// iOS Settings-style section headers
// System grouped background
// Proper spacing (16pt top/bottom)
```

**Modal Component**

```typescript
interface ModalProps {
  visible: boolean;
  title: string;
  message: string;
  primaryAction: {
    label: string;
    onPress: () => void;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
}

// Centered rounded rectangle
// Light blur background overlay
// Bold title, regular body text
// Stacked buttons with dividers
// Matches iOS system alert appearance
```

### Navigation Configuration

**Stack Navigator Setup**

```typescript
const Stack = createNativeStackNavigator();

const navigationOptions = {
  headerLargeTitle: true,
  headerTransparent: false,
  headerBlurEffect: 'systemMaterial',
  headerLargeTitleStyle: {
    fontFamily: 'SF Pro Display',
    fontSize: 34,
    fontWeight: '700',
  },
  headerBackTitle: 'Back',
  animation: 'slide_from_right',
  animationDuration: 250,
};
```

**Navigation Structure**

```
Root Stack
├── Onboarding Stack (if first launch)
│   ├── Welcome Screen
│   ├── Features Screen
│   └── Setup Complete Screen
└── Main Stack
    ├── Dashboard Screen (root)
    ├── Transaction Detail Screen
    ├── Settings Screen
    └── Profile Screen
```

### Screen Specifications

**Dashboard Screen**

Layout:
- Large title: "Dashboard" (collapses on scroll)
- Balance card: Apple Wallet-style summary
- Grouped sections: Recent Activity, Quick Actions
- Tappable rows with right-aligned chevrons
- System grouped background

Components:
- Section (for grouping)
- Card (for balance display)
- Typography (for labels and values)
- Chevron icons (SF Symbols style)

**Onboarding Screen**

Layout:
- Centered icon (100x100pt)
- Large title heading (34pt bold)
- Multi-line description (17pt regular, centered)
- "Learn more" link (system blue, 17pt)
- Bottom CTA button (full width, 16pt padding)

Components:
- Typography (largeTitle, body)
- Button (primary variant)
- SafeAreaView for proper spacing

**Settings Screen**

Layout:
- Large title: "Settings"
- Grouped sections matching iOS Settings
- Tappable rows with labels and chevrons
- Toggle switches for preferences
- System grouped background

Components:
- Section (with headers)
- Card (for rows)
- Switch (native iOS switch)
- Typography (body text)

**Transaction Detail Screen**

Layout:
- Standard navigation bar with back button
- Transaction amount (large, centered)
- Details section (grouped list)
- Action buttons at bottom
- System grouped background

Components:
- Typography (title2 for amount)
- Section (for details)
- Button (primary and secondary)

## Data Models

### Mock Data Structure

Since this is a standalone demo, all data is hardcoded in `src/data/mockData.ts`.

**User Profile**

```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  balance: number;
  currency: string;
}
```

**Transaction**

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

**Settings**

```typescript
interface AppSettings {
  biometricsEnabled: boolean;
  notificationsEnabled: boolean;
  hapticFeedbackEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
}
```

**Mock Data Examples**

```typescript
export const mockUser: UserProfile = {
  id: '1',
  name: 'John Appleseed',
  email: 'john@example.com',
  balance: 1234.56,
  currency: 'USD',
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'received',
    amount: 50.00,
    currency: 'USD',
    sender: 'Jane Smith',
    timestamp: new Date('2024-01-15T10:30:00'),
    status: 'completed',
    description: 'Coffee payment',
  },
  // ... more transactions
];

export const mockSettings: AppSettings = {
  biometricsEnabled: true,
  notificationsEnabled: true,
  hapticFeedbackEnabled: true,
  theme: 'auto',
};
```

### Data Access Pattern

All screens import mock data directly:

```typescript
import { mockUser, mockTransactions } from '../data/mockData';
```

No API calls, no async data fetching. The app is fully functional offline as a demo.


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: San Francisco Font Usage

*For any* text component in the design system, the fontFamily property should be either 'SF Pro Display' or 'SF Pro Text'.

**Validates: Requirements 1.1**

### Property 2: Dynamic Type Scaling

*For any* text component and any accessibility font scale multiplier, applying the scale should result in proportional font size changes while maintaining relative size relationships between typography variants.

**Validates: Requirements 1.7**

### Property 3: No Inappropriate Visual Effects

*For any* style definition in the design system, it should not contain gradient properties, neon color values (high saturation colors outside system palette), or blur effects applied to non-modal backgrounds.

**Validates: Requirements 2.6**

### Property 4: No Custom Button Styling

*For any* button component, its style definition should not contain shadowOffset, shadowOpacity, gradient properties, or non-standard styling beyond the approved system colors and shapes.

**Validates: Requirements 3.5**

### Property 5: No Custom Navigation Headers

*For any* screen in the navigation stack, it should not define a custom header component and should use the native navigation header configuration.

**Validates: Requirements 4.5**

### Property 6: System Modal Pattern Consistency

*For any* alert dialog in the application, it should use the System_Modal component rather than custom modal implementations.

**Validates: Requirements 5.1**

### Property 7: 8pt Grid Spacing System

*For any* style definition containing margin or padding properties, all spacing values should be divisible by 8.

**Validates: Requirements 6.1**

### Property 8: Screen Edge Padding Range

*For any* screen container, the horizontal padding should be between 16pt and 20pt inclusive.

**Validates: Requirements 6.2**

### Property 9: Section Component Usage for Grouping

*For any* grouped content layout (multiple related items), the implementation should use the Section component rather than custom grouping.

**Validates: Requirements 6.3**

### Property 10: Grouped Background Color Usage

*For any* section or grouped content container, the background color should be either systemGroupedBackground or secondarySystemGroupedBackground from the color palette.

**Validates: Requirements 6.4**

### Property 11: High Contrast Typography

*For any* text element and its background, the color contrast ratio should meet or exceed WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 6.5**

### Property 12: Keyboard Type Matching

*For any* input field with a specified input type (email, numeric, phone), the keyboardType prop should match the semantic input type.

**Validates: Requirements 7.3**

### Property 13: No Heavy Input Borders

*For any* input component, the borderWidth should not exceed 1pt.

**Validates: Requirements 7.5**

### Property 14: No Card Drop Shadows

*For any* card component, the style definition should not contain shadowOffset, shadowOpacity, or elevation properties.

**Validates: Requirements 8.4**

### Property 15: Animation Duration Limits

*For any* animation configuration in the application, the duration should be between 200ms and 300ms inclusive.

**Validates: Requirements 10.2**

### Property 16: No Exaggerated Animations

*For any* animation configuration, it should not use spring or bounce easing functions, and scale transforms should not exceed 1.1.

**Validates: Requirements 10.3**

### Property 17: Button Press Haptic Feedback

*For any* button press event, the application should trigger light haptic feedback.

**Validates: Requirements 11.1**

### Property 18: Confirmation Action Haptic Feedback

*For any* confirmation action (modal primary button, destructive action), the application should trigger medium haptic feedback.

**Validates: Requirements 11.2**

### Property 19: Haptic Intensity Matching

*For any* haptic feedback call, the intensity parameter should use iOS system constants (light, medium, heavy) rather than custom numeric values.

**Validates: Requirements 11.5**

### Property 20: No Custom Authentication Modals

*For any* biometric authentication flow, the implementation should not render custom modal components and should use the native authentication API.

**Validates: Requirements 12.3**

### Property 21: Cross-Platform iOS Styling

*For any* component rendered on Android, the Platform.OS check should apply iOS styling rather than Material Design styling.

**Validates: Requirements 13.2**

### Property 22: No Material Design Imports

*For any* file in the codebase, it should not import from Material Design libraries (react-native-paper, @react-native-material, etc.).

**Validates: Requirements 13.3**

### Property 23: No Convex Files

*For any* file path in the codebase, it should not match Convex-related patterns (convex/, _generated/, convex.json).

**Validates: Requirements 14.1**

### Property 24: No Convex Integration Code

*For any* file in the codebase, it should not contain imports from 'convex/react' or 'convex/browser'.

**Validates: Requirements 14.2**

### Property 25: No External Network Dependencies

*For any* file in the codebase, it should not contain fetch calls, axios imports, or other HTTP client usage.

**Validates: Requirements 14.4**

### Property 26: Design System Import Consistency

*For any* screen component, it should import UI components from the design system directory rather than defining custom components inline.

**Validates: Requirements 15.1**

### Property 27: Theme Token Usage

*For any* component with styling, it should import and use values from the theme directory (colors, typography, spacing) rather than hardcoded values.

**Validates: Requirements 15.2**

### Property 28: Accessibility Label Presence

*For any* interactive element (button, touchable, input), it should have an accessibilityLabel prop defined.

**Validates: Requirements 16.3**

### Property 29: VoiceOver Support

*For any* interactive element, it should have proper accessibility props (accessibilityLabel, accessibilityHint, accessibilityRole) to support VoiceOver navigation.

**Validates: Requirements 16.4**

### Property 30: Minimum Touch Target Size

*For any* interactive element, its dimensions should be at least 44pt x 44pt to meet iOS accessibility guidelines.

**Validates: Requirements 16.5**

## Error Handling

### Input Validation

**Empty Input Handling:**
- Input components validate for empty/whitespace-only values
- Display inline error messages using system red color
- Maintain form state to prevent submission with invalid data

**Type Validation:**
- Email inputs validate format using regex
- Numeric inputs restrict to number keyboard and validate numeric format
- Display validation errors below input fields

### Biometric Authentication Errors

**Authentication Failure:**
- Display native iOS error messages from LocalAuthentication API
- Provide fallback to passcode entry
- Log authentication attempts for security

**Device Capability:**
- Check device biometric capability before showing biometric options
- Gracefully disable biometric features on unsupported devices
- Display appropriate messaging to users

### Navigation Errors

**Invalid Navigation:**
- Catch navigation errors and return to previous screen
- Log navigation errors for debugging
- Prevent navigation to non-existent routes

### Mock Data Errors

**Missing Data:**
- Provide default empty states for missing mock data
- Display placeholder content when data is unavailable
- Ensure app never crashes due to missing mock data

## Testing Strategy

### Dual Testing Approach

This feature requires both unit testing and property-based testing for comprehensive coverage:

**Unit Tests:**
- Verify specific examples of typography styles (largeTitle = 34pt, title2 = 22pt, etc.)
- Test specific color values match iOS system colors
- Verify button variants render with correct styling
- Test modal component structure and layout
- Verify navigation configuration
- Test specific screen layouts (Dashboard, Onboarding, Settings)
- Test biometric authentication flow with mocked API
- Test haptic feedback triggers on specific actions
- Verify mock data structure and access

**Property-Based Tests:**
- Verify all text components use San Francisco font family
- Test Dynamic Type scaling across all font sizes
- Verify no inappropriate visual effects (gradients, neon colors, blur)
- Test 8pt grid spacing system across all components
- Verify screen padding falls within 16-20pt range
- Test color contrast ratios meet WCAG standards
- Verify animation durations fall within 200-300ms range
- Test keyboard type matching for all input types
- Verify accessibility labels present on all interactive elements
- Test minimum touch target sizes (44x44pt)
- Verify no Convex imports or network calls exist
- Test design system import consistency across screens

### Property-Based Testing Configuration

**Library Selection:**
- Use `fast-check` for JavaScript/TypeScript property-based testing
- Integrate with Jest testing framework

**Test Configuration:**
- Minimum 100 iterations per property test
- Each test tagged with feature name and property reference
- Tag format: `// Feature: ios-native-ui-redesign, Property X: [property text]`

**Example Property Test Structure:**

```typescript
import fc from 'fast-check';

describe('Typography Properties', () => {
  it('should use San Francisco font for all text components', () => {
    // Feature: ios-native-ui-redesign, Property 1: San Francisco Font Usage
    fc.assert(
      fc.property(
        fc.constantFrom('largeTitle', 'title2', 'body', 'caption'),
        (variant) => {
          const style = typography[variant];
          return style.fontFamily === 'SF Pro Display' || 
                 style.fontFamily === 'SF Pro Text';
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing

**Screen Rendering:**
- Test each screen renders without errors
- Verify navigation between screens works
- Test modal opening and closing
- Verify haptic feedback triggers (with mocked haptics API)

**Accessibility Testing:**
- Test VoiceOver navigation flow
- Verify Dynamic Type scaling in rendered components
- Test touch target sizes in rendered UI
- Verify color contrast in actual rendered components

**Demo Functionality:**
- Test app launches without network connection
- Verify all mock data loads correctly
- Test all user interactions work with mock data
- Verify biometric prompts display (with mocked API)

### Testing Tools

- Jest for unit and integration tests
- React Native Testing Library for component testing
- fast-check for property-based testing
- Detox for end-to-end testing (optional)

### Coverage Goals

- 90%+ code coverage for design system components
- 100% coverage of correctness properties
- All screens tested for rendering and basic interactions
- All accessibility features tested

