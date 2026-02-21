/**
 * Mock Data
 * 
 * Hardcoded demo data for the PayMe Protocol application.
 * This data allows the app to function as a standalone demo without backend dependencies.
 * 
 * Validates: Requirements 14.3, 14.4
 */

/**
 * User Profile Interface
 * 
 * Represents a user account in the PayMe Protocol application.
 */
export interface UserProfile {
  /**
   * Unique user identifier
   */
  id: string;
  
  /**
   * User's full name
   */
  name: string;
  
  /**
   * User's email address
   */
  email: string;
  
  /**
   * Optional avatar URL or emoji
   */
  avatar?: string;
  
  /**
   * Current account balance
   */
  balance: number;
  
  /**
   * Currency code (e.g., 'USD', 'EUR')
   */
  currency: string;
  
  /**
   * Username for social features
   */
  username?: string;
}

/**
 * Transaction Type
 */
export type TransactionType = 'sent' | 'received';

/**
 * Transaction Status
 */
export type TransactionStatus = 'completed' | 'pending' | 'failed';

/**
 * Social Feed Item Interface
 * 
 * Represents a public transaction in the social feed (Venmo-style)
 */
export interface FeedItem {
  /**
   * Unique feed item identifier
   */
  id: string;
  
  /**
   * User who made the payment
   */
  fromUser: {
    name: string;
    avatar: string;
    username: string;
  };
  
  /**
   * User who received the payment
   */
  toUser: {
    name: string;
    avatar: string;
    username: string;
  };
  
  /**
   * Transaction amount (hidden for privacy)
   */
  amount?: number;
  
  /**
   * Transaction note/description
   */
  note: string;
  
  /**
   * Timestamp
   */
  timestamp: Date;
  
  /**
   * Number of likes
   */
  likes: number;
  
  /**
   * Whether current user liked this
   */
  isLiked: boolean;
  
  /**
   * Number of comments
   */
  comments: number;
}

/**
 * Transaction Interface
 * 
 * Represents a payment transaction in the PayMe Protocol application.
 */
export interface Transaction {
  /**
   * Unique transaction identifier
   */
  id: string;
  
  /**
   * Transaction type (sent or received)
   */
  type: TransactionType;
  
  /**
   * Transaction amount
   */
  amount: number;
  
  /**
   * Currency code
   */
  currency: string;
  
  /**
   * Recipient name (for sent transactions)
   */
  recipient?: string;
  
  /**
   * Recipient avatar
   */
  recipientAvatar?: string;
  
  /**
   * Sender name (for received transactions)
   */
  sender?: string;
  
  /**
   * Sender avatar
   */
  senderAvatar?: string;
  
  /**
   * Transaction timestamp
   */
  timestamp: Date;
  
  /**
   * Transaction status
   */
  status: TransactionStatus;
  
  /**
   * Optional transaction description
   */
  description?: string;
}

/**
 * App Settings Interface
 * 
 * Represents user preferences and app configuration.
 */
export interface AppSettings {
  /**
   * Whether biometric authentication is enabled
   */
  biometricsEnabled: boolean;
  
  /**
   * Whether push notifications are enabled
   */
  notificationsEnabled: boolean;
  
  /**
   * Whether haptic feedback is enabled
   */
  hapticFeedbackEnabled: boolean;
  
  /**
   * App theme preference
   */
  theme: 'light' | 'dark' | 'auto';
}

/**
 * Mock User Profile
 * 
 * Sample user data for demo purposes.
 */
export const mockUser: UserProfile = {
  id: '1',
  name: 'John Appleseed',
  email: 'john.appleseed@example.com',
  username: '@john',
  avatar: '👤',
  balance: 1234.56,
  currency: 'USD',
};

/**
 * Mock Social Feed
 * 
 * Sample social feed items (Venmo-style public transactions)
 */
export const mockFeed: FeedItem[] = [
  {
    id: 'f1',
    fromUser: { name: 'Sarah Chen', avatar: '👩', username: '@sarah' },
    toUser: { name: 'Mike Ross', avatar: '👨', username: '@mike' },
    note: '🍕 Pizza night!',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
    likes: 12,
    isLiked: false,
    comments: 3,
  },
  {
    id: 'f2',
    fromUser: { name: 'Alex Kim', avatar: '🧑', username: '@alex' },
    toUser: { name: 'Emma Davis', avatar: '👩‍🦰', username: '@emma' },
    note: '☕ Coffee run',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 min ago
    likes: 8,
    isLiked: true,
    comments: 1,
  },
  {
    id: 'f3',
    fromUser: { name: 'David Lee', avatar: '👨‍💼', username: '@david' },
    toUser: { name: 'Lisa Wang', avatar: '👩‍💻', username: '@lisa' },
    note: '🎬 Movie tickets',
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    likes: 24,
    isLiked: false,
    comments: 5,
  },
  {
    id: 'f4',
    fromUser: { name: 'Rachel Green', avatar: '👱‍♀️', username: '@rachel' },
    toUser: { name: 'Ross Geller', avatar: '👨‍🏫', username: '@ross' },
    note: '🍜 Dinner split',
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    likes: 15,
    isLiked: true,
    comments: 2,
  },
  {
    id: 'f5',
    fromUser: { name: 'Tom Hardy', avatar: '🧔', username: '@tom' },
    toUser: { name: 'Anna Bell', avatar: '👩‍🎨', username: '@anna' },
    note: '🎸 Concert tickets',
    timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    likes: 31,
    isLiked: false,
    comments: 7,
  },
  {
    id: 'f6',
    fromUser: { name: 'Chris Evans', avatar: '🦸', username: '@chris' },
    toUser: { name: 'Scarlett Jo', avatar: '👩‍🦱', username: '@scarlett' },
    note: '🏋️ Gym membership',
    timestamp: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
    likes: 19,
    isLiked: false,
    comments: 4,
  },
];

