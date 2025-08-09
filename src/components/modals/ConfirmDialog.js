import React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, Text, Button } from 'react-native-paper';

const ConfirmDialog = ({
  isVisible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Đồng ý",
  cancelText = "Hủy",
}) => {

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={onClose}
        style={styles.dialog}
      >
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={styles.message}>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={onClose}
            textColor="black"
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            {cancelText}
          </Button>
          <Button
            onPress={handleConfirm}
            mode="contained"
            style={[styles.button, styles.confirmButton]}
            labelStyle={styles.buttonLabel}
          >
            {confirmText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    color: '#000000',
  },
  message: {
    fontSize: 16,
    color: '#333333',
  },
  button: {
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '500',
  }
});

export default ConfirmDialog;
