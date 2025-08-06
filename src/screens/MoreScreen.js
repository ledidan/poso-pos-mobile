import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const MoreScreen = () => {
  const navigate = useNavigation();
  return (
    <ScrollView style={[styles.container]}>
      {/* Avatar + Info */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <TouchableOpacity onPress={() => navigate.navigate("UserInformation")}>
            <Ionicons name="person-circle-outline" size={80} color="#aaa" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Di Đan</Text>
        <Text style={styles.phone}>0388751370</Text>
      </View>

      {/* Option List */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Tài khoản ngân hàng</Text>
        <TouchableOpacity style={styles.optionRow}>
          <Ionicons name="add-outline" size={24} color="#007AFF" />
          <Text style={styles.addNew}>Thêm mới</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Gói dịch vụ</Text>
        <View style={styles.optionRow}>
          <Ionicons name="leaf-outline" size={24} color="#22C55E" />
          <Text style={{ marginLeft: 8 }}>Gói dùng thử </Text>
          <Text style={styles.subText}>Còn 296 lượt tạo đơn</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Loa thông báo nhận tiền</Text>
        <View style={styles.optionRow}>
          <Ionicons name="volume-high-outline" size={24} color="#007AFF" />
          <Text style={{ marginLeft: 8 }}>Đã nhận {`{Số tiền}`}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.hotlineCard}>
        <Ionicons name="call-outline" size={20} color="#007AFF" />
        <Text style={styles.hotlineText}>Gọi tổng đài 1900 4512</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Phiên bản 1.1.0</Text>
    </ScrollView>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  header: {
    alignItems: "center",
    marginTop: 80,
    marginBottom: 10,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  phone: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    marginTop: 12,
    elevation: 1,
  },
  sectionTitle: {
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 20,
    color: "#666",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  addNew: {
    color: "#007AFF",
    marginLeft: 6,
    fontWeight: "600",
  },
  subText: {
    color: "#777",
    fontSize: 14,
    textAlign: "right",
    flex: 1,
  },
  hotlineCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  hotlineText: {
    marginLeft: 8,
    color: "#007AFF",
    fontWeight: "600",
  },
  versionText: {
    textAlign: "center",
    marginTop: 24,
    color: "#aaa",
    fontSize: 12,
  },
});