/**
 * Mock Transactions
 * 
 * Sample transaction history for demo purposes.
 */
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'received',
    amount: 50.00,
    currency: 'USD',
    sender: 'Jane Smith',
    senderAvatar: '👩‍💼',
    timestamp: new Date('2024-01-15T10:30:00'),
    status: 'completed',
    description: '☕ Coffee payment',
  },
  {
    id: '2',
    type: 'sent',
    amount: 125.00,
    currency: 'USD',
    recipient: 'Bob Johnson',
    recipientAvatar: '👨‍🍳',
    timestamp: new Date('2024-01-14T15:45:00'),
    status: 'completed',
    description: '🍽️ Dinner split',
  },
  {
    id: '3',
    type: 'received',
    amount: 200.00,
    currency: 'USD',
    sender: 'Alice Williams',
    senderAvatar: '👩‍🎓',
    timestamp: new Date('2024-01-13T09:15:00'),
    status: 'completed',
    description: '🏠 Rent contribution',
  },
  {
    id: '4',
    type: 'sent',
    amount: 35.50,
    currency: 'USD',
    recipient: 'Charlie Brown',
    recipientAvatar: '👦',
    timestamp: new Date('2024-01-12T18:20:00'),
    status: 'completed',
    description: '🎬 Movie tickets',
  },
  {
    id: '5',
    type: 'received',
    amount: 75.00,
    currency: 'USD',
    sender: 'David Lee',
    senderAvatar: '👨‍💻',
    timestamp: new Date('2024-01-11T12:00:00'),
    status: 'completed',
    description: '💼 Freelance work',
  },
];
  {
    id: '6',
    type: 'sent',
    amount: 100.00,
    currency: 'USD',
    recipient: 'Emma Davis',
    timestamp: new Date('2024-01-10T14:30:00'),
    status: 'completed',
    description: 'Birthday gift',
  },
  {
    id: '7',
    type: 'received',
    amount: 45.00,
    currency: 'USD',
    sender: 'Frank Miller',
    timestamp: new Date('2024-01-09T11:45:00'),
    status: 'completed',
    description: 'Lunch reimbursement',
  },
  {
    id: '8',
    type: 'sent',
    amount: 60.00,
    currency: 'USD',
    recipient: 'Grace Wilson',
    timestamp: new Date('2024-01-08T16:00:00'),
    status: 'completed',
    description: 'Grocery split',
  },
  {
    id: '9',
    type: 'received',
    amount: 150.00,
    currency: 'USD',
    sender: 'Henry Taylor',
    timestamp: new Date('2024-01-07T10:00:00'),
    status: 'pending',
    description: 'Consulting fee',
  },
  {
    id: '10',
    type: 'sent',
    amount: 25.00,
    currency: 'USD',
    recipient: 'Ivy Anderson',
    timestamp: new Date('2024-01-06T13:30:00'),
    status: 'completed',
    description: 'Coffee meetup',
  },
  {
    id: '11',
    type: 'received',
    amount: 300.00,
    currency: 'USD',
    sender: 'Jack Thomas',
    timestamp: new Date('2024-01-05T09:00:00'),
    status: 'completed',
    description: 'Project payment',
  },
  {
    id: '12',
    type: 'sent',
    amount: 80.00,
    currency: 'USD',
    recipient: 'Kate Martinez',
    timestamp: new Date('2024-01-04T17:15:00'),
    status: 'completed',
    description: 'Concert tickets',
  },
  {
    id: '13',
    type: 'received',
    amount: 55.00,
    currency: 'USD',
    sender: 'Liam Garcia',
    timestamp: new Date('2024-01-03T11:00:00'),
    status: 'completed',
    description: 'Gas money',
  },
  {
    id: '14',
    type: 'sent',
    amount: 40.00,
    currency: 'USD',
    recipient: 'Mia Rodriguez',
    timestamp: new Date('2024-01-02T14:45:00'),
    status: 'failed',
    description: 'Subscription payment',
  },
  {
    id: '15',
    type: 'received',
    amount: 90.00,
    currency: 'USD',
    sender: 'Noah Hernandez',
    timestamp: new Date('2024-01-01T10:30:00'),
    status: 'completed',
    description: 'New Year gift',
  },
];

/**
 * Mock App Settings
 * 
 * Default app settings for demo purposes.
 */
export const mockSettings: AppSettings = {
  biometricsEnabled: true,
  notificationsEnabled: true,
  hapticFeedbackEnabled: true,
  theme: 'auto',
};

/**
 * Helper function to get a transaction by ID
 * 
 * @param id - Transaction ID
 * @returns Transaction or undefined if not found
 */
export const getTransactionById = (id: string): Transaction | undefined => {
  return mockTransactions.find(transaction => transaction.id === id);
};

/**
 * Helper function to get recent transactions
 * 
 * @param limit - Maximum number of transactions to return
 * @returns Array of recent transactions
 */
export const getRecentTransactions = (limit: number = 5): Transaction[] => {
  return mockTransactions.slice(0, limit);
};

/**
 * Helper function to format currency
 * 
 * @param amount - Amount to format
 * @param currency - Currency code
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Helper function to format date
 * 
 * @param date - Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * Helper function to format time
 * 
 * @param date - Date to format
 * @returns Formatted time string
 */
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

/**
 * Helper function to get relative time string (Venmo-style)
 * 
 * @param date - Date to format
 * @returns Relative time string (e.g., "2m ago", "3h ago")
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return formatDate(date);
};
