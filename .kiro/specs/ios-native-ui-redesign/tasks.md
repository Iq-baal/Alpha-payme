# Implementation Plan: iOS Native UI Redesign

## Overview

This implementation plan transforms the PayMe Protocol mobile application into a pixel-perfect iOS-native experience using React Native and Expo. The work is organized into sequential phases: project setup, design system foundation, core components, screen implementations, interactive features, accessibility, demo data, legacy cleanup, testing, and documentation.

Each task builds incrementally, with checkpoints to validate progress. The implementation prioritizes iOS fidelity while maintaining cross-platform compatibility.

## Tasks

- [x] 1. Project setup and initialization
  - [x] 1.1 Initialize Expo project with TypeScript template
    - Run `npx create-expo-app@latest PayMeProtocol --template expo-template-blank-typescript`
    - Configure app.json with iOS-specific settings (bundleIdentifier, orientation, splash screen)
    - Install core dependencies: React Navigation, expo-haptics, expo-local-authentication, expo-font
    - _Requirements: 13.1, 13.4_
  
  - [x] 1.2 Set up project directory structure
    - Create directory structure: src/components/design-system, src/screens, src/navigation, src/theme, src/data, src/hooks, src/utils
    - Configure TypeScript paths in tsconfig.json for clean imports
    - Set up .gitignore for React Native/Expo
    - _Requirements: 15.1, 15.2_
  
  - [x] 1.3 Configure React Navigation with native stack
    - Install @react-navigation/native and @react-navigation/native-stack
    - Create AppNavigator.tsx with native stack configuration
    - Configure iOS-native navigation options (large titles, blur effect, slide transitions)
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 2. Design system foundation - theme tokens
  - [x] 2.1 Create color palette matching iOS system colors
    - Create src/theme/colors.ts with iOS system colors (systemBlue, systemRed, systemGray)
    - Define background colors (systemGroupedBackground, secondarySystemGroupedBackground)
    - Define text colors (label, secondaryLabel, tertiaryLabel)
    - Define separator color
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 6.4_
  
  - [x] 2.2 Create typography system with San Francisco font
    - Create src/theme/typography.ts with typography scale (largeTitle, title2, body, caption)
    - Define font families (SF Pro Display, SF Pro Text)
    - Define font sizes, weights, and line heights matching iOS standards
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [x] 2.3 Create spacing system with 8pt grid
    - Create src/theme/spacing.ts with spacing scale (xs: 4, sm: 8, md: 16, lg: 20, xl: 24, xxl: 32)
    - Implement grid() helper function for 8pt multiples
    - _Requirements: 6.1, 6.2_
  
  - [x] 2.4 Create animation constants
    - Create src/theme/animations.ts with duration constants (fast: 200ms, normal: 250ms, slow: 300ms)
    - Define easing constants matching iOS animations
    - _Requirements: 10.2, 10.3_

- [x] 3. Core design system components
  - [x] 3.1 Implement Typography component
    - Create src/components/design-system/Typography.tsx
    - Support variants: largeTitle, title2, body, caption
    - Support color variants: label, secondaryLabel, tertiaryLabel
    - Implement Dynamic Type scaling support
    - Add accessibility props (accessibilityLabel, accessibilityRole)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 16.3_
  
  - [ ]* 3.2 Write property tests for Typography component
    - **Property 1: San Francisco Font Usage**
    - **Property 2: Dynamic Type Scaling**
    - **Property 11: High Contrast Typography**
    - **Validates: Requirements 1.1, 1.7, 6.5**
  
  - [x] 3.3 Implement Button component with iOS styling
    - Create src/components/design-system/Button.tsx
    - Support variants: primary (system blue), destructive (system red), secondary (gray text)
    - Support sizes: large, medium
    - Implement minimum 44x44pt touch target
    - Add haptic feedback on press
    - Add accessibility props (accessibilityLabel, accessibilityHint, accessibilityRole)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 11.1, 16.3, 16.5_
  
  - [ ]* 3.4 Write property tests for Button component
    - **Property 4: No Custom Button Styling**
    - **Property 17: Button Press Haptic Feedback**
    - **Property 30: Minimum Touch Target Size**
    - **Validates: Requirements 3.5, 11.1, 16.5**
  
  - [x] 3.5 Implement Input component with native iOS appearance
    - Create src/components/design-system/Input.tsx
    - Style with grouped cell appearance and subtle borders
    - Support keyboard types: default, numeric, email-address
    - Support secureTextEntry for passwords
    - Implement Dynamic Type support
    - Add accessibility props
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 16.3_
  
  - [ ]* 3.6 Write property tests for Input component
    - **Property 12: Keyboard Type Matching**
    - **Property 13: No Heavy Input Borders**
    - **Validates: Requirements 7.3, 7.5**
  
  - [x] 3.7 Implement Card component matching iOS style
    - Create src/components/design-system/Card.tsx
    - Use secondarySystemGroupedBackground color
    - Apply 10pt border radius
    - Support optional onPress for tappable cards
    - Support optional chevron icon for navigation
    - No drop shadows or elevation
    - Add accessibility props for tappable cards
    - _Requirements: 8.4, 8.5, 16.3_
  
  - [ ]* 3.8 Write property tests for Card component
    - **Property 14: No Card Drop Shadows**
    - **Validates: Requirements 8.4**
  
  - [x] 3.9 Implement Section component for grouped content
    - Create src/components/design-system/Section.tsx
    - Support optional title and footer text
    - Apply iOS Settings-style section headers (uppercase, small, gray)
    - Use proper spacing (16pt top/bottom margins)
    - Use systemGroupedBackground for container
    - _Requirements: 6.3, 6.4, 8.1_
  
  - [ ]* 3.10 Write property tests for Section component
    - **Property 9: Section Component Usage for Grouping**
    - **Property 10: Grouped Background Color Usage**
    - **Validates: Requirements 6.3, 6.4**

