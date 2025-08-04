import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Dialog } from '@rneui/themed';

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
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationType="fade"
      style={styles.dialog}
      overlayStyle={{ borderRadius: 5, padding: 20 }}
    >
      <Dialog.Title titleStyle={styles.title} title={title} />
      <Text style={styles.message}>{message}</Text>
      <Dialog.Actions>
        <View style={styles.actions}>
          <Dialog.Button title={cancelText} onPress={onClose} buttonStyle={styles.cancelButton} titleStyle={styles.cancelText} />
          <Dialog.Button title={confirmText} titleStyle={styles.confirmText} onPress={handleConfirm} buttonStyle={styles.confirmButton} />
        </View>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialog: {
    width: "100%",
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20
  },
  title: {
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#eee',
    color: 'black',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5
  },
  confirmText: {
    color: 'white',
    fontSize: 17,
  },
  cancelText: {
    color: 'black',
    fontSize: 17,
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },

});

export default ConfirmDialog;