// file: ChangePasswordPopup.js

import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable, // Dùng để tạo background có thể nhấn để tắt
  Keyboard,
} from "react-native";

const ChangePasswordPopup = ({
  visible,
  onClose,
  onSubmit,
  newPassword,
  confirmPassword,
  setNewPassword,
  setConfirmPassword,
}) => {
  const [error, setError] = useState("");
  // Reset state mỗi khi popup được mở lại
  useEffect(() => {
    if (visible) {
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    }
  }, [visible]);

  const handleConfirm = () => {
    // 1. Xóa lỗi cũ
    setError("");

    // 2. Kiểm tra (Validation)
    if (!newPassword || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    // 3. Nếu mọi thứ hợp lệ
    onSubmit(newPassword);
  };

  return (
    <Modal
      animationType="fade" // Hiệu ứng xuất hiện
      transparent={true} // Nền trong suốt
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Lớp nền mờ, có thể nhấn để tắt popup */}
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      >
        {/* Container chính của popup, nhấn vào đây sẽ không bị tắt */}
        <Pressable style={styles.popupContainer}>
          <Text style={styles.title}>Đổi mật khẩu</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mật khẩu mới</Text>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu mới"
              secureTextEntry // Che giấu mật khẩu
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Xác nhận mật khẩu mới</Text>
            <TextInput
              style={styles.input}
              placeholder="Xác nhận mật khẩu mới"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#999"
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Xác nhận</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F0F0F0",
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    marginLeft: 10,
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default ChangePasswordPopup;
