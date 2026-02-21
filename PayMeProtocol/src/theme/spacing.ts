/**
 * Spacing System
 * 
 * iOS-native spacing scale based on 8pt grid system.
 * All spacing values are multiples of 8 to ensure consistent
 * alignment and visual rhythm throughout the application.
 * 
 * Validates: Requirements 6.1, 6.2
 */

export const spacing = {
  xs: 4,    // 0.5x grid unit
  sm: 8,    // 1x grid unit
  md: 16,   // 2x grid units
  lg: 20,   // 2.5x grid units
  xl: 24,   // 3x grid units
  xxl: 32,  // 4x grid units
};

/**
 * Border Radius System
 * 
 * Standard border radius values for iOS-native components
 */
export const borderRadius = {
  small: 8,    // Small rounded corners
  medium: 10,  // Standard card/section corners
  large: 12,   // Larger rounded elements
  circle: 999, // Circular elements (use with equal width/height)
};

/**
 * Grid helper function for 8pt multiples
 * 
 * @param multiplier - Number of 8pt units
 * @returns Spacing value in points
 * 
 * @example
 * grid(1)  // 8
 * grid(2)  // 16
 * grid(3)  // 24
 */
export const grid = (multiplier: number): number => multiplier * 8;
