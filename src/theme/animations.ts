/**
 * Animation Constants
 * 
 * Defines animation durations and easing functions matching iOS native animations.
 * All animations should be subtle and system-like, following Apple Human Interface Guidelines.
 * 
 * Validates: Requirements 10.2, 10.3
 */

export const animations = {
  /**
   * Animation duration constants (in milliseconds)
   * All durations are within the 200-300ms range for iOS-native feel
   */
  duration: {
    /** Fast animations (200ms) - for quick transitions and micro-interactions */
    fast: 200,
    /** Normal animations (250ms) - default for most transitions */
    normal: 250,
    /** Slow animations (300ms) - for more deliberate transitions */
    slow: 300,
  },

  /**
   * Easing constants matching iOS animations
   * iOS uses ease-in-out for most system animations
   */
  easing: {
    /** Standard iOS easing curve - smooth acceleration and deceleration */
    standard: 'ease-in-out' as const,
  },
} as const;
