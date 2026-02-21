/**
 * Platform Verification Tests
 * 
 * Tests to verify that iOS-native design is applied consistently
 * across both iOS and Android platforms.
 * 
 * Validates: Requirements 13.1, 13.2, 13.3, 13.4, 13.5
 */

import { Platform } from 'react-native';
import {
  verifyPlatformStyling,
  isIOS,
  isAndroid,
  getPlatformNotes,
  verifyNoMaterialDesign,
} from './platformVerification';

describe('Platform Verification', () => {
  describe('verifyPlatformStyling', () => {
    it('should return iOS-native as the design language', () => {
      const result = verifyPlatformStyling();
      expect(result.designLanguage).toBe('iOS-native');
    });
    
    it('should confirm iOS styling is applied on Android', () => {
      const result = verifyPlatformStyling();
      expect(result.appliesIOSOnAndroid).toBe(true);
    });
    
    it('should confirm Material Design is not used', () => {
      const result = verifyPlatformStyling();
      expect(result.usesMaterialDesign).toBe(false);
    });
    
    it('should include all requirement validations', () => {
      const result = verifyPlatformStyling();
      expect(result.notes).toHaveLength(5);
      expect(result.notes[0]).toContain('Requirement 13.1');
      expect(result.notes[1]).toContain('Requirement 13.2');
      expect(result.notes[2]).toContain('Requirement 13.3');
      expect(result.notes[3]).toContain('Requirement 13.4');
      expect(result.notes[4]).toContain('Requirement 13.5');
    });
  });
  
  describe('Platform Detection', () => {
    it('should correctly identify iOS platform', () => {
      // Mock Platform.OS
      const originalOS = Platform.OS;
      Object.defineProperty(Platform, 'OS', {
        get: () => 'ios',
        configurable: true,
      });
      
      expect(isIOS()).toBe(true);
      expect(isAndroid()).toBe(false);
      
      // Restore original
      Object.defineProperty(Platform, 'OS', {
        get: () => originalOS,
        configurable: true,
      });
    });
    
    it('should correctly identify Android platform', () => {
      // Mock Platform.OS
      const originalOS = Platform.OS;
      Object.defineProperty(Platform, 'OS', {
        get: () => 'android',
        configurable: true,
      });
      
      expect(isIOS()).toBe(false);
      expect(isAndroid()).toBe(true);
      
      // Restore original
      Object.defineProperty(Platform, 'OS', {
        get: () => originalOS,
        configurable: true,
      });
    });
  });
  
  describe('Platform Notes', () => {
    it('should provide iOS-specific notes when on iOS', () => {
      // Mock Platform.OS
      const originalOS = Platform.OS;
      Object.defineProperty(Platform, 'OS', {
        get: () => 'ios',
        configurable: true,
      });
      
      const notes = getPlatformNotes();
      expect(notes).toContain('Running on iOS - native platform for this design');
      expect(notes.some(note => note.includes('haptics'))).toBe(true);
      
      // Restore original
      Object.defineProperty(Platform, 'OS', {
        get: () => originalOS,
        configurable: true,
      });
    });
    
    it('should provide Android-specific notes when on Android', () => {
      // Mock Platform.OS
      const originalOS = Platform.OS;
      Object.defineProperty(Platform, 'OS', {
        get: () => 'android',
        configurable: true,
      });
      
      const notes = getPlatformNotes();
      expect(notes).toContain('Running on Android with iOS-native design');
      expect(notes.some(note => note.includes('Material Design components are NOT used'))).toBe(true);
      
      // Restore original
      Object.defineProperty(Platform, 'OS', {
        get: () => originalOS,
        configurable: true,
      });
    });
  });
  
  describe('Material Design Verification', () => {
    it('should verify no Material Design is used', () => {
      const result = verifyNoMaterialDesign();
      expect(result).toBe(true);
    });
  });
});
