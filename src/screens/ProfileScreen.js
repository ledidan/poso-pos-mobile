// screens/ProfileScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { signOut = () => {} } = useAuth() || {};
  const handleLogout = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin người dùng</Text>
      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, marginBottom: 20, fontWeight: "bold" },
});
