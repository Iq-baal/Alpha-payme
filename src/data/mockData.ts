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
   * Optional avatar URL
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
   * Sender name (for received transactions)
   */
  sender?: string;
  
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
  balance: 1234.56,
  currency: 'USD',
};

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
    timestamp: new Date('2024-01-15T10:30:00'),
    status: 'completed',
    description: 'Coffee payment',
  },
  {
    id: '2',
    type: 'sent',
    amount: 125.00,
    currency: 'USD',
    recipient: 'Bob Johnson',
    timestamp: new Date('2024-01-14T15:45:00'),
    status: 'completed',
    description: 'Dinner split',
  },
  {
    id: '3',
    type: 'received',
    amount: 200.00,
    currency: 'USD',
    sender: 'Alice Williams',
    timestamp: new Date('2024-01-13T09:15:00'),
    status: 'completed',
    description: 'Rent contribution',
  },
  {
    id: '4',
    type: 'sent',
    amount: 35.50,
    currency: 'USD',
    recipient: 'Charlie Brown',
    timestamp: new Date('2024-01-12T18:20:00'),
    status: 'completed',
    description: 'Movie tickets',
  },
  {
    id: '5',
    type: 'received',
    amount: 75.00,
    currency: 'USD',
    sender: 'David Lee',
    timestamp: new Date('2024-01-11T12:00:00'),
    status: 'completed',
    description: 'Freelance work',
  },
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
