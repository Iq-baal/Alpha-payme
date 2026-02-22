/**
 * Secure Onboarding Screen
 * 
 * Multi-step onboarding flow for PayMe Protocol with security setup.
 * Guides users through device key, cloud backup, and recovery setup.
 * 
 * Features:
 * - Step-by-step security configuration
 * - Biometric authentication integration
 * - Progress indicator
 * - iOS-native design
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography, Button, Input } from '../components/design-system';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useBiometrics } from '../hooks/useBiometrics';
import { useHaptics } from '../hooks/useHaptics';

type Step = 'welcome' | 'device-key' | 'cloud-key' | 'recovery-key' | 'complete';

type SecureOnboardingNavigationProp = NativeStackNavigationProp<any, 'SecureOnboarding'>;

interface SecureOnboardingProps {
  navigation: SecureOnboardingNavigationProp;
}

export const SecureOnboardingScreen: React.FC<SecureOnboardingProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { authenticate, isAvailable } = useBiometrics();
  const { light, medium, heavy } = useHaptics();

  const steps: Step[] = ['welcome', 'device-key', 'cloud-key', 'recovery-key', 'complete'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = async () => {
    light();
    
    if (currentStep === 'welcome') {
      setCurrentStep('device-key');
    } else if (currentStep === 'device-key') {
      setIsLoading(true);
      // Simulate device key generation
      setTimeout(() => {
        setIsLoading(false);
        medium();
        setCurrentStep('cloud-key');
      }, 2000);
    } else if (currentStep === 'cloud-key') {
      setIsLoading(true);
      // Simulate cloud backup setup
      setTimeout(() => {
        setIsLoading(false);
        medium();
        setCurrentStep('recovery-key');
      }, 1500);
    } else if (currentStep === 'recovery-key') {
      if (email.trim()) {
        setIsLoading(true);
        // Simulate recovery setup
        setTimeout(() => {
          setIsLoading(false);
          heavy();
          setCurrentStep('complete');
        }, 1500);
      }
    } else if (currentStep === 'complete') {
      heavy();
      navigation.replace('Dashboard');
    }
  };

  const handleBiometricSetup = async () => {
    if (isAvailable) {
      const result = await authenticate('Set up biometric authentication');
      if (result.success) {
        heavy();
        handleNext();
      }
    } else {
      handleNext();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              <Typography variant="largeTitle" style={styles.emoji}>
                🔐
              </Typography>
            </View>
            <Typography variant="largeTitle" style={styles.title}>
              Secure your digital liquidity
            </Typography>
            <Typography variant="body" color="secondaryLabel" style={styles.description}>
              PayMe Protocol uses a three-layer security system to protect your funds while ensuring you never lose access.
            </Typography>
          </View>
        );

      case 'device-key':
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              <Typography variant="largeTitle" style={styles.emoji}>
                📱
              </Typography>
            </View>
            <Typography variant="largeTitle" style={styles.title}>
              Device Key
            </Typography>
            <Typography variant="body" color="secondaryLabel" style={styles.description}>
              Encrypted locally on your phone's hardware. Total self-custody with biometric protection.
            </Typography>
            <View style={styles.securityLayers}>
              <SecurityLayerItem label="Device Key" active />
              <SecurityLayerItem label="Cloud Key" />
              <SecurityLayerItem label="Recovery Key" />
            </View>
          </View>
        );

      case 'cloud-key':
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              <Typography variant="largeTitle" style={styles.emoji}>
                ☁️
              </Typography>
            </View>
            <Typography variant="largeTitle" style={styles.title}>
              Cloud Layer
            </Typography>
            <Typography variant="body" color="secondaryLabel" style={styles.description}>
              Encrypted backup to ensure you never lose access to your funds, even if you lose your device.
            </Typography>
            <View style={styles.securityLayers}>
              <SecurityLayerItem label="Device Key" completed />
              <SecurityLayerItem label="Cloud Key" active />
              <SecurityLayerItem label="Recovery Key" />
            </View>
          </View>
        );

      case 'recovery-key':
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              <Typography variant="largeTitle" style={styles.emoji}>
                ✉️
              </Typography>
            </View>
            <Typography variant="largeTitle" style={styles.title}>
              Emergency Access
            </Typography>
            <Typography variant="body" color="secondaryLabel" style={styles.description}>
              Your last line of defense. Securely verified via your primary contact.
            </Typography>
            <View style={styles.securityLayers}>
              <SecurityLayerItem label="Device Key" completed />
              <SecurityLayerItem label="Cloud Key" completed />
              <SecurityLayerItem label="Recovery Key" active />
            </View>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              accessibilityLabel="Recovery email address"
            />
          </View>
        );

      case 'complete':
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              <Typography variant="largeTitle" style={styles.emoji}>
                ✅
              </Typography>
            </View>
            <Typography variant="largeTitle" style={styles.title}>
              Ready for business
            </Typography>
            <Typography variant="body" color="secondaryLabel" style={styles.description}>
              Your secure gateway to instant global payments is active.
            </Typography>
          </View>
        );

      default:
        return null;
    }
  };

  const getButtonText = () => {
    if (currentStep === 'device-key') return isLoading ? 'Creating Secure Key...' : 'Create Device Key';
    if (currentStep === 'cloud-key') return isLoading ? 'Configuring Backup...' : 'Configure Cloud Backup';
    if (currentStep === 'recovery-key') return isLoading ? 'Verifying...' : 'Verify Recovery Contact';
    if (currentStep === 'complete') return 'Go to Dashboard';
    return 'Continue';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Typography variant="caption" color="secondaryLabel" style={styles.progressText}>
          Step {currentStepIndex + 1} of {steps.length}
        </Typography>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderStepContent()}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          variant="primary"
          size="large"
          onPress={currentStep === 'device-key' && isAvailable ? handleBiometricSetup : handleNext}
          disabled={isLoading || (currentStep === 'recovery-key' && !email.trim())}
          accessibilityLabel={getButtonText()}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.systemBackground} />
          ) : (
            getButtonText()
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const SecurityLayerItem: React.FC<{ label: string; active?: boolean; completed?: boolean }> = ({ 
  label, 
  active, 
  completed 
}) => (
  <View style={styles.layerItem}>
    <View style={[
      styles.layerIcon,
      active && styles.layerIconActive,
      completed && styles.layerIconCompleted,
    ]}>
      {completed && <Typography variant="caption">✓</Typography>}
    </View>
    <Typography 
      variant="body" 
      color={active ? 'label' : 'secondaryLabel'}
      style={styles.layerLabel}
    >
      {label}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.systemGroupedBackground,
  },
  progressContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.separator,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.systemBlue,
  },
  progressText: {
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  stepContent: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  emoji: {
    fontSize: 80,
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing.xl,
    maxWidth: 320,
  },
  securityLayers: {
    width: '100%',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  layerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  layerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.separator,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layerIconActive: {
    backgroundColor: colors.systemBlue,
  },
  layerIconCompleted: {
    backgroundColor: colors.systemGreen,
  },
  layerLabel: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
});
