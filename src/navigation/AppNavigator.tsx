import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screen imports
import { DashboardScreen } from '../screens/DashboardScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { TransactionDetailScreen } from '../screens/TransactionDetailScreen';

// Define navigation types
export type RootStackParamList = {
  Dashboard: undefined;
  Onboarding: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  Settings: undefined;
  TransactionDetail: { transactionId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * iOS-native navigation configuration
 * Matches Apple Human Interface Guidelines with:
 * - Large titles that collapse on scroll
 * - System material blur effect
 * - Standard iOS slide transitions (200-300ms)
 * - Native back button with chevron and label
 */
/**
 * iOS-native navigation configuration
 * Applied to BOTH iOS and Android platforms to maintain consistent iOS design
 * Requirement 13.2: iOS styling applied on Android
 */
const navigationOptions = {
  headerLargeTitle: true,
  headerTransparent: false,
  headerBlurEffect: 'systemMaterial' as const,
  headerLargeTitleStyle: {
    // Use iOS font on all platforms (Requirement 13.2)
    fontFamily: 'SF Pro Display',
    fontSize: 34,
    fontWeight: '700' as const,
  },
  headerTitleStyle: {
    // Use iOS font on all platforms (Requirement 13.2)
    fontFamily: 'SF Pro Display',
    fontSize: 17,
    fontWeight: '600' as const,
  },
  headerBackTitle: 'Back',
  animation: 'slide_from_right' as const,
  animationDuration: 250,
  // iOS-native gesture handling on all platforms
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
};

const AppNavigator: React.FC = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  
  /**
   * Check if this is the first app launch
   * If yes, show onboarding screen
   * If no, show dashboard directly
   */
  useEffect(() => {
    checkFirstLaunch();
  }, []);
  
  const checkFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        // First launch
        setIsFirstLaunch(true);
        await AsyncStorage.setItem('hasLaunched', 'true');
      } else {
        // Not first launch
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.error('Error checking first launch:', error);
      setIsFirstLaunch(false);
    }
  };
  
  // Show loading state while checking first launch
  if (isFirstLaunch === null) {
    return null;
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={navigationOptions}
        initialRouteName="Welcome"
      >
        {/* Welcome Screen - first screen */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        
        {/* Onboarding Screen - shown only on first launch */}
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{
            headerShown: false, // No header for onboarding
          }}
        />
        
        {/* Auth Screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false, // No header for login
          }}
        />
        
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerShown: false, // No header for sign up
          }}
        />
        
        {/* Dashboard Screen - main app screen */}
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: 'Dashboard',
            headerLargeTitle: true,
          }}
        />
        
        {/* Settings Screen */}
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            headerLargeTitle: true,
          }}
        />
        
        {/* Transaction Detail Screen */}
        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetailScreen}
          options={{
            title: 'Transaction',
            headerLargeTitle: false, // Standard header for detail screens
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Temporary placeholder component until screens are implemented
const PlaceholderScreen: React.FC = () => {
  const { View, Text, StyleSheet } = require('react-native');
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen placeholder</Text>
      <Text style={styles.subtext}>This screen will be implemented in later tasks</Text>
    </View>
  );
};

const styles = require('react-native').StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7', // iOS system grouped background
    padding: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 17,
    color: '#3C3C43',
    textAlign: 'center',
  },
});

export default AppNavigator;