- [ ] 4. System Modal component
  - [ ] 4.1 Implement Modal component matching iOS system alerts
    - Create src/components/design-system/Modal.tsx
    - Implement centered rounded rectangle layout
    - Add light blur background overlay
    - Style title text as bold, body text as regular
    - Implement stacked buttons with divider lines
    - Match iOS system alert spacing and dimensions
    - Add medium haptic feedback on primary action
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 11.2_
  
  - [ ]* 4.2 Write property tests for Modal component
    - **Property 6: System Modal Pattern Consistency**
    - **Property 18: Confirmation Action Haptic Feedback**
    - **Validates: Requirements 5.1, 11.2**

- [ ] 5. Checkpoint - Design system validation
  - Ensure all design system components render correctly
  - Verify typography uses San Francisco fonts
  - Verify colors match iOS system palette
  - Verify spacing follows 8pt grid
  - Ask the user if questions arise

- [ ] 6. Custom hooks for native features
  - [x] 6.1 Implement useHaptics hook
    - Create src/hooks/useHaptics.ts
    - Wrap expo-haptics API with typed interface
    - Provide methods: light(), medium(), heavy()
    - Handle platform differences gracefully
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_
  
  - [ ]* 6.2 Write property tests for haptics integration
    - **Property 19: Haptic Intensity Matching**
    - **Validates: Requirements 11.5**
  
  - [x] 6.3 Implement useBiometrics hook
    - Create src/hooks/useBiometrics.ts
    - Wrap expo-local-authentication API
    - Check device capability
    - Provide authenticate() method with native prompts
    - Trigger heavy haptic feedback on success
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 11.3_
  
  - [ ]* 6.4 Write property tests for biometrics integration
    - **Property 20: No Custom Authentication Modals**
    - **Validates: Requirements 12.3**

- [ ] 7. Mock data and demo infrastructure
  - [x] 7.1 Create mock data models and TypeScript interfaces
    - Create src/data/mockData.ts
    - Define UserProfile interface (id, name, email, avatar, balance, currency)
    - Define Transaction interface (id, type, amount, currency, recipient, sender, timestamp, status, description)
    - Define AppSettings interface (biometricsEnabled, notificationsEnabled, hapticFeedbackEnabled, theme)
    - _Requirements: 14.3, 14.4_
  
  - [x] 7.2 Create hardcoded demo data
    - Create mockUser object with sample user data
    - Create mockTransactions array with 10-15 sample transactions
    - Create mockSettings object with default settings
    - Ensure all data is self-contained with no external dependencies
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

