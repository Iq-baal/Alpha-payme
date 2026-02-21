/**
 * Card Component
 * 
 * iOS-native card component that matches Apple's Human Interface Guidelines.
 * Used for grouping related content with a clean, minimal design.
 * 
 * Features:
 * - Secondary system background color (white in light mode)
 * - 10pt border radius matching iOS standards
 * - Optional onPress for tappable cards
 * - Optional chevron icon for navigation
 * - No drop shadows or elevation (flat design)
 * - Full accessibility support
 * 
 * Validates: Requirements 8.4, 8.5, 16.3
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  AccessibilityRole,
} from 'react-native';
import { Typography } from './Typography';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

/**
 * Props for the Card component
 */
export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;
  
  /**
   * Optional press handler - makes the card tappable
   * When provided, the card becomes interactive
   */
  onPress?: () => void;
  
  /**
   * Whether to show a chevron icon on the right
   * Typically used for navigation cards
   * @default false
   */
  showChevron?: boolean;
  
  /**
   * Accessibility label for VoiceOver
   * Required when onPress is provided
   */
  accessibilityLabel?: string;
  
  /**
   * Accessibility hint describing the card's action
   * Recommended when onPress is provided
   */
  accessibilityHint?: string;
  
  /**
   * Accessibility role
   * @default 'button' when onPress is provided, undefined otherwise
   */
  accessibilityRole?: AccessibilityRole;
  
  /**
   * Additional custom styles for the card container
   */
  style?: ViewStyle;
}

/**
 * Card Component
 * 
 * Renders an iOS-native card with clean, minimal styling.
 * Can be used as a static container or an interactive element.
 * 
 * @example
 * ```tsx
 * // Static card
 * <Card>
 *   <Typography variant="body">Card content</Typography>
 * </Card>
 * 
 * // Tappable card with chevron
 * <Card 
 *   onPress={() => navigation.navigate('Detail')}
 *   showChevron
 *   accessibilityLabel="View transaction details"
 *   accessibilityHint="Opens the transaction detail screen"
 * >
 *   <Typography variant="body">Transaction #1234</Typography>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  showChevron = false,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  style,
}) => {
  // Determine if card is interactive
  const isInteractive = !!onPress;
  
  // Determine accessibility role
  const role = accessibilityRole || (isInteractive ? 'button' : undefined);
  
  // Render content with optional chevron
  const content = (
    <View style={styles.contentContainer}>
      <View style={styles.content}>
        {children}
      </View>
      {showChevron && (
        <View style={styles.chevronContainer}>
          <Typography variant="body" color="tertiaryLabel">
            ›
          </Typography>
        </View>
      )}
    </View>
  );
  
  // Render as TouchableOpacity if interactive, otherwise as View
  if (isInteractive) {
    return (
      <TouchableOpacity
        style={[styles.card, style]}
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole={role}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }
  
  return (
    <View style={[styles.card, style]}>
      {content}
    </View>
  );
};

/**
 * Styles for Card component
 */
const styles = StyleSheet.create({
  card: {
    // Secondary system background (white in light mode)
    backgroundColor: colors.secondarySystemGroupedBackground,
    
    // 10pt border radius matching iOS standards
    borderRadius: 10,
    
    // No drop shadows or elevation (Requirement 8.4)
    // iOS uses flat design for cards
    
    // Padding for content
    padding: spacing.md,
    
    // Minimum touch target when interactive
    minHeight: 44,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  chevronContainer: {
    marginLeft: spacing.sm,
    justifyContent: 'center',
  },
});
