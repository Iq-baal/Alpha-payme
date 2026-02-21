/**
 * Section Component
 * 
 * iOS-native section component that matches Apple's Settings app grouping pattern.
 * Used for organizing related content into visually distinct groups.
 * 
 * Features:
 * - iOS Settings-style section headers (uppercase, small, gray)
 * - Optional footer text for additional context
 * - System grouped background color
 * - Proper spacing (16pt top/bottom margins)
 * - Supports nested content (typically Card components)
 * 
 * Validates: Requirements 6.3, 6.4, 8.1
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Typography } from './Typography';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

/**
 * Props for the Section component
 */
export interface SectionProps {
  /**
   * Optional section title
   * Displayed above the content in uppercase, small, gray text
   * Matches iOS Settings section header style
   */
  title?: string;
  
  /**
   * Optional section footer
   * Displayed below the content in small, gray text
   * Used for additional context or explanations
   */
  footer?: string;
  
  /**
   * Section content
   * Typically contains Card components or other grouped elements
   */
  children: React.ReactNode;
  
  /**
   * Additional custom styles for the section container
   */
  style?: ViewStyle;
}

/**
 * Section Component
 * 
 * Renders an iOS-native section with optional header and footer.
 * Groups related content with proper spacing and styling.
 * 
 * @example
 * ```tsx
 * // Section with title
 * <Section title="Account">
 *   <Card onPress={() => {}}>
 *     <Typography variant="body">Profile</Typography>
 *   </Card>
 *   <Card onPress={() => {}}>
 *     <Typography variant="body">Settings</Typography>
 *   </Card>
 * </Section>
 * 
 * // Section with title and footer
 * <Section 
 *   title="Security" 
 *   footer="Enable biometric authentication for faster access"
 * >
 *   <Card>
 *     <Typography variant="body">Face ID</Typography>
 *   </Card>
 * </Section>
 * 
 * // Section without title
 * <Section>
 *   <Card>
 *     <Typography variant="body">Content</Typography>
 *   </Card>
 * </Section>
 * ```
 */
export const Section: React.FC<SectionProps> = ({
  title,
  footer,
  children,
  style,
}) => {
  return (
    <View style={[styles.section, style]}>
      {/* Section Header */}
      {title && (
        <View style={styles.headerContainer}>
          <Typography 
            variant="caption" 
            color="secondaryLabel"
            style={styles.headerText}
          >
            {title.toUpperCase()}
          </Typography>
        </View>
      )}
      
      {/* Section Content */}
      <View style={styles.contentContainer}>
        {children}
      </View>
      
      {/* Section Footer */}
      {footer && (
        <View style={styles.footerContainer}>
          <Typography 
            variant="caption" 
            color="secondaryLabel"
            style={styles.footerText}
          >
            {footer}
          </Typography>
        </View>
      )}
    </View>
  );
};

/**
 * Styles for Section component
 */
const styles = StyleSheet.create({
  section: {
    // 16pt top/bottom margins (Requirement 6.3)
    marginVertical: spacing.md,
  },
  headerContainer: {
    // Padding for header text
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerText: {
    // iOS Settings-style header: uppercase, small, gray
    fontSize: 13,
    letterSpacing: -0.08,
  },
  contentContainer: {
    // System grouped background (Requirement 6.4)
    backgroundColor: colors.systemGroupedBackground,
    
    // Spacing between content items
    gap: 1, // 1pt separator between cards (iOS pattern)
  },
  footerContainer: {
    // Padding for footer text
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  footerText: {
    fontSize: 13,
    lineHeight: 18,
  },
});