- [ ] 8. Dashboard screen implementation
  - [x] 8.1 Implement Dashboard screen layout
    - Create src/screens/DashboardScreen.tsx
    - Configure large title "Dashboard" with collapse on scroll
    - Implement balance card with Apple Wallet-style summary
    - Implement grouped sections: Recent Activity, Quick Actions
    - Use Section and Card components from design system
    - Import mockUser and mockTransactions
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 15.1, 15.2_
  
  - [x] 8.2 Implement tappable transaction rows with chevrons
    - Create transaction row component with right-aligned chevron
    - Add onPress handler to navigate to Transaction Detail screen
    - Display transaction type, amount, and timestamp
    - Use Typography component for text
    - Add light haptic feedback on tap
    - _Requirements: 8.2, 11.1, 16.3_
  
  - [ ]* 8.3 Write unit tests for Dashboard screen
    - Test screen renders without errors
    - Test balance card displays correct mock data
    - Test transaction rows render from mock data
    - Test navigation to detail screen on row tap

- [ ] 9. Onboarding screens implementation
  - [x] 9.1 Implement Welcome onboarding screen
    - Create src/screens/OnboardingScreen.tsx
    - Display centered icon (100x100pt)
    - Display large title heading using Typography component
    - Display multi-line centered description text
    - Display "Learn more" link in system blue
    - Display bottom CTA button with primary variant
    - Use SafeAreaView for proper spacing
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 15.1, 15.2_
  
  - [x] 9.2 Implement onboarding navigation flow
    - Add onboarding stack to navigation
    - Implement "Get Started" button navigation to main app
    - Store onboarding completion flag in AsyncStorage
    - Show onboarding only on first launch
    - _Requirements: 4.1, 4.4_
  
  - [ ]* 9.3 Write unit tests for Onboarding screen
    - Test screen renders all elements correctly
    - Test CTA button navigates to main app
    - Test layout matches iOS native patterns

- [ ] 10. Settings screen implementation
  - [x] 10.1 Implement Settings screen layout
    - Create src/screens/SettingsScreen.tsx
    - Configure large title "Settings"
    - Implement grouped sections matching iOS Settings
    - Create tappable rows with labels and chevrons
    - Add toggle switches for preferences (biometrics, notifications, haptics)
    - Import mockSettings for initial state
    - _Requirements: 8.1, 15.1, 15.2, 16.3_
  
  - [x] 10.2 Implement settings state management
    - Use React Context for global settings state
    - Create SettingsContext in src/context/SettingsContext.tsx
    - Provide methods to update settings
    - Persist settings changes to AsyncStorage
    - _Requirements: 14.3_
  
  - [ ]* 10.3 Write unit tests for Settings screen
    - Test screen renders all sections
    - Test toggle switches update state
    - Test settings persist to AsyncStorage

- [ ] 11. Transaction Detail screen implementation
  - [x] 11.1 Implement Transaction Detail screen layout
    - Create src/screens/TransactionDetailScreen.tsx
    - Display standard navigation bar with back button
    - Display transaction amount (large, centered) using Typography title2
    - Display details section with grouped list (recipient, date, status, description)
    - Display action buttons at bottom (Share, Report Issue)
    - Use Section and Card components
    - _Requirements: 4.2, 15.1, 15.2_
  
  - [x] 11.2 Implement transaction detail navigation
    - Accept transaction ID as route parameter
    - Find transaction from mockTransactions by ID
    - Handle missing transaction gracefully
    - _Requirements: 4.1, 4.4_
  
  - [ ]* 11.3 Write unit tests for Transaction Detail screen
    - Test screen renders transaction data correctly
    - Test back button navigation
    - Test handles missing transaction ID

- [ ] 12. Checkpoint - Screen implementations validation
  - Ensure all screens render correctly
  - Verify navigation between screens works
  - Verify mock data displays properly
  - Verify design system consistency across screens
  - Ask the user if questions arise

- [ ] 13. Animation and transition implementation
  - [x] 13.1 Configure navigation animations
    - Set animation type to 'slide_from_right' for all stack navigators
    - Set animation duration to 250ms
    - Verify animations match iOS native feel
    - _Requirements: 4.4, 10.1, 10.2, 10.4_
  
  - [x] 13.2 Implement subtle UI animations
    - Add fade-in animation for modal appearance (200ms)
    - Add scale animation for button press feedback (subtle, max 1.05 scale)
    - Ensure no bounce or exaggerated effects
    - _Requirements: 10.2, 10.3, 10.4, 10.5_
  
  - [ ]* 13.3 Write property tests for animations
    - **Property 15: Animation Duration Limits**
    - **Property 16: No Exaggerated Animations**
    - **Validates: Requirements 10.2, 10.3**

