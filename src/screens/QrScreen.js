import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function QrScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Thanh toán QR</Text>
        <TouchableOpacity style={styles.qrButton}>
          <Text style={styles.qrButtonText}>Mã QR</Text>
          <Ionicons name="qr-code-outline" size={18} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Filter box */}
      <View style={styles.filterBox}>
        <Text style={styles.filterText}>Tháng này</Text>
        <View style={{ flex: 1 }} />
        <Text style={styles.totalText}>0</Text>
        <Text style={styles.transactionText}>0 giao dịch</Text>
      </View>

      {/* Nội dung */}
      <View style={styles.content}>
        <Text style={styles.noDataText}>Chưa có giao dịch</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Bạn chưa liên kết tài khoản ngân hàng
        </Text>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Liên kết</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    header: {
      paddingTop: 80,
      paddingHorizontal: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    qrButton: {
      flexDirection: "row",
      backgroundColor: "#F2F3F5",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      alignItems: "center",
    },
    qrButtonText: {
      color: "#007AFF",
      fontWeight: "600",
      marginRight: 4,
    },
    filterBox: {
      margin: 16,
      backgroundColor: "#E5F1FF",
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
    },
    filterText: {
      fontSize: 16,
      fontWeight: "500",
    },
    totalText: {
      fontSize: 18,
      fontWeight: "bold",
      marginRight: 8,
    },
    transactionText: {
      fontSize: 12,
      color: "#888",
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#EAF5FF",
    },
    noDataText: {
      fontSize: 16,
      color: "#888",
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: "#eee",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    footerText: {
      fontSize: 14,
      color: "#555",
    },
    linkButton: {
      backgroundColor: "#007AFF",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    linkText: {
      color: "#fff",
      fontWeight: "600",
    },
  });
  