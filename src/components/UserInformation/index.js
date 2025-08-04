import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const InfoRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const UserInformation = () => {
  const navigation = useNavigation();
  // Dữ liệu mẫu
  const userData = {
    name: "Di Đan",
    phone: "0388751370",
    city: "Thành phố Hồ Chí Minh",
    businessType: "Tạp hóa",
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin tài khoản</Text>
      </View>

      <View style={styles.infoContainer}>
        <InfoRow label="Họ tên" value={userData.name} />
        <InfoRow label="Số điện thoại" value={userData.phone} />
        <InfoRow label="Tỉnh/Thành phố" value={userData.city} />
        <InfoRow label="Ngành hàng" value={userData.businessType} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Yêu cầu hủy tài khoản</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#F5F5F7",
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
  },
  infoContainer: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  label: {
    fontSize: 16,
    color: "#6E6E73",
  },
  value: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  logoutButton: {
    backgroundColor: "#E5E5EA",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
  },
  deleteButton: {
    marginTop: 16,
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 15,
    color: "#FF3B30",
  },
});

export default UserInformation;