- [ ] 14. Accessibility implementation
  - [x] 14.1 Add accessibility labels to all interactive elements
    - Audit all Button, Card, Input components for accessibilityLabel
    - Add accessibilityHint for complex interactions
    - Set accessibilityRole appropriately (button, link, text, etc.)
    - _Requirements: 16.3, 16.4_
  
  - [x] 14.2 Implement VoiceOver navigation support
    - Test VoiceOver navigation flow through all screens
    - Ensure proper focus order
    - Add accessibilityLabel to navigation elements
    - _Requirements: 16.4_
  
  - [x] 14.3 Verify Dynamic Type support across all screens
    - Test all screens with maximum text size
    - Ensure layouts adapt to larger text
    - Verify no text truncation or overflow
    - _Requirements: 1.7, 16.1_
  
  - [ ]* 14.4 Write property tests for accessibility
    - **Property 28: Accessibility Label Presence**
    - **Property 29: VoiceOver Support**
    - **Property 30: Minimum Touch Target Size**
    - **Validates: Requirements 16.3, 16.4, 16.5**

- [x] 15. Convex removal and cleanup
  - [x] 15.1 Remove all Convex files and directories
    - Delete convex/ directory if exists
    - Delete _generated/ directory if exists
    - Delete convex.json if exists
    - Remove Convex dependencies from package.json
    - _Requirements: 14.1, 14.2_
  
  - [x] 15.2 Remove Convex integration code
    - Search codebase for 'convex/react' imports and remove
    - Search codebase for 'convex/browser' imports and remove
    - Remove ConvexProvider from App.tsx if exists
    - Remove any Convex hooks (useQuery, useMutation, etc.)
    - _Requirements: 14.2_
  
  - [x] 15.3 Remove network dependencies
    - Search for fetch() calls and remove or replace with mock data
    - Remove axios or other HTTP client imports
    - Ensure app functions entirely offline
    - _Requirements: 14.3, 14.4, 14.5_
  
  - [ ]* 15.4 Write property tests for legacy code removal
    - **Property 23: No Convex Files**
    - **Property 24: No Convex Integration Code**
    - **Property 25: No External Network Dependencies**
    - **Validates: Requirements 14.1, 14.2, 14.4**

- [x] 16. Cross-platform compatibility
  - [x] 16.1 Implement Platform-specific styling
    - Add Platform.OS checks where needed
    - Ensure iOS styling is applied on Android
    - Test app on Android device/emulator
    - Verify no Material Design components used
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_
  
  - [ ]* 16.2 Write property tests for cross-platform styling
    - **Property 21: Cross-Platform iOS Styling**
    - **Property 22: No Material Design Imports**
    - **Validates: Requirements 13.2, 13.3**

- [x] 17. Design system consistency audit
  - [x] 17.1 Audit all screens for design system usage
    - Verify all screens import components from design-system directory
    - Verify no inline custom components
    - Verify all styling uses theme tokens (colors, typography, spacing)
    - Replace any hardcoded values with theme imports
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_
  
  - [ ]* 17.2 Write property tests for design system consistency
    - **Property 26: Design System Import Consistency**
    - **Property 27: Theme Token Usage**
    - **Property 3: No Inappropriate Visual Effects**
    - **Validates: Requirements 15.1, 15.2, 2.6**

- [x] 18. Final checkpoint - Complete system validation
  - Run all unit tests and property tests
  - Test app on iOS device/simulator
  - Test app on Android device/emulator
  - Verify all screens match iOS native appearance
  - Verify all interactions provide appropriate haptic feedback
  - Verify accessibility features work correctly
  - Ensure app runs entirely offline with mock data
  - Ask the user if questions arise

- [x] 19. Documentation and deployment setup
  - [x] 19.1 Create README with setup instructions
    - Document installation steps (npm install, expo start)
    - Document project structure
    - Document design system usage
    - Document mock data structure
    - _Requirements: 15.1_
  
  - [x] 19.2 Configure app.json for deployment
    - Set app name, slug, version
    - Configure iOS bundle identifier
    - Configure splash screen and icon
    - Set orientation to portrait
    - Configure status bar style
    - _Requirements: 13.1_
  
  - [x] 19.3 Create build configuration for Expo
    - Configure eas.json for EAS Build
    - Set up iOS build profile
    - Set up Android build profile
    - Document build commands
    - _Requirements: 13.1, 13.4_

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation and provide opportunities for user feedback
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and screen functionality
- All implementation uses TypeScript with React Native and Expo
- The app functions entirely offline as a standalone demo with no backend dependencies
