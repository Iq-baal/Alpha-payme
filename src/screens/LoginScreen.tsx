/**
 * Login Screen
 * 
 * iOS-native login screen with Face ID/Touch ID support.
 * Follows Apple Human Interface Guidelines for authentication flows.
 * 
 * Features:
 * - Email and password inputs with iOS styling
 * - Face ID / Touch ID quick login
 * - "Forgot Password?" link
 * - Primary login button
 * - Sign up navigation link
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
import { useBiometrics } from '../hooks/useBiometrics';
import { useHaptics } from '../hooks/useHaptics';

type LoginScreenNavigationProp = NativeStackNavigationProp<any, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const biometrics = useBiometrics();
  const haptics = useHaptics();

  /**
   * Handle login with email and password
   */
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    await haptics.light();

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      haptics.medium();
      navigation.replace('SecureOnboarding');
    }, 1000);
  };

  /**
   * Handle biometric authentication
   */
  const handleBiometricLogin = async () => {
    if (!biometrics.isAvailable) {
      Alert.alert(
        'Not Available',
        'Biometric authentication is not available on this device'
      );
      return;
    }

    const result = await biometrics.authenticate('Log in to PayMe Protocol');

    if (result.success) {
      await haptics.heavy();
      navigation.replace('SecureOnboarding');
    } else if (result.error) {
      Alert.alert('Authentication Failed', result.error);
    }
  };

  /**
   * Handle forgot password
   */
  const handleForgotPassword = () => {
    Alert.alert(
      'Reset Password',
      'A password reset link will be sent to your email address.',
      [{ text: 'OK' }]
    );
  };

  /**
   * Navigate to sign up screen
   */
  const handleSignUp = () => {
    navigation.navigate('SignUp');
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
              Welcome Back
            </Typography>
            <Typography variant="body" color="secondaryLabel" style={styles.subtitle}>
              Log in to your PayMe account
            </Typography>
          </View>

          {/* Biometric Login Button */}
          {biometrics.isAvailable && (
            <View style={styles.biometricContainer}>
              <Button
                variant="secondary"
                size="large"
                onPress={handleBiometricLogin}
                accessibilityLabel="Log in with Face ID or Touch ID"
              >
                {biometrics.biometricType === 'FaceID' ? '🔐 Log in with Face ID' : '👆 Log in with Touch ID'}
              </Button>
            </View>
          )}

          {/* Divider */}
          {biometrics.isAvailable && (
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Typography variant="caption" color="tertiaryLabel" style={styles.dividerText}>
                or
              </Typography>
              <View style={styles.divider} />
            </View>
          )}

          {/* Form */}
          <View style={styles.form}>
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
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
            />

            {/* Forgot Password Link */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPassword}
              accessibilityRole="link"
            >
              <Typography variant="body" style={styles.link}>
                Forgot Password?
              </Typography>
            </TouchableOpacity>

            {/* Login Button */}
            <Button
              variant="primary"
              size="large"
              onPress={handleLogin}
              disabled={isLoading}
              accessibilityLabel="Log in"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Typography variant="body" color="secondaryLabel">
              Don't have an account?{' '}
            </Typography>
            <TouchableOpacity onPress={handleSignUp} accessibilityRole="link">
              <Typography variant="body" style={styles.link}>
                Sign Up
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
  biometricContainer: {
    marginBottom: spacing.md,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.separator,
  },
  dividerText: {
    marginHorizontal: spacing.md,
  },
  form: {
    gap: spacing.md,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -spacing.xs,
  },
  link: {
    color: colors.systemBlue,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
});
