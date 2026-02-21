/**
 * Dashboard Screen
 * 
 * Main screen of the PayMe Protocol application.
 * Displays user balance, recent transactions, and quick actions.
 * 
 * Features:
 * - Large title "Dashboard" that collapses on scroll
 * - Balance card with Apple Wallet-style summary
 * - Grouped sections for Recent Activity and Quick Actions
 * - Tappable transaction rows with chevrons
 * - iOS Settings-style layout
 * 
 * Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5, 15.1, 15.2
 */

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography, Card, Section } from '../components/design-system';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import {
  mockUser,
  getRecentTransactions,
  formatCurrency,
  formatDate,
  Transaction,
} from '../data/mockData';
import { useHaptics } from '../hooks/useHaptics';

/**
 * Navigation prop type for Dashboard screen
 */
type DashboardScreenNavigationProp = NativeStackNavigationProp<any, 'Dashboard'>;

/**
 * Props for Dashboard screen
 */
interface DashboardScreenProps {
  navigation: DashboardScreenNavigationProp;
}

/**
 * Dashboard Screen Component
 * 
 * Renders the main dashboard with balance, transactions, and quick actions.
 */
export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const haptics = useHaptics();
  const recentTransactions = getRecentTransactions(5);
  
  /**
   * Handle logout
   */
  const handleLogout = async () => {
    await haptics.medium();
    navigation.replace('Login');
  };
  
  /**
   * Handle transaction row press
   * Navigates to transaction detail screen with light haptic feedback
   * 
   * Validates: Requirements 8.2, 11.1
   */
  const handleTransactionPress = async (transaction: Transaction) => {
    await haptics.light();
    navigation.navigate('TransactionDetail', { transactionId: transaction.id });
  };
  
  /**
   * Handle quick action press
   */
  const handleQuickAction = async (action: string) => {
    await haptics.light();
    console.log('Quick action:', action);
    // In a real app, this would navigate to the appropriate screen
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Card - Apple Wallet Style */}
        <View style={styles.balanceSection}>
          <Card style={styles.balanceCard}>
            <View style={styles.balanceContent}>
              <Typography variant="caption" color="secondaryLabel">
                Total Balance
              </Typography>
              <Typography variant="largeTitle" style={styles.balanceAmount}>
                {formatCurrency(mockUser.balance, mockUser.currency)}
              </Typography>
              <Typography variant="caption" color="tertiaryLabel">
                {mockUser.name}
              </Typography>
            </View>
          </Card>
        </View>
        
        {/* Recent Activity Section */}
        <Section title="Recent Activity">
          <View style={styles.transactionList}>
            {recentTransactions.map((transaction, index) => (
              <React.Fragment key={transaction.id}>
                {index > 0 && <View style={styles.separator} />}
                <TransactionRow
                  transaction={transaction}
                  onPress={() => handleTransactionPress(transaction)}
                />
              </React.Fragment>
            ))}
          </View>
        </Section>
        
        {/* Quick Actions Section */}
        <Section title="Quick Actions">
          <View style={styles.actionList}>
            <ActionRow
              title="Send Money"
              icon="↑"
              onPress={() => handleQuickAction('send')}
            />
            <View style={styles.separator} />
            <ActionRow
              title="Request Money"
              icon="↓"
              onPress={() => handleQuickAction('request')}
            />
            <View style={styles.separator} />
            <ActionRow
              title="Settings"
              icon="⚙"
              onPress={() => navigation.navigate('Settings')}
            />
          </View>
        </Section>
        
        {/* Account Section */}
        <Section title="Account">
          <View style={styles.actionList}>
            <ActionRow
              title="Log Out"
              icon="👋"
              onPress={handleLogout}
            />
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Transaction Row Component
 * 
 * Displays a single transaction in the list.
 */
interface TransactionRowProps {
  transaction: Transaction;
  onPress: () => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, onPress }) => {
  const isReceived = transaction.type === 'received';
  const contactName = isReceived ? transaction.sender : transaction.recipient;
  const amountPrefix = isReceived ? '+' : '-';
  const amountColor = isReceived ? colors.systemBlue : colors.label;
  
  return (
    <TouchableOpacity
      style={styles.transactionRow}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Transaction: ${amountPrefix}${formatCurrency(transaction.amount)} ${isReceived ? 'from' : 'to'} ${contactName}`}
      accessibilityHint="Opens transaction details"
    >
      <View style={styles.transactionLeft}>
        <View style={styles.transactionIcon}>
          <Typography variant="body">{isReceived ? '↓' : '↑'}</Typography>
        </View>
        <View style={styles.transactionInfo}>
          <Typography variant="body">{contactName}</Typography>
          <Typography variant="caption" color="secondaryLabel">
            {formatDate(transaction.timestamp)}
          </Typography>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Typography variant="body" style={{ color: amountColor }}>
          {amountPrefix}{formatCurrency(transaction.amount)}
        </Typography>
        <Typography variant="body" color="tertiaryLabel">
          ›
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Action Row Component
 * 
 * Displays a quick action button.
 */
interface ActionRowProps {
  title: string;
  icon: string;
  onPress: () => void;
}

const ActionRow: React.FC<ActionRowProps> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.actionRow}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={styles.actionLeft}>
        <View style={styles.actionIcon}>
          <Typography variant="body">{icon}</Typography>
        </View>
        <Typography variant="body">{title}</Typography>
      </View>
      <Typography variant="body" color="tertiaryLabel">
        ›
      </Typography>
    </TouchableOpacity>
  );
};

/**
 * Styles for Dashboard screen
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
  balanceSection: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  balanceCard: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  balanceContent: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  balanceAmount: {
    // Using largeTitle with larger size for emphasis
    fontSize: 40,
    fontWeight: '700' as const,
  },
  transactionList: {
    backgroundColor: colors.secondarySystemGroupedBackground,
    borderRadius: borderRadius.medium,
    overflow: 'hidden',
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    minHeight: 60,
    backgroundColor: colors.secondarySystemGroupedBackground,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.circle,
    backgroundColor: colors.systemGroupedBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionList: {
    backgroundColor: colors.secondarySystemGroupedBackground,
    borderRadius: borderRadius.medium,
    overflow: 'hidden',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    minHeight: 44,
    backgroundColor: colors.secondarySystemGroupedBackground,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.circle,
    backgroundColor: colors.systemGroupedBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.separator,
    marginLeft: spacing.md + 40 + spacing.sm, // Align with text
  },
});
