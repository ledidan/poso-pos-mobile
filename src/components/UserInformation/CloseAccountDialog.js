// file: CloseAccountDialog.js

import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

const CloseAccountDialog = ({ visible, onClose, hotlineNumber }) => {
  const handleCallHotline = async () => {
    const phoneNumber = `tel:${hotlineNumber}`;

    try {
      const supported = await Linking.canOpenURL(phoneNumber);
      if (supported) {
        await Linking.openURL(phoneNumber);
        // Sau khi gọi, có thể bạn muốn đóng dialog
        onClose();
      } else {
        Alert.alert("Lỗi", `Không thể thực hiện cuộc gọi đến số ${hotlineNumber}`);
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể mở ứng dụng gọi điện.");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.dialogContainer}>
          <Ionicons
            name="warning-outline"
            size={50}
            color="#FFC107" // Màu vàng cảnh báo
            style={styles.icon}
          />

          <Text style={styles.title}>Bạn chắc chắn muốn xoá tài khoản?</Text>

          <Text style={styles.message}>
            Hành động này không thể hoàn tác. Toàn bộ dữ liệu của bạn, bao gồm
            thông tin cá nhân và lịch sử giao dịch sẽ bị xoá vĩnh viễn.
          </Text>
          
          <Text style={styles.actionPrompt}>
            Để tiếp tục, vui lòng liên hệ tổng đài viên của chúng tôi để được hỗ trợ.
          </Text>

          {/* Hàng chứa các nút bấm */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={onClose}
            >
              <Text style={styles.secondaryButtonText}>Bỏ qua</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleCallHotline}
            >
              <Text style={styles.primaryButtonText}>Gọi tổng đài</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dialogContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#1C1C1E",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#6E6E73",
    marginBottom: 20,
    lineHeight: 24,
  },
  actionPrompt: {
      fontSize: 16,
      textAlign: 'center',
      color: '#333',
      marginBottom: 25,
      fontWeight: '500'
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButton: {
    backgroundColor: "#EFEFF4",
    marginRight: 8,
  },
  secondaryButtonText: {
    color: "#1C1C1E",
    fontWeight: "600",
    fontSize: 17,
  },
  primaryButton: {
    backgroundColor: "#D9534F", // Màu đỏ thể hiện hành động nguy hiểm
    marginLeft: 8,
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default CloseAccountDialog;