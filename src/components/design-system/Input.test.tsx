/**
 * Input Component Tests
 * 
 * Unit tests for the Input component to verify:
 * - Rendering with different props
 * - Keyboard type handling
 * - Secure text entry
 * - Accessibility support
 * - Focus and blur behavior
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from './Input';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      const { getByDisplayValue } = render(
        <Input value="Test value" onChangeText={() => {}} />
      );
      
      expect(getByDisplayValue('Test value')).toBeTruthy();
    });
    
    it('should render with placeholder', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} placeholder="Enter text" />
      );
      
      expect(getByPlaceholderText('Enter text')).toBeTruthy();
    });
    
    it('should render empty input', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      expect(input).toBeTruthy();
      expect(input.props.value).toBe('');
    });
  });
  
  describe('Keyboard Types', () => {
    it('should use default keyboard type by default', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      expect(input.props.keyboardType).toBe('default');
    });
    
    it('should use numeric keyboard when keyboardType is numeric', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} keyboardType="numeric" placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      expect(input.props.keyboardType).toBe('number-pad');
    });
    
    it('should use email keyboard when keyboardType is email-address', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} keyboardType="email-address" placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      expect(input.props.keyboardType).toBe('email-address');
    });
  });
  
  describe('Secure Text Entry', () => {
    it('should not obscure text by default', () => {
      const { getByDisplayValue } = render(
        <Input value="password123" onChangeText={() => {}} />
      );
      
      const input = getByDisplayValue('password123');
      expect(input.props.secureTextEntry).toBe(false);
    });
    
    it('should obscure text when secureTextEntry is true', () => {
      const { getByDisplayValue } = render(
        <Input value="password123" onChangeText={() => {}} secureTextEntry />
      );
      
      const input = getByDisplayValue('password123');
      expect(input.props.secureTextEntry).toBe(true);
    });
  });
  
  describe('Text Changes', () => {
    it('should call onChangeText when text changes', () => {
      const onChangeText = jest.fn();
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={onChangeText} placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      fireEvent.changeText(input, 'New text');
      
      expect(onChangeText).toHaveBeenCalledWith('New text');
    });
    
    it('should update value when controlled', () => {
      const { getByPlaceholderText, rerender } = render(
        <Input value="Initial" onChangeText={() => {}} placeholder="Test" />
      );
      
      let input = getByPlaceholderText('Test');
      expect(input.props.value).toBe('Initial');
      
      rerender(<Input value="Updated" onChangeText={() => {}} placeholder="Test" />);
      
      input = getByPlaceholderText('Test');
      expect(input.props.value).toBe('Updated');
    });
  });
  
  describe('Focus and Blur', () => {
    it('should call onFocus when input is focused', () => {
      const onFocus = jest.fn();
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} onFocus={onFocus} placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      fireEvent(input, 'focus');
      
      expect(onFocus).toHaveBeenCalled();
    });
    
    it('should call onBlur when input loses focus', () => {
      const onBlur = jest.fn();
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} onBlur={onBlur} placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      fireEvent(input, 'blur');
      
      expect(onBlur).toHaveBeenCalled();
    });
  });
  
  describe('Disabled State', () => {
    it('should be editable by default', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      expect(input.props.editable).toBe(true);
    });
    
    it('should not be editable when disabled', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} disabled placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      expect(input.props.editable).toBe(false);
    });
  });
  
  describe('Accessibility', () => {
    it('should use placeholder as accessibility label when not provided', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} placeholder="Enter name" />
      );
      
      const input = getByPlaceholderText('Enter name');
      expect(input.props.accessibilityLabel).toBe('Enter name');
    });
    
    it('should use custom accessibility label when provided', () => {
      const { getByPlaceholderText } = render(
        <Input 
          value="" 
          onChangeText={() => {}} 
          placeholder="Enter name"
          accessibilityLabel="Name input field"
        />
      );
      
      const input = getByPlaceholderText('Enter name');
      expect(input.props.accessibilityLabel).toBe('Name input field');
    });
    
    it('should have accessibility hint when provided', () => {
      const { getByPlaceholderText } = render(
        <Input 
          value="" 
          onChangeText={() => {}} 
          accessibilityHint="Enter your full name"
          placeholder="Test"
        />
      );
      
      const input = getByPlaceholderText('Test');
      expect(input.props.accessibilityHint).toBe('Enter your full name');
    });
    
    it('should indicate disabled state in accessibility state', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} disabled placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      expect(input.props.accessibilityState).toEqual({ disabled: true });
    });
    
    it('should support font scaling by default', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      expect(input.props.allowFontScaling).toBe(true);
    });
    
    it('should disable font scaling when allowFontScaling is false', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} allowFontScaling={false} placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      expect(input.props.allowFontScaling).toBe(false);
    });
  });
  
  describe('Additional Props', () => {
    it('should support maxLength', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} maxLength={10} placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      expect(input.props.maxLength).toBe(10);
    });
    
    it('should support autoFocus', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} autoFocus placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      expect(input.props.autoFocus).toBe(true);
    });
  });
  
  describe('Email Input Behavior', () => {
    it('should disable auto-capitalize for email inputs', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} keyboardType="email-address" placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      expect(input.props.autoCapitalize).toBe('none');
    });
    
    it('should disable auto-correct for email inputs', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} keyboardType="email-address" placeholder="Test" />
      );
      
      const input = getByPlaceholderText('Test');
      expect(input.props.autoCorrect).toBe(false);
    });
  });
});
