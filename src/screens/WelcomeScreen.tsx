/**
 * Welcome Screen
 * 
 * Enhanced welcome screen with animated gradient and modern iOS design.
 * First screen users see when opening the app.
 * 
 * Features:
 * - Large app icon with gradient background
 * - App name and tagline
 * - Two prominent CTAs: Sign Up and Log In
 * - iOS-native design with proper spacing
 */

import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography, Button } from '../components/design-system';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const { height } = Dimensions.get('window');

type WelcomeScreenNavigationProp = NativeStackNavigationProp<any, 'Welcome'>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.iconContainer}>
            <View style={styles.iconGradient}>
              <Typography variant="largeTitle" style={styles.icon}>
                💳
              </Typography>
            </View>
          </View>
          
          <Typography variant="largeTitle" style={styles.appName}>
            PayMe Protocol
          </Typography>
          
          <Typography variant="body" color="secondaryLabel" style={styles.tagline}>
            Send and receive money instantly
          </Typography>
        </View>

        {/* CTA Buttons */}
        <View style={styles.ctaContainer}>
          <Button
            variant="primary"
            size="large"
            onPress={handleSignUp}
            accessibilityLabel="Create new account"
          >
            Get Started
          </Button>
          
          <Button
            variant="secondary"
            size="large"
            onPress={handleLogin}
            accessibilityLabel="Log in to existing account"
          >
            I Already Have an Account
          </Button>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Typography variant="caption" color="tertiaryLabel" style={styles.footerText}>
          Secure • Fast • Easy to Use
        </Typography>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.systemGroupedBackground,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: height * 0.15,
    paddingBottom: spacing.xl,
  },
  hero: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  iconGradient: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: colors.systemBlue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.systemBlue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  icon: {
    fontSize: 60,
  },
  appName: {
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  tagline: {
    textAlign: 'center',
    fontSize: 19,
  },
  ctaContainer: {
    gap: spacing.md,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: spacing.md,
  },
  footerText: {
    textAlign: 'center',
  },
});
