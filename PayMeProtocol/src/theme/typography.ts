/**
 * Typography System
 * 
 * Defines the typography scale matching iOS system standards.
 * Uses San Francisco font family (SF Pro Display for large text, SF Pro Text for body text).
 * 
 * Typography Variants:
 * - largeTitle: 34pt bold - Used for large navigation titles
 * - title2: 22pt semibold - Used for section headings
 * - body: 17pt regular - Used for body text and standard content
 * - caption: 13pt regular - Used for secondary/supporting text
 * 
 * Validates Requirements: 1.1, 1.2, 1.3, 1.4, 1.5
 */

export interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: '400' | '600' | '700';
  lineHeight: number;
}

export interface Typography {
  largeTitle: TypographyStyle;
  title2: TypographyStyle;
  body: TypographyStyle;
  caption: TypographyStyle;
}

/**
 * iOS Typography Scale
 * Matches native iOS text styles with San Francisco font family
 */
export const typography: Typography = {
  /**
   * Large Title - 34pt Bold
   * Used for large navigation titles that collapse on scroll
   * Font: SF Pro Display
   */
  largeTitle: {
    fontFamily: 'SF Pro Display',
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 41,
  },
  
  /**
   * Title 2 - 22pt Semibold
   * Used for section headings and prominent labels
   * Font: SF Pro Display
   */
  title2: {
    fontFamily: 'SF Pro Display',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
  },
  
  /**
   * Body - 17pt Regular
   * Used for body text and standard content
   * Font: SF Pro Text
   */
  body: {
    fontFamily: 'SF Pro Text',
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
  },
  
  /**
   * Caption - 13pt Regular
   * Used for secondary text, captions, and supporting information
   * Font: SF Pro Text
   */
  caption: {
    fontFamily: 'SF Pro Text',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
};
