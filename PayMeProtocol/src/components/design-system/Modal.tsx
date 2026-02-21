/**
 * Modal Component
 * 
 * iOS-native modal component that matches Apple's system alert dialogs.
 * Used for confirmation prompts, alerts, and important user decisions.
 * 
 * Features:
 * - Centered rounded rectangle layout
 * - Light blur background overlay
 * - Bold title text and regular body text
 * - Stacked buttons with divider lines
 * - Medium haptic feedback on primary action
 * - Matches iOS system alert appearance pixel-perfectly
 * 
 * Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 11.2
 */

import React from 'react';
import {
  Modal as RNModal,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Typography } from './Typography';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

/**
 * Action button configuration
 */
export interface ModalAction {
  /**
   * Button label text
   */
  label: string;
  
  /**
   * Button press handler
   */
  onPress: () => void;
  
  /**
   * Whether this is a destructive action
   * Destructive actions are styled in red
   * @default false
   */
  isDestructive?: boolean;
}

/**
 * Props for the Modal component
 */
export interface ModalProps {
  /**
   * Whether the modal is visible
   */
  visible: boolean;
  
  /**
   * Modal title (bold text)
   */
  title: string;
  
  /**
   * Modal message (regular text)
   */
  message: string;
  
  /**
   * Primary action button
   * Displayed at the bottom of the button stack
   */
  primaryAction: ModalAction;
  
  /**
   * Optional secondary action button
   * Displayed above the primary action
   */
  secondaryAction?: ModalAction;
  
  /**
   * Optional callback when modal is dismissed by tapping outside
   */
  onDismiss?: () => void;
}

/**
 * Modal Component
 * 
 * Renders an iOS-native system alert dialog with proper styling,
 * haptic feedback, and accessibility support.
 * 
 * @example
 * ```tsx
 * // Confirmation dialog
 * <Modal
 *   visible={showModal}
 *   title="Delete Transaction"
 *   message="Are you sure you want to delete this transaction? This action cannot be undone."
 *   primaryAction={{
 *     label: "Delete",
 *     onPress: handleDelete,
 *     isDestructive: true,
 *   }}
 *   secondaryAction={{
 *     label: "Cancel",
 *     onPress: handleCancel,
 *   }}
 * />
 * 
 * // Simple alert
 * <Modal
 *   visible={showAlert}
 *   title="Success"
 *   message="Your transaction has been completed successfully."
 *   primaryAction={{
 *     label: "OK",
 *     onPress: handleOK,
 *   }}
 * />
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  message,
  primaryAction,
  secondaryAction,
  onDismiss,
}) => {
  /**
   * Handle primary action press with medium haptic feedback
   * Requirement 11.2: Confirmation actions trigger medium haptic feedback
   * Attempts haptic feedback on all platforms (Requirement 13.2)
   */
  const handlePrimaryPress = async () => {
    // Trigger medium haptic feedback
    // On Android, this will gracefully do nothing if not supported
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      // Haptic feedback not available on this device
    }
    primaryAction.onPress();
  };
  
  /**
   * Handle secondary action press
   */
  const handleSecondaryPress = () => {
    secondaryAction?.onPress();
  };
  
  /**
   * Handle backdrop press (dismiss)
   */
  const handleBackdropPress = () => {
    if (onDismiss) {
      onDismiss();
    }
  };
  
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      {/* Blur Background Overlay */}
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={handleBackdropPress}
      >
        <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark">
          {/* Modal Container */}
          <View style={styles.modalContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.alertBox}>
                {/* Title */}
                <View style={styles.titleContainer}>
                  <Typography
                    variant="title2"
                    style={styles.title}
                    numberOfLines={2}
                  >
                    {title}
                  </Typography>
                </View>
                
                {/* Message */}
                <View style={styles.messageContainer}>
                  <Typography
                    variant="caption"
                    color="secondaryLabel"
                    style={styles.message}
                  >
                    {message}
                  </Typography>
                </View>
                
                {/* Buttons */}
                <View style={styles.buttonsContainer}>
                  {/* Secondary Action (if provided) */}
                  {secondaryAction && (
                    <>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handleSecondaryPress}
                        accessibilityRole="button"
                        accessibilityLabel={secondaryAction.label}
                      >
                        <Typography
                          variant="body"
                          style={[
                            styles.buttonText,
                            secondaryAction.isDestructive && styles.destructiveText,
                          ]}
                        >
                          {secondaryAction.label}
                        </Typography>
                      </TouchableOpacity>
                      
                      {/* Divider */}
                      <View style={styles.divider} />
                    </>
                  )}
                  
                  {/* Primary Action */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handlePrimaryPress}
                    accessibilityRole="button"
                    accessibilityLabel={primaryAction.label}
                  >
                    <Typography
                      variant="body"
                      style={[
                        styles.buttonText,
                        styles.primaryText,
                        primaryAction.isDestructive && styles.destructiveText,
                      ]}
                    >
                      {primaryAction.label}
                    </Typography>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </BlurView>
      </TouchableOpacity>
    </RNModal>
  );
};

/**
 * Styles for Modal component
 */
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  alertBox: {
    // Centered rounded rectangle (Requirement 5.2)
    width: Dimensions.get('window').width - (spacing.xl * 2),
    maxWidth: 270, // iOS system alert max width
    backgroundColor: colors.secondarySystemGroupedBackground,
    borderRadius: 14, // iOS system alert border radius
    overflow: 'hidden',
    
    // Subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  titleContainer: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  title: {
    // Bold title text (Requirement 5.4)
    fontWeight: '600',
    textAlign: 'center',
  },
  messageContainer: {
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  message: {
    // Regular body text (Requirement 5.4)
    textAlign: 'center',
    lineHeight: 18,
  },
  buttonsContainer: {
    // Stacked buttons with dividers (Requirement 5.5)
    borderTopWidth: 0.5,
    borderTopColor: colors.separator,
  },
  button: {
    // Minimum 44pt touch target
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  divider: {
    // Divider line between buttons (Requirement 5.5)
    height: 0.5,
    backgroundColor: colors.separator,
  },
  buttonText: {
    fontSize: 17,
    color: colors.systemBlue,
  },
  primaryText: {
    fontWeight: '600',
  },
  destructiveText: {
    color: colors.systemRed,
  },
});
