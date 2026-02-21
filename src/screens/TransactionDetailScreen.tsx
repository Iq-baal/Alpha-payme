/**
 * Transaction Detail Screen
 * 
 * Detail screen for viewing transaction information.
 * Displays transaction amount, details, and action buttons.
 * 
 * Features:
 * - Standard navigation bar with back button
 * - Transaction amount (large, centered)
 * - Details section with grouped list
 * - Action buttons at bottom
 * - iOS-native layout
 * 
 * Validates: Requirements 4.2, 15.1, 15.2
 */

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Typography, Button, Section, Card } from '../components/design-system';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import {
  getTransactionById,
  formatCurrency,
  formatDate,
  formatTime,
} from '../data/mockData';

/**
 * Navigation prop type for Transaction Detail screen
 */
type TransactionDetailScreenNavigationProp = NativeStackNavigationProp<
  any,
  'TransactionDetail'
>;

/**
 * Route prop type for Transaction Detail screen
 */
type TransactionDetailScreenRouteProp = RouteProp<
  { TransactionDetail: { transactionId: string } },
  'TransactionDetail'
>;

/**
 * Props for Transaction Detail screen
 */
interface TransactionDetailScreenProps {
  navigation: TransactionDetailScreenNavigationProp;
  route: TransactionDetailScreenRouteProp;
}

/**
 * Transaction Detail Screen Component
 * 
 * Renders detailed information about a specific transaction.
 */
export const TransactionDetailScreen: React.FC<TransactionDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { transactionId } = route.params;
  const transaction = getTransactionById(transactionId);
  
  /**
   * Handle missing transaction
   */
  if (!transaction) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Typography variant="title2" color="secondaryLabel">
            Transaction not found
          </Typography>
          <Button
            variant="primary"
            onPress={() => navigation.goBack()}
            style={styles.errorButton}
          >
            Go Back
          </Button>
        </View>
      </SafeAreaView>
    );
  }
  
  const isReceived = transaction.type === 'received';
  const contactName = isReceived ? transaction.sender : transaction.recipient;
  const amountPrefix = isReceived ? '+' : '-';
  const amountColor = isReceived ? colors.systemBlue : colors.label;
  
  /**
   * Handle share button press
   */
  const handleShare = () => {
    Alert.alert(
      'Share Transaction',
      'Share transaction details with others',
      [{ text: 'OK' }]
    );
  };
  
  /**
   * Handle report issue button press
   */
  const handleReportIssue = () => {
    Alert.alert(
      'Report Issue',
      'Report a problem with this transaction',
      [{ text: 'Cancel', style: 'cancel' }, { text: 'Report', style: 'destructive' }]
    );
  };
  
  /**
   * Get status badge color
   */
  const getStatusColor = () => {
    switch (transaction.status) {
      case 'completed':
        return colors.systemBlue;
      case 'pending':
        return colors.systemGray;
      case 'failed':
        return colors.systemRed;
      default:
        return colors.systemGray;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Transaction Amount */}
        <View style={styles.amountSection}>
          <Typography variant="caption" color="secondaryLabel">
            {isReceived ? 'Received from' : 'Sent to'}
          </Typography>
          <Typography variant="title2" style={styles.contactName}>
            {contactName}
          </Typography>
          <Typography
            variant="largeTitle"
            style={[styles.amount, { color: amountColor }]}
          >
            {amountPrefix}{formatCurrency(transaction.amount, transaction.currency)}
          </Typography>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Typography variant="caption" style={styles.statusText}>
              {transaction.status.toUpperCase()}
            </Typography>
          </View>
        </View>
        
        {/* Transaction Details */}
        <Section title="Details">
          <View style={styles.detailsList}>
            <DetailRow label="Transaction ID" value={transaction.id} />
            <View style={styles.separator} />
            <DetailRow label="Date" value={formatDate(transaction.timestamp)} />
            <View style={styles.separator} />
            <DetailRow label="Time" value={formatTime(transaction.timestamp)} />
            <View style={styles.separator} />
            <DetailRow label="Type" value={transaction.type === 'received' ? 'Received' : 'Sent'} />
            {transaction.description && (
              <>
                <View style={styles.separator} />
                <DetailRow label="Description" value={transaction.description} />
              </>
            )}
          </View>
        </Section>
        
        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <Button
            variant="primary"
            size="large"
            onPress={handleShare}
            accessibilityLabel="Share transaction"
          >
            Share
          </Button>
          <Button
            variant="secondary"
            size="large"
            onPress={handleReportIssue}
            accessibilityLabel="Report an issue"
          >
            Report Issue
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Detail Row Component
 * 
 * Displays a label-value pair in the details list.
 */
interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => {
  return (
    <View style={styles.detailRow}>
      <Typography variant="body" color="secondaryLabel">
        {label}
      </Typography>
      <Typography variant="body" style={styles.detailValue}>
        {value}
      </Typography>
    </View>
  );
};

/**
 * Styles for Transaction Detail screen
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  errorButton: {
    marginTop: spacing.lg,
  },
  amountSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  contactName: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  amount: {
    fontSize: 48,
    fontWeight: '700' as const,
    marginBottom: spacing.md,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.large,
  },
  statusText: {
    color: colors.white,
    fontWeight: '600' as const,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  detailsList: {
    backgroundColor: colors.secondarySystemGroupedBackground,
    borderRadius: borderRadius.medium,
    overflow: 'hidden',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    minHeight: 44,
    backgroundColor: colors.secondarySystemGroupedBackground,
  },
  detailValue: {
    textAlign: 'right',
    flex: 1,
    marginLeft: spacing.md,
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.separator,
    marginLeft: spacing.md,
  },
  actionsSection: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
});
