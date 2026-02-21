/**
 * Accessibility Utilities
 * 
 * Helper functions for iOS accessibility features.
 * Supports VoiceOver, Dynamic Type, and accessibility compliance.
 * 
 * Validates: Requirements 16.1, 16.2, 16.3, 16.4, 16.5
 */

import { AccessibilityInfo } from 'react-native';

/**
 * Check if VoiceOver is enabled
 * 
 * @returns Promise<boolean> - Whether VoiceOver is enabled
 */
export const isVoiceOverEnabled = async (): Promise<boolean> => {
  try {
    return await AccessibilityInfo.isScreenReaderEnabled();
  } catch (error) {
    console.error('Error checking VoiceOver status:', error);
    return false;
  }
};

/**
 * Announce a message to VoiceOver
 * 
 * @param message - Message to announce
 */
export const announceForAccessibility = (message: string): void => {
  AccessibilityInfo.announceForAccessibility(message);
};

/**
 * Check if minimum touch target size is met
 * 
 * iOS accessibility guidelines require minimum 44x44pt touch targets
 * 
 * @param width - Element width in points
 * @param height - Element height in points
 * @returns boolean - Whether touch target meets minimum size
 */
export const meetsMinimumTouchTarget = (width: number, height: number): boolean => {
  const MINIMUM_SIZE = 44;
  return width >= MINIMUM_SIZE && height >= MINIMUM_SIZE;
};

/**
 * Calculate color contrast ratio
 * 
 * WCAG AA requires:
 * - 4.5:1 for normal text
 * - 3:1 for large text (18pt+ or 14pt+ bold)
 * 
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @returns number - Contrast ratio
 */
export const calculateContrastRatio = (
  foreground: string,
  background: string
): number => {
  const getLuminance = (hex: string): number => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    // Calculate relative luminance
    const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
  };
  
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check if color contrast meets WCAG AA standards
 * 
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @param isLargeText - Whether text is large (18pt+ or 14pt+ bold)
 * @returns boolean - Whether contrast meets WCAG AA
 */
export const meetsContrastRequirements = (
  foreground: string,
  background: string,
  isLargeText: boolean = false
): boolean => {
  const ratio = calculateContrastRatio(foreground, background);
  const minimumRatio = isLargeText ? 3 : 4.5;
  return ratio >= minimumRatio;
};

/**
 * Get accessibility label for transaction type
 * 
 * @param type - Transaction type ('sent' or 'received')
 * @param amount - Transaction amount
 * @param contact - Contact name
 * @returns string - Accessibility label
 */
export const getTransactionAccessibilityLabel = (
  type: 'sent' | 'received',
  amount: string,
  contact: string
): string => {
  const action = type === 'sent' ? 'Sent' : 'Received';
  const preposition = type === 'sent' ? 'to' : 'from';
  return `${action} ${amount} ${preposition} ${contact}`;
};

/**
 * Get accessibility hint for navigation
 * 
 * @param destination - Destination screen name
 * @returns string - Accessibility hint
 */
export const getNavigationAccessibilityHint = (destination: string): string => {
  return `Opens the ${destination} screen`;
};
