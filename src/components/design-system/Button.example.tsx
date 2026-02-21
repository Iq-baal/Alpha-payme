/**
 * Button Component Examples
 * 
 * This file demonstrates various usage patterns for the Button component.
 * Use these examples as a reference when implementing buttons in screens.
 */

import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button } from './Button';
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';

/**
 * Button Examples Component
 * 
 * Showcases all button variants, sizes, and states
 */
export const ButtonExamples: React.FC = () => {
  const handlePress = (buttonName: string) => {
    Alert.alert('Button Pressed', `You pressed: ${buttonName}`);
  };

  return (
    <View style={styles.container}>
      {/* Primary Buttons */}
      <View style={styles.section}>
        <Button
          variant="primary"
          size="large"
          onPress={() => handlePress('Primary Large')}
          accessibilityHint="This is a primary call-to-action button"
        >
          Get Started
        </Button>
        
        <Button
          variant="primary"
          size="medium"
          onPress={() => handlePress('Primary Medium')}
        >
          Continue
        </Button>
        
        <Button
          variant="primary"
          size="large"
          onPress={() => handlePress('Disabled Primary')}
          disabled
        >
          Disabled Primary
        </Button>
      </View>

      {/* Destructive Buttons */}
      <View style={styles.section}>
        <Button
          variant="destructive"
          size="large"
          onPress={() => handlePress('Destructive Large')}
          accessibilityHint="This will delete the selected item"
        >
          Delete Account
        </Button>
        
        <Button
          variant="destructive"
          size="medium"
          onPress={() => handlePress('Destructive Medium')}
        >
          Remove
        </Button>
        
        <Button
          variant="destructive"
          size="medium"
          onPress={() => handlePress('Disabled Destructive')}
          disabled
        >
          Disabled Destructive
        </Button>
      </View>

      {/* Secondary Buttons */}
      <View style={styles.section}>
        <Button
          variant="secondary"
          size="large"
          onPress={() => handlePress('Secondary Large')}
        >
          Learn More
        </Button>
        
        <Button
          variant="secondary"
          size="medium"
          onPress={() => handlePress('Secondary Medium')}
        >
          Cancel
        </Button>
        
        <Button
          variant="secondary"
          size="medium"
          onPress={() => handlePress('Disabled Secondary')}
          disabled
        >
          Disabled Secondary
        </Button>
      </View>

      {/* Common Use Cases */}
      <View style={styles.section}>
        {/* CTA Button (bottom of onboarding screen) */}
        <Button
          variant="primary"
          size="large"
          onPress={() => handlePress('CTA')}
          accessibilityLabel="Get started with PayMe"
          accessibilityHint="Begins the account setup process"
        >
          Get Started
        </Button>
        
        {/* Confirmation Button */}
        <Button
          variant="primary"
          size="medium"
          onPress={() => handlePress('Confirm')}
          accessibilityLabel="Confirm payment"
          accessibilityHint="Confirms and processes the payment"
        >
          Confirm Payment
        </Button>
        
        {/* Cancel Button */}
        <Button
          variant="secondary"
          size="medium"
          onPress={() => handlePress('Cancel')}
          accessibilityLabel="Cancel"
          accessibilityHint="Cancels the current action"
        >
          Cancel
        </Button>
        
        {/* Delete Button */}
        <Button
          variant="destructive"
          size="medium"
          onPress={() => handlePress('Delete')}
          accessibilityLabel="Delete transaction"
          accessibilityHint="Permanently deletes this transaction"
        >
          Delete
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.systemGroupedBackground,
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
});
