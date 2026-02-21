/**
 * Settings Context
 * 
 * Global state management for app settings using React Context API.
 * Persists settings to AsyncStorage for persistence across app launches.
 * 
 * Validates: Requirements 14.3
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings, mockSettings } from '../data/mockData';

/**
 * Settings Context Interface
 */
interface SettingsContextType {
  /**
   * Current app settings
   */
  settings: AppSettings;
  
  /**
   * Whether settings are loading from storage
   */
  isLoading: boolean;
  
  /**
   * Update a specific setting
   * @param key - Setting key to update
   * @param value - New value for the setting
   */
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => Promise<void>;
  
  /**
   * Update multiple settings at once
   * @param updates - Partial settings object with updates
   */
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>;
  
  /**
   * Reset settings to default values
   */
  resetSettings: () => Promise<void>;
}

/**
 * Settings Context
 */
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

/**
 * AsyncStorage key for settings
 */
const SETTINGS_STORAGE_KEY = '@PayMeProtocol:settings';

/**
 * Settings Provider Props
 */
interface SettingsProviderProps {
  children: ReactNode;
}

/**
 * Settings Provider Component
 * 
 * Provides global settings state and persistence to the app.
 * 
 * @example
 * ```tsx
 * // Wrap your app with SettingsProvider
 * <SettingsProvider>
 *   <App />
 * </SettingsProvider>
 * 
 * // Use settings in any component
 * const { settings, updateSetting } = useSettings();
 * 
 * // Update a setting
 * await updateSetting('biometricsEnabled', true);
 * ```
 */
export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(mockSettings);
  const [isLoading, setIsLoading] = useState(true);
  
  /**
   * Load settings from AsyncStorage on mount
   */
  useEffect(() => {
    loadSettings();
  }, []);
  
  /**
   * Load settings from AsyncStorage
   */
  const loadSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
      
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        setSettings(parsed);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      // Use default settings on error
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Save settings to AsyncStorage
   */
  const saveSettings = async (newSettings: AppSettings) => {
    try {
      await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };
  
  /**
   * Update a specific setting
   */
  const updateSetting = async <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ): Promise<void> => {
    const newSettings = {
      ...settings,
      [key]: value,
    };
    
    setSettings(newSettings);
    await saveSettings(newSettings);
  };
  
  /**
   * Update multiple settings at once
   */
  const updateSettings = async (updates: Partial<AppSettings>): Promise<void> => {
    const newSettings = {
      ...settings,
      ...updates,
    };
    
    setSettings(newSettings);
    await saveSettings(newSettings);
  };
  
  /**
   * Reset settings to default values
   */
  const resetSettings = async (): Promise<void> => {
    setSettings(mockSettings);
    await saveSettings(mockSettings);
  };
  
  const value: SettingsContextType = {
    settings,
    isLoading,
    updateSetting,
    updateSettings,
    resetSettings,
  };
  
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

/**
 * useSettings Hook
 * 
 * Custom hook to access settings context.
 * Must be used within a SettingsProvider.
 * 
 * @returns SettingsContextType
 * @throws Error if used outside SettingsProvider
 * 
 * @example
 * ```tsx
 * const { settings, updateSetting } = useSettings();
 * 
 * // Access settings
 * console.log(settings.biometricsEnabled);
 * 
 * // Update a setting
 * await updateSetting('notificationsEnabled', false);
 * ```
 */
export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  
  return context;
};
