import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const UpgradeDialog = ({ visible, onClose, onUpgrade, onContact }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      //   onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.dialogContainer}>
          <Ionicons
            name="diamond-outline"
            size={50}
            color="#007AFF"
            style={styles.icon}
          />

          <Text style={styles.title}>Nâng Cấp Để Sử Dụng Thêm</Text>

          <Text style={styles.message}>
            Bạn đã hết lượt sử dụng cho tính năng này. Vui lòng nâng cấp gói để
            trải nghiệm không giới hạn và nhiều quyền lợi khác!
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.contactButton]}
              onPress={onContact}
            >
              <Text style={styles.contactButtonText}>Liên hệ CSKH</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.upgradeButton]}
              onPress={onUpgrade}
            >
              <Text style={styles.upgradeButtonText}>Nâng cấp ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  contactButton: {
    backgroundColor: "#E5E7EB",
    marginRight: 8,
  },
  contactButtonText: {
    color: "#1F2937",
    fontSize: 16,
    fontWeight: "600",
  },
  upgradeButton: {
    backgroundColor: "#007AFF",
    marginLeft: 8,
  },
  upgradeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    top: 60,
    right: 140,
    zIndex: 9999,
    padding: 10,
  },
});

export default UpgradeDialog;
