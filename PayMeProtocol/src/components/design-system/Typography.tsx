/**
 * Typography Component
 * 
 * iOS-native text component that matches Apple's Human Interface Guidelines.
 * Supports Dynamic Type scaling for accessibility and uses San Francisco font family.
 * 
 * Features:
 * - Typography variants: largeTitle, title2, body, caption
 * - Color variants: label, secondaryLabel, tertiaryLabel
 * - Dynamic Type scaling support
 * - Full accessibility support (VoiceOver, accessibility labels)
 * 
 * Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 16.3
 */

import React from 'react';
import { Text, TextProps, StyleSheet, AccessibilityRole } from 'react-native';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

/**
 * Typography variant types matching iOS system text styles
 */
export type TypographyVariant = 'largeTitle' | 'title2' | 'body' | 'caption';

/**
 * Color variant types matching iOS system text colors
 */
export type TypographyColor = 'label' | 'secondaryLabel' | 'tertiaryLabel';

/**
 * Props for the Typography component
 */
export interface TypographyProps extends TextProps {
  /**
   * Typography variant - determines font size, weight, and line height
   * @default 'body'
   */
  variant?: TypographyVariant;
  
  /**
   * Color variant - determines text color from iOS system palette
   * @default 'label'
   */
  color?: TypographyColor;
  
  /**
   * Text content to display
   */
  children: React.ReactNode;
  
  /**
   * Maximum number of lines before truncating
   */
  numberOfLines?: number;
  
  /**
   * Accessibility label for VoiceOver
   * If not provided, the text content will be used
   */
  accessibilityLabel?: string;
  
  /**
   * Accessibility role for semantic meaning
   * @default 'text'
   */
  accessibilityRole?: AccessibilityRole;
  
  /**
   * Whether to allow font scaling based on user's accessibility settings
   * @default true
   */
  allowFontScaling?: boolean;
  
  /**
   * Maximum font size multiplier for Dynamic Type
   * @default undefined (no limit)
   */
  maxFontSizeMultiplier?: number;
}

/**
 * Typography Component
 * 
 * Renders text with iOS-native styling and full accessibility support.
 * 
 * @example
 * ```tsx
 * <Typography variant="largeTitle" color="label">
 *   Dashboard
 * </Typography>
 * 
 * <Typography variant="body" color="secondaryLabel" numberOfLines={2}>
 *   This is a longer description that will wrap to multiple lines
 * </Typography>
 * 
 * <Typography 
 *   variant="caption" 
 *   color="tertiaryLabel"
 *   accessibilityLabel="Last updated 5 minutes ago"
 * >
 *   5m ago
 * </Typography>
 * ```
 */
export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'label',
  children,
  numberOfLines,
  accessibilityLabel,
  accessibilityRole = 'text',
  allowFontScaling = true,
  maxFontSizeMultiplier,
  style,
  ...restProps
}) => {
  // Get typography style for the variant
  const typographyStyle = typography[variant];
  
  // Get color value for the color variant
  const colorValue = colors[color];
  
  return (
    <Text
      style={[
        styles.base,
        {
          fontFamily: typographyStyle.fontFamily,
          fontSize: typographyStyle.fontSize,
          fontWeight: typographyStyle.fontWeight,
          lineHeight: typographyStyle.lineHeight,
          color: colorValue,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      allowFontScaling={allowFontScaling}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      {...restProps}
    >
      {children}
    </Text>
  );
};

/**
 * Base styles for Typography component
 */
const styles = StyleSheet.create({
  base: {
    // Base text style - specific styles applied via props
  },
});

