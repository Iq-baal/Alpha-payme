/**
 * Input Component Examples
 * 
 * Demonstrates various use cases of the Input component
 * with different configurations and keyboard types.
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input } from './Input';
import { Typography } from './Typography';
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';

/**
 * Input Examples Component
 * 
 * Shows different Input component configurations:
 * - Default text input
 * - Email input
 * - Password input
 * - Numeric input
 * - Disabled input
 */
export const InputExamples: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Typography variant="title2" style={styles.sectionTitle}>
          Input Component Examples
        </Typography>
        
        {/* Default Text Input */}
        <View style={styles.example}>
          <Typography variant="caption" color="secondaryLabel" style={styles.label}>
            Default Text Input
          </Typography>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            accessibilityLabel="Name input"
            accessibilityHint="Enter your full name"
          />
        </View>
        
        {/* Email Input */}
        <View style={styles.example}>
          <Typography variant="caption" color="secondaryLabel" style={styles.label}>
            Email Input
          </Typography>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="email@example.com"
            keyboardType="email-address"
            accessibilityLabel="Email input"
            accessibilityHint="Enter your email address"
          />
        </View>
        
        {/* Password Input */}
        <View style={styles.example}>
          <Typography variant="caption" color="secondaryLabel" style={styles.label}>
            Password Input
          </Typography>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            accessibilityLabel="Password input"
            accessibilityHint="Enter your password"
          />
        </View>
        
        {/* Numeric Input */}
        <View style={styles.example}>
          <Typography variant="caption" color="secondaryLabel" style={styles.label}>
            Numeric Input
          </Typography>
          <Input
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="numeric"
            accessibilityLabel="Amount input"
            accessibilityHint="Enter the amount"
          />
        </View>
        
        {/* Phone Number Input */}
        <View style={styles.example}>
          <Typography variant="caption" color="secondaryLabel" style={styles.label}>
            Phone Number Input
          </Typography>
          <Input
            value={phone}
            onChangeText={setPhone}
            placeholder="(555) 123-4567"
            keyboardType="numeric"
            accessibilityLabel="Phone number input"
            accessibilityHint="Enter your phone number"
            maxLength={14}
          />
        </View>
        
        {/* Disabled Input */}
        <View style={styles.example}>
          <Typography variant="caption" color="secondaryLabel" style={styles.label}>
            Disabled Input
          </Typography>
          <Input
            value="This input is disabled"
            onChangeText={() => {}}
            disabled
            accessibilityLabel="Disabled input"
          />
        </View>
        
        {/* Input with Max Length */}
        <View style={styles.example}>
          <Typography variant="caption" color="secondaryLabel" style={styles.label}>
            Input with Max Length (10 characters)
          </Typography>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Max 10 chars"
            maxLength={10}
            accessibilityLabel="Limited input"
          />
        </View>
      </View>
      
      {/* Form Example */}
      <View style={styles.section}>
        <Typography variant="title2" style={styles.sectionTitle}>
          Form Example
        </Typography>
        
        <View style={styles.form}>
          <View style={styles.formField}>
            <Typography variant="body" style={styles.formLabel}>
              Full Name
            </Typography>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="John Appleseed"
              accessibilityLabel="Full name"
            />
          </View>
          
          <View style={styles.formField}>
            <Typography variant="body" style={styles.formLabel}>
              Email Address
            </Typography>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="john@example.com"
              keyboardType="email-address"
              accessibilityLabel="Email address"
            />
          </View>
          
          <View style={styles.formField}>
            <Typography variant="body" style={styles.formLabel}>
              Password
            </Typography>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry
              accessibilityLabel="Password"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.systemGroupedBackground,
  },
  section: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.lg,
  },
  example: {
    marginBottom: spacing.xl,
  },
  label: {
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  form: {
    backgroundColor: colors.secondarySystemGroupedBackground,
    borderRadius: 10,
    padding: spacing.md,
  },
  formField: {
    marginBottom: spacing.lg,
  },
  formLabel: {
    marginBottom: spacing.sm,
  },
});
