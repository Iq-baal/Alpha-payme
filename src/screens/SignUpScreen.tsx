/**
 * Sign Up Screen
 * 
 * iOS-native registration screen with form validation.
 * Follows Apple Human Interface Guidelines for authentication flows.
 * 
 * Features:
 * - Full name, email, and password inputs
 * - Password confirmation
 * - Terms and conditions agreement
 * - Primary sign up button
 * - Login navigation link
 * - Keyboard-aware scrolling
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography, Button, Input } from '../components/design-system';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useHaptics } from '../hooks/useHaptics';

type SignUpScreenNavigationProp = NativeStackNavigationProp<any, 'SignUp'>;

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const haptics = useHaptics();

  /**
   * Validate email format
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate password strength
   */
  const isValidPassword = (password: string): boolean => {
    return password.length >= 8;
  };

  /**
   * Handle sign up
   */
  const handleSignUp = async () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      Alert.alert('Error', 'Please agree to the Terms and Conditions');
      return;
    }

    setIsLoading(true);
    await haptics.light();

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      haptics.medium();
      
      Alert.alert(
        'Success',
        'Your account has been created successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.replace('Dashboard'),
          },
        ]
      );
    }, 1000);
  };

  /**
   * Navigate to login screen
   */
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  /**
   * Show terms and conditions
   */
  const handleTermsPress = () => {
    Alert.alert(
      'Terms and Conditions',
      'By using PayMe Protocol, you agree to our terms of service and privacy policy.',
      [{ text: 'OK' }]
    );
  };

  /**
   * Toggle terms agreement
   */
  const toggleTerms = async () => {
    await haptics.light();
    setAgreedToTerms(!agreedToTerms);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Typography variant="largeTitle">💳</Typography>
            </View>
            <Typography variant="largeTitle" style={styles.title}>
              Create Account
            </Typography>
            <Typography variant="body" color="secondaryLabel" style={styles.subtitle}>
              Join PayMe Protocol today
            </Typography>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="John Doe"
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
            />

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="At least 8 characters"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
              textContentType="newPassword"
            />

            <Input
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-enter your password"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
              textContentType="newPassword"
            />

            {/* Terms and Conditions */}
            <TouchableOpacity
              style={styles.termsContainer}
              onPress={toggleTerms}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: agreedToTerms }}
            >
              <View style={styles.checkbox}>
                {agreedToTerms && (
                  <Typography variant="body" style={styles.checkmark}>
                    ✓
                  </Typography>
                )}
              </View>
              <View style={styles.termsTextContainer}>
                <Typography variant="body" color="secondaryLabel">
                  I agree to the{' '}
                </Typography>
                <TouchableOpacity onPress={handleTermsPress}>
                  <Typography variant="body" style={styles.link}>
                    Terms and Conditions
                  </Typography>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <Button
              variant="primary"
              size="large"
              onPress={handleSignUp}
              disabled={isLoading}
              accessibilityLabel="Create account"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Typography variant="body" color="secondaryLabel">
              Already have an account?{' '}
            </Typography>
            <TouchableOpacity onPress={handleLogin} accessibilityRole="link">
              <Typography variant="body" style={styles.link}>
                Log In
              </Typography>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.systemGroupedBackground,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.secondarySystemGroupedBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
  },
  form: {
    gap: spacing.md,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing.xs,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.systemBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    marginTop: 2,
  },
  checkmark: {
    color: colors.systemBlue,
    fontSize: 16,
    fontWeight: '600',
  },
  termsTextContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  link: {
    color: colors.systemBlue,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
});
