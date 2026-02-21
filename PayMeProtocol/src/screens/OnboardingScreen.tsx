/**
 * Onboarding Screen
 * 
 * Welcome screen for new users of the PayMe Protocol application.
 * Introduces the app with a clean, native iOS design.
 * 
 * Features:
 * - Centered icon (100x100pt)
 * - Large title heading
 * - Multi-line centered description
 * - "Learn more" link in system blue
 * - Bottom CTA button
 * - SafeAreaView for proper spacing
 * 
 * Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 15.1, 15.2
 */

import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography, Button } from '../components/design-system';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';

/**
 * Navigation prop type for Onboarding screen
 */
type OnboardingScreenNavigationProp = NativeStackNavigationProp<any, 'Onboarding'>;

/**
 * Props for Onboarding screen
 */
interface OnboardingScreenProps {
  navigation: OnboardingScreenNavigationProp;
}

/**
 * Onboarding Screen Component
 * 
 * Renders the welcome screen for new users.
 */
export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  /**
   * Handle "Get Started" button press
   * Navigates to the main app (Dashboard)
   */
  const handleGetStarted = () => {
    // In a real app, this would set a flag in AsyncStorage
    // to indicate onboarding is complete
    navigation.replace('Dashboard');
  };
  
  /**
   * Handle "Learn more" link press
   */
  const handleLearnMore = () => {
    console.log('Learn more pressed');
    // In a real app, this would navigate to an info screen
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Typography variant="largeTitle">
              💳
            </Typography>
          </View>
        </View>
        
        {/* Title */}
        <View style={styles.titleContainer}>
          <Typography variant="largeTitle" style={styles.title}>
            Welcome to PayMe
          </Typography>
        </View>
        
        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Typography variant="body" color="secondaryLabel" style={styles.description}>
            Send and receive money instantly with friends and family. 
            Secure, fast, and easy to use.
          </Typography>
        </View>
        
        {/* Learn More Link */}
        <TouchableOpacity
          onPress={handleLearnMore}
          accessibilityRole="link"
          accessibilityLabel="Learn more about PayMe"
        >
          <Typography variant="body" style={styles.learnMore}>
            Learn more
          </Typography>
        </TouchableOpacity>
      </View>
      
      {/* Bottom CTA Button */}
      <View style={styles.bottomContainer}>
        <Button
          variant="primary"
          size="large"
          onPress={handleGetStarted}
          accessibilityLabel="Get started with PayMe"
          accessibilityHint="Opens the main app"
        >
          Get Started
        </Button>
      </View>
    </SafeAreaView>
  );
};

/**
 * Styles for Onboarding screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.systemGroupedBackground,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.circle,
    backgroundColor: colors.secondarySystemGroupedBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: spacing.md,
  },
  title: {
    textAlign: 'center',
  },
  descriptionContainer: {
    marginBottom: spacing.lg,
  },
  description: {
    textAlign: 'center',
    maxWidth: 300,
  },
  learnMore: {
    color: colors.systemBlue,
    textAlign: 'center',
  },
  bottomContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
});
