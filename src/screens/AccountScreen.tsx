/**
 * Account Screen (Venmo-style)
 * 
 * User's personal account view with balance and transaction history.
 * Venmo-inspired design with iOS styling.
 * 
 * Features:
 * - Large balance display
 * - Quick action buttons (Pay, Request, Transfer)
 * - Personal transaction history
 * - User profile section
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
import { Typography, Button } from '../components/design-system';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import {
  mockUser,
  mockTransactions,
  formatCurrency,
  getRelativeTime,
  Transaction,
} from '../data/mockData';
import { useHaptics } from '../hooks/useHaptics';

type AccountScreenNavigationProp = NativeStackNavigationProp<any, 'Account'>;

interface AccountScreenProps {
  navigation: AccountScreenNavigationProp;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const haptics = useHaptics();

  const handleAction = async (action: string) => {
    await haptics.light();
    console.log('Action:', action);
  };

  const handleTransactionPress = async (transaction: Transaction) => {
    await haptics.light();
    navigation.navigate('TransactionDetail', { transactionId: transaction.id });
  };

  const handleLogout = async () => {
    await haptics.medium();
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileSection}>
          <View style={styles.avatarLarge}>
            <Typography variant="largeTitle" style={styles.avatarText}>
              {mockUser.avatar}
            </Typography>
          </View>
          <Typography variant="title2" style={styles.profileName}>
            {mockUser.name}
          </Typography>
          <Typography variant="body" color="secondaryLabel">
            {mockUser.username}
          </Typography>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Typography variant="caption" color="secondaryLabel" style={styles.balanceLabel}>
            PayMe Balance
          </Typography>
          <Typography variant="largeTitle" style={styles.balanceAmount}>
            {formatCurrency(mockUser.balance, mockUser.currency)}
          </Typography>
          <TouchableOpacity
            style={styles.transferButton}
            onPress={() => handleAction('transfer')}
          >
            <Typography variant="body" style={styles.transferText}>
              Transfer to Bank
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <ActionButton
            icon="↑"
            label="Pay"
            color={colors.systemBlue}
            onPress={() => handleAction('pay')}
          />
          <ActionButton
            icon="↓"
            label="Request"
            color={colors.systemBlue}
            onPress={() => handleAction('request')}
          />
          <ActionButton
            icon="⚙️"
            label="Settings"
            color={colors.systemGray}
            onPress={() => navigation.navigate('Settings')}
          />
        </View>

        {/* Transaction History */}
        <View style={styles.historySection}>
          <Typography variant="title2" style={styles.sectionTitle}>
            Recent Activity
          </Typography>
          <View style={styles.transactionList}>
            {mockTransactions.map((transaction, index) => (
              <React.Fragment key={transaction.id}>
                {index > 0 && <View style={styles.separator} />}
                <TransactionRow
                  transaction={transaction}
                  onPress={() => handleTransactionPress(transaction)}
                />
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <Button
            variant="destructive"
            size="large"
            onPress={handleLogout}
          >
            Log Out
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Action Button Component
 */
interface ActionButtonProps {
  icon: string;
  label: string;
  color: string;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, color, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <Typography variant="title2" style={styles.actionIconText}>
          {icon}
        </Typography>
      </View>
      <Typography variant="caption" color="secondaryLabel" style={styles.actionLabel}>
        {label}
      </Typography>
    </TouchableOpacity>
  );
};

/**
 * Transaction Row Component
 */
interface TransactionRowProps {
  transaction: Transaction;
  onPress: () => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, onPress }) => {
  const isReceived = transaction.type === 'received';
  const contactName = isReceived ? transaction.sender : transaction.recipient;
  const contactAvatar = isReceived ? transaction.senderAvatar : transaction.recipientAvatar;
  const amountPrefix = isReceived ? '+' : '-';
  const amountColor = isReceived ? '#00C853' : colors.label;

  return (
    <TouchableOpacity
      style={styles.transactionRow}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={styles.transactionLeft}>
        <View style={styles.transactionAvatar}>
          <Typography variant="body">{contactAvatar}</Typography>
        </View>
        <View style={styles.transactionInfo}>
          <Typography variant="body" style={styles.transactionName}>
            {contactName}
          </Typography>
          <Typography variant="caption" color="secondaryLabel">
            {transaction.description}
          </Typography>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Typography variant="body" style={{ color: amountColor, fontWeight: '600' }}>
          {amountPrefix}{formatCurrency(transaction.amount)}
        </Typography>
        <Typography variant="caption" color="tertiaryLabel">
          {getRelativeTime(transaction.timestamp)}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

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
  profileSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.secondarySystemGroupedBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: {
    fontSize: 40,
  },
  profileName: {
    marginBottom: spacing.xs,
  },
  balanceCard: {
    backgroundColor: colors.systemBlue,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.large,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: colors.systemBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.xs,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 44,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  transferButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.medium,
  },
  transferText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  actionButton: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  actionLabel: {
    marginTop: spacing.xs,
  },
  historySection: {
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
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
    backgroundColor: colors.secondarySystemGroupedBackground,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.systemGroupedBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.separator,
    marginLeft: spacing.md + 44 + spacing.sm,
  },
  logoutSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.xl,
  },
});
