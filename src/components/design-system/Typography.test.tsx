/**
 * Typography Component Tests
 * 
 * Unit tests for the Typography component to verify:
 * - Correct rendering of all variants
 * - Correct color application
 * - Accessibility props
 * - Dynamic Type support
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { Typography } from './Typography';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

describe('Typography Component', () => {
  // Helper function to flatten style arrays
  const flattenStyle = (style: any) => {
    if (Array.isArray(style)) {
      return Object.assign({}, ...style);
    }
    return style;
  };

  describe('Variant Rendering', () => {
    it('should render largeTitle variant with correct styles', () => {
      const { getByText } = render(
        <Typography variant="largeTitle">Large Title</Typography>
      );
      
      const element = getByText('Large Title');
      expect(element).toBeTruthy();
      const style = flattenStyle(element.props.style);
      expect(style).toMatchObject({
        fontFamily: typography.largeTitle.fontFamily,
        fontSize: typography.largeTitle.fontSize,
        fontWeight: typography.largeTitle.fontWeight,
        lineHeight: typography.largeTitle.lineHeight,
      });
    });

    it('should render title2 variant with correct styles', () => {
      const { getByText } = render(
        <Typography variant="title2">Title 2</Typography>
      );
      
      const element = getByText('Title 2');
      expect(element).toBeTruthy();
      const style = flattenStyle(element.props.style);
      expect(style).toMatchObject({
        fontFamily: typography.title2.fontFamily,
        fontSize: typography.title2.fontSize,
        fontWeight: typography.title2.fontWeight,
        lineHeight: typography.title2.lineHeight,
      });
    });

    it('should render body variant with correct styles', () => {
      const { getByText } = render(
        <Typography variant="body">Body Text</Typography>
      );
      
      const element = getByText('Body Text');
      expect(element).toBeTruthy();
      const style = flattenStyle(element.props.style);
      expect(style).toMatchObject({
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
        fontWeight: typography.body.fontWeight,
        lineHeight: typography.body.lineHeight,
      });
    });

    it('should render caption variant with correct styles', () => {
      const { getByText } = render(
        <Typography variant="caption">Caption Text</Typography>
      );
      
      const element = getByText('Caption Text');
      expect(element).toBeTruthy();
      const style = flattenStyle(element.props.style);
      expect(style).toMatchObject({
        fontFamily: typography.caption.fontFamily,
        fontSize: typography.caption.fontSize,
        fontWeight: typography.caption.fontWeight,
        lineHeight: typography.caption.lineHeight,
      });
    });

    it('should default to body variant when no variant specified', () => {
      const { getByText } = render(
        <Typography>Default Text</Typography>
      );
      
      const element = getByText('Default Text');
      const style = flattenStyle(element.props.style);
      expect(style).toMatchObject({
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
      });
    });
  });

  describe('Color Variants', () => {
    it('should apply label color (primary text)', () => {
      const { getByText } = render(
        <Typography color="label">Primary Text</Typography>
      );
      
      const element = getByText('Primary Text');
      const style = flattenStyle(element.props.style);
      expect(style).toMatchObject({
        color: colors.label,
      });
    });

    it('should apply secondaryLabel color', () => {
      const { getByText } = render(
        <Typography color="secondaryLabel">Secondary Text</Typography>
      );
      
      const element = getByText('Secondary Text');
      const style = flattenStyle(element.props.style);
      expect(style).toMatchObject({
        color: colors.secondaryLabel,
      });
    });

    it('should apply tertiaryLabel color', () => {
      const { getByText } = render(
        <Typography color="tertiaryLabel">Tertiary Text</Typography>
      );
      
      const element = getByText('Tertiary Text');
      const style = flattenStyle(element.props.style);
      expect(style).toMatchObject({
        color: colors.tertiaryLabel,
      });
    });

    it('should default to label color when no color specified', () => {
      const { getByText } = render(
        <Typography>Default Color</Typography>
      );
      
      const element = getByText('Default Color');
      const style = flattenStyle(element.props.style);
      expect(style).toMatchObject({
        color: colors.label,
      });
    });
  });

  describe('Accessibility', () => {
    it('should have default accessibilityRole of text', () => {
      const { getByText } = render(
        <Typography>Accessible Text</Typography>
      );
      
      const element = getByText('Accessible Text');
      expect(element.props.accessibilityRole).toBe('text');
    });

    it('should accept custom accessibilityLabel', () => {
      const { getByLabelText } = render(
        <Typography accessibilityLabel="Custom Label">Text</Typography>
      );
      
      const element = getByLabelText('Custom Label');
      expect(element).toBeTruthy();
    });

    it('should accept custom accessibilityRole', () => {
      const { getByText } = render(
        <Typography accessibilityRole="header">Header Text</Typography>
      );
      
      const element = getByText('Header Text');
      expect(element.props.accessibilityRole).toBe('header');
    });

    it('should enable font scaling by default', () => {
      const { getByText } = render(
        <Typography>Scalable Text</Typography>
      );
      
      const element = getByText('Scalable Text');
      expect(element.props.allowFontScaling).toBe(true);
    });

    it('should allow disabling font scaling', () => {
      const { getByText } = render(
        <Typography allowFontScaling={false}>Fixed Text</Typography>
      );
      
      const element = getByText('Fixed Text');
      expect(element.props.allowFontScaling).toBe(false);
    });

    it('should accept maxFontSizeMultiplier for Dynamic Type', () => {
      const { getByText } = render(
        <Typography maxFontSizeMultiplier={2.0}>Limited Scale</Typography>
      );
      
      const element = getByText('Limited Scale');
      expect(element.props.maxFontSizeMultiplier).toBe(2.0);
    });
  });

  describe('Text Truncation', () => {
    it('should accept numberOfLines prop', () => {
      const { getByText } = render(
        <Typography numberOfLines={2}>
          This is a long text that should be truncated after two lines
        </Typography>
      );
      
      const element = getByText(/This is a long text/);
      expect(element.props.numberOfLines).toBe(2);
    });
  });

  describe('Combined Props', () => {
    it('should handle multiple props together', () => {
      const { getByLabelText } = render(
        <Typography
          variant="title2"
          color="secondaryLabel"
          numberOfLines={1}
          accessibilityLabel="Section Title"
          accessibilityRole="header"
        >
          Section
        </Typography>
      );
      
      const element = getByLabelText('Section Title');
      expect(element).toBeTruthy();
      const style = flattenStyle(element.props.style);
      expect(style).toMatchObject({
        fontFamily: typography.title2.fontFamily,
        fontSize: typography.title2.fontSize,
        color: colors.secondaryLabel,
      });
      expect(element.props.numberOfLines).toBe(1);
      expect(element.props.accessibilityRole).toBe('header');
    });
  });
});

