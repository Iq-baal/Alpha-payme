/**
 * Button Component Tests
 * 
 * Unit tests for the Button component to verify:
 * - Correct rendering of all variants
 * - Correct rendering of all sizes
 * - Haptic feedback on press
 * - Accessibility props
 * - Disabled state
 * - Minimum touch target size
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';
import * as Haptics from 'expo-haptics';

// Mock expo-haptics
jest.mock('expo-haptics');

describe('Button Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with default props', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button onPress={onPress}>Click Me</Button>
      );
      
      expect(getByText('Click Me')).toBeTruthy();
    });

    it('should render primary variant', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button variant="primary" onPress={onPress}>
          Primary Button
        </Button>
      );
      
      expect(getByText('Primary Button')).toBeTruthy();
    });

    it('should render destructive variant', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button variant="destructive" onPress={onPress}>
          Delete
        </Button>
      );
      
      expect(getByText('Delete')).toBeTruthy();
    });

    it('should render secondary variant', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button variant="secondary" onPress={onPress}>
          Cancel
        </Button>
      );
      
      expect(getByText('Cancel')).toBeTruthy();
    });

    it('should render large size', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button size="large" onPress={onPress}>
          Large Button
        </Button>
      );
      
      expect(getByText('Large Button')).toBeTruthy();
    });

    it('should render medium size', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button size="medium" onPress={onPress}>
          Medium Button
        </Button>
      );
      
      expect(getByText('Medium Button')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('should call onPress when pressed', async () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button onPress={onPress}>Press Me</Button>
      );
      
      fireEvent.press(getByText('Press Me'));
      
      // Wait for async haptic feedback to complete
      await new Promise(resolve => setTimeout(resolve, 0));
      
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should trigger light haptic feedback on press', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button onPress={onPress}>Press Me</Button>
      );
      
      fireEvent.press(getByText('Press Me'));
      expect(Haptics.impactAsync).toHaveBeenCalledWith(
        Haptics.ImpactFeedbackStyle.Light
      );
    });

    it('should not call onPress when disabled', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button onPress={onPress} disabled>
          Disabled Button
        </Button>
      );
      
      fireEvent.press(getByText('Disabled Button'));
      expect(onPress).not.toHaveBeenCalled();
    });

    it('should not trigger haptic feedback when disabled', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button onPress={onPress} disabled>
          Disabled Button
        </Button>
      );
      
      fireEvent.press(getByText('Disabled Button'));
      expect(Haptics.impactAsync).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have button accessibility role by default', () => {
      const onPress = jest.fn();
      const { getByRole } = render(
        <Button onPress={onPress}>Accessible Button</Button>
      );
      
      expect(getByRole('button')).toBeTruthy();
    });

    it('should use children as accessibility label by default', () => {
      const onPress = jest.fn();
      const { getByLabelText } = render(
        <Button onPress={onPress}>Click Me</Button>
      );
      
      expect(getByLabelText('Click Me')).toBeTruthy();
    });

    it('should use custom accessibility label when provided', () => {
      const onPress = jest.fn();
      const { getByLabelText } = render(
        <Button onPress={onPress} accessibilityLabel="Custom Label">
          Click Me
        </Button>
      );
      
      expect(getByLabelText('Custom Label')).toBeTruthy();
    });

    it('should have accessibility hint when provided', () => {
      const onPress = jest.fn();
      const { getByA11yHint } = render(
        <Button 
          onPress={onPress} 
          accessibilityHint="This will delete the item"
        >
          Delete
        </Button>
      );
      
      expect(getByA11yHint('This will delete the item')).toBeTruthy();
    });

    it('should have disabled accessibility state when disabled', () => {
      const onPress = jest.fn();
      const { getByRole } = render(
        <Button onPress={onPress} disabled>
          Disabled Button
        </Button>
      );
      
      const button = getByRole('button');
      expect(button.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe('Styling', () => {
    it('should have minimum 44pt height for medium size', () => {
      const onPress = jest.fn();
      const { getByRole } = render(
        <Button size="medium" onPress={onPress}>
          Medium Button
        </Button>
      );
      
      const button = getByRole('button');
      const style = button.props.style;
      
      // Check that minHeight is 44
      expect(style.minHeight).toBe(44);
      // Check that height is 44 for medium size
      expect(style.height).toBe(44);
    });

    it('should have minimum 44pt width', () => {
      const onPress = jest.fn();
      const { getByRole } = render(
        <Button onPress={onPress}>Button</Button>
      );
      
      const button = getByRole('button');
      const style = button.props.style;
      
      // Check that minWidth is 44
      expect(style.minWidth).toBe(44);
    });
  });
});
