/**
 * Home Screen (Venmo-style Social Feed)
 * 
 * Main feed showing public transactions from friends and network.
 * Venmo-inspired design with iOS styling.
 * 
 * Features:
 * - Social feed with transaction cards
 * - Like and comment interactions
 * - User avatars and usernames
 * - Relative timestamps
 * - Pull to refresh
 * - Floating action button for new payment
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '../components/design-system';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { mockFeed, FeedItem, getRelativeTime } from '../data/mockData';
import { useHaptics } from '../hooks/useHaptics';

type HomeScreenNavigationProp = NativeStackNavigationProp<any, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [feed, setFeed] = useState(mockFeed);
  const [refreshing, setRefreshing] = useState(false);
  const haptics = useHaptics();

  const onRefresh = async () => {
    setRefreshing(true);
    await haptics.light();
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleLike = async (itemId: string) => {
    await haptics.light();
    setFeed(feed.map(item => 
      item.id === itemId 
        ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
        : item
    ));
  };

  const handleNewPayment = async () => {
    await haptics.medium();
    // Navigate to payment screen
    console.log('New payment');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Typography variant="largeTitle">Feed</Typography>
        </View>

        {/* Feed Items */}
        {feed.map((item) => (
          <FeedCard
            key={item.id}
            item={item}
            onLike={() => handleLike(item.id)}
          />
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleNewPayment}
        accessibilityLabel="New payment"
        accessibilityRole="button"
      >
        <Typography variant="title2" style={styles.fabIcon}>
          +
        </Typography>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

/**
 * Feed Card Component
 */
interface FeedCardProps {
  item: FeedItem;
  onLike: () => void;
}

const FeedCard: React.FC<FeedCardProps> = ({ item, onLike }) => {
  return (
    <View style={styles.card}>
      {/* User Info */}
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Typography variant="title2">{item.fromUser.avatar}</Typography>
          </View>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userRow}>
            <Typography variant="body" style={styles.userName}>
              {item.fromUser.name}
            </Typography>
            <Typography variant="body" color="secondaryLabel">
              {' paid '}
            </Typography>
            <Typography variant="body" style={styles.userName}>
              {item.toUser.name}
            </Typography>
          </View>
          <Typography variant="caption" color="tertiaryLabel">
            {getRelativeTime(item.timestamp)}
          </Typography>
        </View>
      </View>

      {/* Transaction Note */}
      <View style={styles.cardContent}>
        <Typography variant="body">{item.note}</Typography>
      </View>

      {/* Actions */}
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onLike}
          accessibilityRole="button"
          accessibilityLabel={item.isLiked ? 'Unlike' : 'Like'}
        >
          <Typography variant="body" style={item.isLiked ? styles.liked : styles.actionText}>
            {item.isLiked ? '❤️' : '🤍'} {item.likes}
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          accessibilityRole="button"
          accessibilityLabel="Comments"
        >
          <Typography variant="body" style={styles.actionText}>
            💬 {item.comments}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.secondarySystemGroupedBackground,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  avatarContainer: {
    marginRight: spacing.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.systemGroupedBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 2,
  },
  userName: {
    fontWeight: '600',
  },
  cardContent: {
    marginBottom: spacing.sm,
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.lg,
    paddingTop: spacing.xs,
    borderTopWidth: 0.5,
    borderTopColor: colors.separator,
  },
  actionButton: {
    paddingVertical: spacing.xs,
  },
  actionText: {
    color: colors.secondaryLabel,
  },
  liked: {
    color: colors.systemRed,
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.systemBlue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.systemBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 32,
  },
});
