/**
 * Button Component
 * 
 * iOS-native button component that matches Apple's Human Interface Guidelines.
 * Provides haptic feedback and full accessibility support.
 * 
 * Features:
 * - Button variants: primary (system blue), destructive (system red), secondary (gray text)
 * - Size variants: large, medium
 * - Minimum 44x44pt touch target for accessibility
 * - Haptic feedback on press
 * - Full accessibility support (VoiceOver, accessibility labels)
 * 
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4, 11.1, 16.3, 16.5
 */

import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  AccessibilityRole,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Typography } from './Typography';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

/**
 * Button variant types matching iOS system button styles
 */
export type ButtonVariant = 'primary' | 'destructive' | 'secondary';

/**
 * Button size types
 */
export type ButtonSize = 'large' | 'medium';

/**
 * Props for the Button component
 */
export interface ButtonProps {
  /**
   * Button variant - determines styling and color
   * - primary: system blue background with white text
   * - destructive: system red text (no background)
   * - secondary: system gray text (no background)
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * Button size - determines height and padding
   * - large: 50pt height (suitable for CTAs)
   * - medium: 44pt height (minimum touch target)
   * @default 'large'
   */
  size?: ButtonSize;
  
  /**
   * Button press handler
   */
  onPress: () => void;
  
  /**
   * Button label text
   */
  children: string;
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Accessibility label for VoiceOver
   * If not provided, the button text will be used
   */
  accessibilityLabel?: string;
  
  /**
   * Accessibility hint describing the button's action
   */
  accessibilityHint?: string;
  
  /**
   * Accessibility role
   * @default 'button'
   */
  accessibilityRole?: AccessibilityRole;
  
  /**
   * Custom style overrides
   */
  style?: ViewStyle;
}

/**
 * Button Component
 * 
 * Renders an iOS-native button with appropriate styling, haptic feedback,
 * and full accessibility support.
 * 
 * @example
 * ```tsx
 * // Primary button (CTA)
 * <Button 
 *   variant="primary" 
 *   size="large"
 *   onPress={() => console.log('Get Started')}
 * >
 *   Get Started
 * </Button>
 * 
 * // Destructive button
 * <Button 
 *   variant="destructive"
 *   onPress={() => console.log('Delete')}
 *   accessibilityHint="Deletes the selected item"
 * >
 *   Delete
 * </Button>
 * 
 * // Secondary button
 * <Button 
 *   variant="secondary"
 *   size="medium"
 *   onPress={() => console.log('Cancel')}
 * >
 *   Cancel
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'large',
  onPress,
  children,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  style,
}) => {
  /**
   * Handle button press with haptic feedback
   * Provides light haptic feedback on press (Requirement 11.1)
   * Attempts haptic feedback on all platforms (Requirement 13.2)
   */
  const handlePress = async () => {
    if (disabled) return;
    
    // Trigger light haptic feedback on button press
    // On Android, this will gracefully do nothing if not supported
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      // Haptic feedback not available on this device
    }
    
    onPress();
  };
  
  // Get container style based on variant and size
  const containerStyle = getContainerStyle(variant, size, disabled);
  
  // Get text style based on variant and disabled state
  const textStyle = getTextStyle(variant, disabled);
  
  return (
    <TouchableOpacity
      style={[styles.base, containerStyle, style]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel || children}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled }}
      activeOpacity={0.7}
    >
      <Typography
        variant="body"
        style={[styles.text, textStyle]}
        allowFontScaling={false}
      >
        {children}
      </Typography>
    </TouchableOpacity>
  );
};

/**
 * Get container style based on variant, size, and disabled state
 */
const getContainerStyle = (
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean
): ViewStyle => {
  const style: ViewStyle = {};
  
  // Size-based styles
  if (size === 'large') {
    style.height = 50;
    style.paddingHorizontal = spacing.lg;
  } else {
    // medium size - minimum 44pt touch target (Requirement 16.5)
    style.height = 44;
    style.paddingHorizontal = spacing.md;
  }
  
  // Variant-based styles
  if (variant === 'primary') {
    style.backgroundColor = disabled ? colors.systemGray : colors.systemBlue;
    style.borderRadius = 10;
  } else {
    // destructive and secondary have no background
    style.backgroundColor = 'transparent';
  }
  
  return style;
};

/**
 * Get text color based on variant and disabled state
 */
const getTextStyle = (
  variant: ButtonVariant,
  disabled: boolean
): TextStyle => {
  const style: TextStyle = {};
  
  if (disabled) {
    style.color = colors.tertiaryLabel;
    return style;
  }
  
  // Variant-based text colors
  if (variant === 'primary') {
    // Primary buttons have white text on blue background
    style.color = '#FFFFFF';
  } else if (variant === 'destructive') {
    // Destructive buttons use system red text
    style.color = colors.systemRed;
  } else {
    // Secondary buttons use system gray text
    style.color = colors.systemGray;
  }
  
  return style;
};

/**
 * Base styles for Button component
 */
const styles = StyleSheet.create({
  base: {
    // Minimum touch target: 44x44pt (Requirement 16.5)
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
  },
});
