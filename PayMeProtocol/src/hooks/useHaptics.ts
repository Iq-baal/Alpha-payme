/**
 * useHaptics Hook
 * 
 * Custom React hook for iOS-native haptic feedback patterns.
 * Wraps expo-haptics API with a typed interface and platform handling.
 * 
 * Features:
 * - Light haptic feedback for button presses
 * - Medium haptic feedback for confirmations
 * - Heavy haptic feedback for biometric authentication success
 * - Graceful platform handling (iOS only)
 * - Type-safe interface
 * 
 * Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5
 */

import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Haptic feedback intensity levels matching iOS system constants
 */
export type HapticIntensity = 'light' | 'medium' | 'heavy';

/**
 * Haptic feedback interface
 */
export interface HapticsInterface {
  /**
   * Trigger light haptic feedback
   * Used for: button presses, UI interactions
   * Validates: Requirement 11.1
   */
  light: () => Promise<void>;
  
  /**
   * Trigger medium haptic feedback
   * Used for: confirmations, successful actions
   * Validates: Requirement 11.2
   */
  medium: () => Promise<void>;
  
  /**
   * Trigger heavy haptic feedback
   * Used for: biometric authentication success, critical actions
   * Validates: Requirement 11.3
   */
  heavy: () => Promise<void>;
  
  /**
   * Trigger haptic feedback with specified intensity
   * @param intensity - Haptic intensity level
   */
  trigger: (intensity: HapticIntensity) => Promise<void>;
  
  /**
   * Check if haptic feedback is available on the device
   */
  isAvailable: boolean;
}

/**
 * useHaptics Hook
 * 
 * Provides a typed interface for triggering iOS-native haptic feedback.
 * Automatically handles platform differences and device capabilities.
 * 
 * @returns HapticsInterface with methods for triggering haptic feedback
 * 
 * @example
 * ```tsx
 * const haptics = useHaptics();
 * 
 * // Light haptic for button press
 * const handleButtonPress = async () => {
 *   await haptics.light();
 *   // ... handle button action
 * };
 * 
 * // Medium haptic for confirmation
 * const handleConfirm = async () => {
 *   await haptics.medium();
 *   // ... handle confirmation
 * };
 * 
 * // Heavy haptic for biometric success
 * const handleBiometricSuccess = async () => {
 *   await haptics.heavy();
 *   // ... handle success
 * };
 * 
 * // Check availability
 * if (haptics.isAvailable) {
 *   await haptics.trigger('medium');
 * }
 * ```
 */
export const useHaptics = (): HapticsInterface => {
  /**
   * Check if haptic feedback is available
   * Only available on iOS devices with haptic engine
   */
  const isAvailable = Platform.OS === 'ios';
  
  /**
   * Trigger light haptic feedback
   * Requirement 11.1: Button presses trigger light haptic feedback
   * Requirement 11.5: Uses iOS system constant (light)
   */
  const light = async (): Promise<void> => {
    if (!isAvailable) return;
    
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      // Silently fail if haptics are not available
      console.warn('Haptic feedback failed:', error);
    }
  };
  
  /**
   * Trigger medium haptic feedback
   * Requirement 11.2: Confirmations trigger medium haptic feedback
   * Requirement 11.5: Uses iOS system constant (medium)
   */
  const medium = async (): Promise<void> => {
    if (!isAvailable) return;
    
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  };
  
  /**
   * Trigger heavy haptic feedback
   * Requirement 11.3: Biometric success triggers heavy haptic feedback
   * Requirement 11.5: Uses iOS system constant (heavy)
   */
  const heavy = async (): Promise<void> => {
    if (!isAvailable) return;
    
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  };
  
  /**
   * Trigger haptic feedback with specified intensity
   * Requirement 11.5: Uses iOS system constants rather than custom numeric values
   * 
   * @param intensity - Haptic intensity level (light, medium, heavy)
   */
  const trigger = async (intensity: HapticIntensity): Promise<void> => {
    if (!isAvailable) return;
    
    try {
      switch (intensity) {
        case 'light':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'heavy':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        default:
          console.warn('Invalid haptic intensity:', intensity);
      }
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  };
  
  return {
    light,
    medium,
    heavy,
    trigger,
    isAvailable,
  };
};
