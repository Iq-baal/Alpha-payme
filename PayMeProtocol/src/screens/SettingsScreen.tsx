/**
 * Settings Screen
 * 
 * Settings screen for the PayMe Protocol application.
 * Displays user preferences and app configuration options.
 * 
 * Features:
 * - Large title "Settings"
 * - Grouped sections matching iOS Settings
 * - Tappable rows with labels and chevrons
 * - Toggle switches for preferences
 * - iOS Settings-style layout
 * 
 * Validates: Requirements 8.1, 15.1, 15.2, 16.3
 */

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography, Section } from '../components/design-system';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { AppSettings } from '../data/mockData';
import { useHaptics } from '../hooks/useHaptics';
import { useSettings } from '../context/SettingsContext';

/**
 * Navigation prop type for Settings screen
 */
type SettingsScreenNavigationProp = NativeStackNavigationProp<any, 'Settings'>;

/**
 * Props for Settings screen
 */
interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
}

/**
 * Settings Screen Component
 * 
 * Renders the settings screen with user preferences.
 */
export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const haptics = useHaptics();
  const { settings, updateSetting } = useSettings();
  
  /**
   * Handle toggle switch change
   */
  const handleToggle = async (key: keyof AppSettings) => {
    await haptics.light();
    await updateSetting(key, !settings[key]);
  };
  
  /**
   * Handle navigation row press
   */
  const handleNavigation = async (screen: string) => {
    await haptics.light();
    console.log('Navigate to:', screen);
    // In a real app, this would navigate to the appropriate screen
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Section */}
        <Section title="Account">
          <View style={styles.settingsList}>
            <SettingsRow
              title="Profile"
              onPress={() => handleNavigation('Profile')}
              showChevron
            />
            <View style={styles.separator} />
            <SettingsRow
              title="Payment Methods"
              onPress={() => handleNavigation('PaymentMethods')}
              showChevron
            />
            <View style={styles.separator} />
            <SettingsRow
              title="Transaction History"
              onPress={() => handleNavigation('TransactionHistory')}
              showChevron
            />
          </View>
        </Section>
        
        {/* Security Section */}
        <Section 
          title="Security"
          footer="Enable biometric authentication for faster and more secure access to your account"
        >
          <View style={styles.settingsList}>
            <SettingsRow
              title="Face ID / Touch ID"
              rightElement={
                <Switch
                  value={settings.biometricsEnabled}
                  onValueChange={() => handleToggle('biometricsEnabled')}
                  trackColor={{ false: colors.systemGray, true: colors.systemBlue }}
                  thumbColor={colors.white}
                  accessibilityLabel="Toggle biometric authentication"
                />
              }
            />
            <View style={styles.separator} />
            <SettingsRow
              title="Change PIN"
              onPress={() => handleNavigation('ChangePin')}
              showChevron
            />
          </View>
        </Section>
        
        {/* Notifications Section */}
        <Section 
          title="Notifications"
          footer="Receive notifications for transactions, security alerts, and account updates"
        >
          <View style={styles.settingsList}>
            <SettingsRow
              title="Push Notifications"
              rightElement={
                <Switch
                  value={settings.notificationsEnabled}
                  onValueChange={() => handleToggle('notificationsEnabled')}
                  trackColor={{ false: colors.systemGray, true: colors.systemBlue }}
                  thumbColor={colors.white}
                  accessibilityLabel="Toggle push notifications"
                />
              }
            />
            <View style={styles.separator} />
            <SettingsRow
              title="Email Notifications"
              onPress={() => handleNavigation('EmailNotifications')}
              showChevron
            />
          </View>
        </Section>
        
        {/* Preferences Section */}
        <Section title="Preferences">
          <View style={styles.settingsList}>
            <SettingsRow
              title="Haptic Feedback"
              rightElement={
                <Switch
                  value={settings.hapticFeedbackEnabled}
                  onValueChange={() => handleToggle('hapticFeedbackEnabled')}
                  trackColor={{ false: colors.systemGray, true: colors.systemBlue }}
                  thumbColor={colors.white}
                  accessibilityLabel="Toggle haptic feedback"
                />
              }
            />
            <View style={styles.separator} />
            <SettingsRow
              title="Language"
              value="English"
              onPress={() => handleNavigation('Language')}
              showChevron
            />
            <View style={styles.separator} />
            <SettingsRow
              title="Currency"
              value="USD"
              onPress={() => handleNavigation('Currency')}
              showChevron
            />
          </View>
        </Section>
        
        {/* About Section */}
        <Section title="About">
          <View style={styles.settingsList}>
            <SettingsRow
              title="Terms of Service"
              onPress={() => handleNavigation('Terms')}
              showChevron
            />
            <View style={styles.separator} />
            <SettingsRow
              title="Privacy Policy"
              onPress={() => handleNavigation('Privacy')}
              showChevron
            />
            <View style={styles.separator} />
            <SettingsRow
              title="Version"
              value="1.0.0"
            />
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Settings Row Component
 * 
 * Displays a single settings row.
 */
interface SettingsRowProps {
  title: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
  rightElement?: React.ReactNode;
}

const SettingsRow: React.FC<SettingsRowProps> = ({
  title,
  value,
  onPress,
  showChevron = false,
  rightElement,
}) => {
  const content = (
    <View style={styles.settingsRow}>
      <Typography variant="body">{title}</Typography>
      <View style={styles.settingsRight}>
        {value && (
          <Typography variant="body" color="secondaryLabel" style={styles.value}>
            {value}
          </Typography>
        )}
        {rightElement}
        {showChevron && (
          <Typography variant="body" color="tertiaryLabel">
            ›
          </Typography>
        )}
      </View>
    </View>
  );
  
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        {content}
      </TouchableOpacity>
    );
  }
  
  return content;
};

/**
 * Styles for Settings screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.systemGroupedBackground,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  settingsList: {
    backgroundColor: colors.secondarySystemGroupedBackground,
    borderRadius: borderRadius.medium,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    minHeight: 44,
    backgroundColor: colors.secondarySystemGroupedBackground,
  },
  settingsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  value: {
    marginRight: spacing.xs,
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.separator,
    marginLeft: spacing.md,
  },
});
