/**
 * Input Component
 * 
 * iOS-native input component that matches Apple's Human Interface Guidelines.
 * Features grouped cell appearance with subtle borders and full accessibility support.
 * 
 * Features:
 * - Grouped cell appearance with subtle borders
 * - Keyboard type support: default, numeric, email-address
 * - Secure text entry for passwords
 * - Dynamic Type support for accessibility
 * - Full accessibility support (VoiceOver, accessibility labels)
 * 
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5, 16.3
 */

import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
  Platform,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

/**
 * Keyboard type options for the input
 */
export type InputKeyboardType = 'default' | 'numeric' | 'email-address';

/**
 * Props for the Input component
 */
export interface InputProps {
  /**
   * Current value of the input
   */
  value: string;
  
  /**
   * Callback when the text changes
   */
  onChangeText: (text: string) => void;
  
  /**
   * Placeholder text displayed when input is empty
   */
  placeholder?: string;
  
  /**
   * Keyboard type to display
   * - default: Standard keyboard
   * - numeric: Numeric keyboard
   * - email-address: Email keyboard with @ and .
   * @default 'default'
   */
  keyboardType?: InputKeyboardType;
  
  /**
   * Whether to obscure the text (for passwords)
   * @default false
   */
  secureTextEntry?: boolean;
  
  /**
   * Accessibility label for VoiceOver
   * If not provided, the placeholder will be used
   */
  accessibilityLabel?: string;
  
  /**
   * Accessibility hint describing the input's purpose
   */
  accessibilityHint?: string;
  
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether to auto-focus the input on mount
   * @default false
   */
  autoFocus?: boolean;
  
  /**
   * Callback when the input is focused
   */
  onFocus?: () => void;
  
  /**
   * Callback when the input loses focus
   */
  onBlur?: () => void;
  
  /**
   * Maximum length of the input
   */
  maxLength?: number;
  
  /**
   * Whether to allow font scaling based on user's accessibility settings
   * @default true
   */
  allowFontScaling?: boolean;
}

/**
 * Input Component
 * 
 * Renders an iOS-native input field with grouped cell appearance,
 * appropriate keyboard types, and full accessibility support.
 * 
 * @example
 * ```tsx
 * // Default text input
 * <Input
 *   value={name}
 *   onChangeText={setName}
 *   placeholder="Enter your name"
 *   accessibilityLabel="Name input"
 * />
 * 
 * // Email input
 * <Input
 *   value={email}
 *   onChangeText={setEmail}
 *   placeholder="Email address"
 *   keyboardType="email-address"
 *   accessibilityLabel="Email input"
 * />
 * 
 * // Password input
 * <Input
 *   value={password}
 *   onChangeText={setPassword}
 *   placeholder="Password"
 *   secureTextEntry
 *   accessibilityLabel="Password input"
 *   accessibilityHint="Enter your password"
 * />
 * 
 * // Numeric input
 * <Input
 *   value={amount}
 *   onChangeText={setAmount}
 *   placeholder="Amount"
 *   keyboardType="numeric"
 *   accessibilityLabel="Amount input"
 * />
 * ```
 */
export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  accessibilityLabel,
  accessibilityHint,
  disabled = false,
  autoFocus = false,
  onFocus,
  onBlur,
  maxLength,
  allowFontScaling = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  /**
   * Handle focus event
   */
  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };
  
  /**
   * Handle blur event
   */
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };
  
  // Get container style based on focus and disabled state
  const containerStyle = getContainerStyle(isFocused, disabled);
  
  // Get text style based on disabled state
  const textStyle = getTextStyle(disabled);
  
  // Map keyboard type to React Native KeyboardTypeOptions
  const nativeKeyboardType: KeyboardTypeOptions = 
    keyboardType === 'numeric' ? 'number-pad' : keyboardType;
  
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, textStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.tertiaryLabel}
        keyboardType={nativeKeyboardType}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        autoFocus={autoFocus}
        onFocus={handleFocus}
        onBlur={handleBlur}
        maxLength={maxLength}
        allowFontScaling={allowFontScaling}
        accessibilityLabel={accessibilityLabel || placeholder}
        accessibilityHint={accessibilityHint}
        accessibilityRole="text"
        accessibilityState={{ disabled }}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        autoCorrect={keyboardType !== 'email-address'}
        keyboardAppearance="light"
        returnKeyType="done"
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

/**
 * Get container style based on focus and disabled state
 */
const getContainerStyle = (
  isFocused: boolean,
  disabled: boolean
): ViewStyle => {
  const style: ViewStyle = {};
  
  if (disabled) {
    style.backgroundColor = colors.systemGroupedBackground;
    style.borderColor = colors.separator;
  } else if (isFocused) {
    // Focused state: slightly more prominent border
    style.backgroundColor = colors.secondarySystemGroupedBackground;
    style.borderColor = colors.systemBlue;
  } else {
    // Default state: subtle border
    style.backgroundColor = colors.secondarySystemGroupedBackground;
    style.borderColor = colors.separator;
  }
  
  return style;
};

/**
 * Get text style based on disabled state
 */
const getTextStyle = (disabled: boolean): TextStyle => {
  const style: TextStyle = {};
  
  if (disabled) {
    style.color = colors.tertiaryLabel;
  } else {
    style.color = colors.label;
  }
  
  return style;
};

/**
 * Styles for Input component
 */
const styles = StyleSheet.create({
  container: {
    // Grouped cell appearance with rounded corners
    borderRadius: 10,
    borderWidth: 1, // Subtle border (Requirement 7.5: no heavy borders)
    paddingHorizontal: spacing.md,
    minHeight: 44, // Minimum touch target for accessibility
  },
  input: {
    // iOS body text style (17pt regular)
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    
    // Vertical padding for comfortable text entry
    // iOS styling applied on all platforms (Requirement 13.2)
    paddingVertical: spacing.sm + spacing.xs, // 12pt
    
    // Remove default styling
    margin: 0,
    padding: 0,
  },
});
