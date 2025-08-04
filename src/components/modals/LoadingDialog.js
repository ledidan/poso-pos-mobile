import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Overlay } from '@rneui/themed';

const LoadingDialog = ({ isVisible }) => {
  return (
    <Overlay 
      isVisible={isVisible} 
      overlayStyle={styles.overlay}
      backdropStyle={styles.backdrop}
    >
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        {/* <Text style={styles.text}>{text}</Text> */}
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    width: 'auto',
    maxWidth: '80%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default LoadingDialog;