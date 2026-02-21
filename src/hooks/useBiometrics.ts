/**
 * useBiometrics Hook
 * 
 * Custom React hook for iOS-native biometric authentication (Face ID / Touch ID).
 * Wraps expo-local-authentication API with device capability checking and haptic feedback.
 * 
 * Features:
 * - Check device biometric capability
 * - Authenticate with native iOS prompts
 * - Heavy haptic feedback on successful authentication
 * - Graceful error handling
 * - Type-safe interface
 * 
 * Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5, 11.3
 */

import { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { useHaptics } from './useHaptics';

/**
 * Biometric authentication result
 */
export interface BiometricResult {
  /**
   * Whether authentication was successful
   */
  success: boolean;
  
  /**
   * Error message if authentication failed
   */
  error?: string;
}

/**
 * Biometric authentication interface
 */
export interface BiometricsInterface {
  /**
   * Whether biometric authentication is available on the device
   */
  isAvailable: boolean;
  
  /**
   * Whether the device is currently checking biometric capability
   */
  isChecking: boolean;
  
  /**
   * Type of biometric authentication available
   * - 1: Touch ID
   * - 2: Face ID
   * - 3: Iris
   * - undefined: Not available
   */
  biometricType?: number;
  
  /**
   * Authenticate user with biometric prompt
   * 
   * @param promptMessage - Message to display in the authentication prompt
   * @returns BiometricResult with success status and optional error
   * 
   * Validates: Requirements 12.1, 12.2, 12.3, 12.4, 11.3
   */
  authenticate: (promptMessage?: string) => Promise<BiometricResult>;
}

/**
 * useBiometrics Hook
 * 
 * Provides a typed interface for iOS-native biometric authentication.
 * Automatically checks device capability and provides native authentication prompts.
 * 
 * @returns BiometricsInterface with methods and state for biometric authentication
 * 
 * @example
 * ```tsx
 * const biometrics = useBiometrics();
 * 
 * // Check if biometrics are available
 * if (biometrics.isAvailable) {
 *   // Authenticate user
 *   const result = await biometrics.authenticate('Authenticate to continue');
 *   
 *   if (result.success) {
 *     // Authentication successful
 *     console.log('Authenticated!');
 *   } else {
 *     // Authentication failed
 *     console.error('Authentication failed:', result.error);
 *   }
 * }
 * ```
 */
export const useBiometrics = (): BiometricsInterface => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [biometricType, setBiometricType] = useState<number | undefined>(undefined);
  
  const haptics = useHaptics();
  
  /**
   * Check device biometric capability on mount
   * Requirement 12.1: Check device capability before showing biometric options
   */
  useEffect(() => {
    checkBiometricCapability();
  }, []);
  
  /**
   * Check if biometric authentication is available on the device
   * Requirement 12.1: Check device biometric capability
   */
  const checkBiometricCapability = async (): Promise<void> => {
    setIsChecking(true);
    
    try {
      // Check if hardware is available
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      
      if (!hasHardware) {
        setIsAvailable(false);
        setIsChecking(false);
        return;
      }
      
      // Check if biometrics are enrolled
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      
      if (!isEnrolled) {
        setIsAvailable(false);
        setIsChecking(false);
        return;
      }
      
      // Get supported authentication types
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      
      if (supportedTypes.length > 0) {
        setIsAvailable(true);
        setBiometricType(supportedTypes[0]);
      } else {
        setIsAvailable(false);
      }
    } catch (error) {
      console.error('Error checking biometric capability:', error);
      setIsAvailable(false);
    } finally {
      setIsChecking(false);
    }
  };
  
  /**
   * Authenticate user with biometric prompt
   * 
   * Requirements:
   * - 12.2: Use native iOS styling for biometric prompts
   * - 12.3: No custom modal styling for authentication flows
   * - 12.4: Match iOS system biometric prompt appearance
   * - 12.5: Provide appropriate haptic feedback on completion
   * - 11.3: Heavy haptic feedback on success
   * 
   * @param promptMessage - Message to display in the authentication prompt
   * @returns BiometricResult with success status and optional error
   */
  const authenticate = async (
    promptMessage: string = 'Authenticate to continue'
  ): Promise<BiometricResult> => {
    if (!isAvailable) {
      return {
        success: false,
        error: 'Biometric authentication is not available on this device',
      };
    }
    
    try {
      // Authenticate with native iOS prompt
      // Requirement 12.3: Use native authentication API (no custom modals)
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        fallbackLabel: 'Use Passcode',
        disableDeviceFallback: false,
      });
      
      if (result.success) {
        // Requirement 11.3: Heavy haptic feedback on biometric success
        await haptics.heavy();
        
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          error: result.error || 'Authentication failed',
        };
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      };
    }
  };
  
  return {
    isAvailable,
    isChecking,
    biometricType,
    authenticate,
  };
};
