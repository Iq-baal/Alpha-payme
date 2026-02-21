/**
 * Typography Component Usage Examples
 * 
 * This file demonstrates how to use the Typography component
 * in various scenarios throughout the application.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { spacing } from '../../theme/spacing';

/**
 * Example: Typography Variants
 * Shows all available typography variants
 */
export const TypographyVariantsExample = () => (
  <View style={styles.container}>
    <Typography variant="largeTitle">Large Title</Typography>
    <Typography variant="title2">Title 2</Typography>
    <Typography variant="body">Body Text</Typography>
    <Typography variant="caption">Caption Text</Typography>
  </View>
);

/**
 * Example: Color Variants
 * Shows all available color variants
 */
export const ColorVariantsExample = () => (
  <View style={styles.container}>
    <Typography color="label">Primary Label</Typography>
    <Typography color="secondaryLabel">Secondary Label</Typography>
    <Typography color="tertiaryLabel">Tertiary Label</Typography>
  </View>
);

/**
 * Example: Screen Title
 * Typical usage for a screen title with large title variant
 */
export const ScreenTitleExample = () => (
  <Typography 
    variant="largeTitle" 
    color="label"
    accessibilityRole="header"
    accessibilityLabel="Dashboard Screen"
  >
    Dashboard
  </Typography>
);

/**
 * Example: Section Header
 * Typical usage for a section header
 */
export const SectionHeaderExample = () => (
  <Typography 
    variant="title2" 
    color="label"
    accessibilityRole="header"
  >
    Recent Activity
  </Typography>
);

/**
 * Example: Body Content
 * Typical usage for body text with multiple lines
 */
export const BodyContentExample = () => (
  <Typography 
    variant="body" 
    color="label"
    numberOfLines={3}
  >
    This is a longer piece of body text that might wrap to multiple lines. 
    It uses the body variant which is 17pt regular weight, matching iOS standards.
  </Typography>
);

/**
 * Example: Caption/Metadata
 * Typical usage for timestamps, metadata, or supporting information
 */
export const CaptionExample = () => (
  <Typography 
    variant="caption" 
    color="tertiaryLabel"
    accessibilityLabel="Last updated 5 minutes ago"
  >
    5m ago
  </Typography>
);

/**
 * Example: Truncated Text
 * Shows how to truncate text to a specific number of lines
 */
export const TruncatedTextExample = () => (
  <Typography 
    variant="body" 
    color="secondaryLabel"
    numberOfLines={2}
  >
    This is a very long text that will be truncated after two lines. 
    The ellipsis will appear at the end to indicate there's more content 
    that isn't being displayed. This is useful for list items or cards 
    where space is limited.
  </Typography>
);

/**
 * Example: Dynamic Type Support
 * Shows how to limit font scaling for specific use cases
 */
export const DynamicTypeExample = () => (
  <View style={styles.container}>
    <Typography 
      variant="body" 
      allowFontScaling={true}
      maxFontSizeMultiplier={2.0}
    >
      This text will scale with Dynamic Type up to 2x
    </Typography>
    
    <Typography 
      variant="body" 
      allowFontScaling={false}
    >
      This text will not scale (use sparingly)
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.sm,
  },
});

