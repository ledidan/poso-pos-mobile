import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

const DemoUserInfo = () => {
  const { user = {}, refetch } = useAuth() || {};
  const { personnelName = "", phoneNumber = "", subscriptionInfo = {} } = user;
  const { packageInfo = {} } = subscriptionInfo;
  const {
    packageName = "",
    ordersLimit = 0,
    remainingOrders = 0,
  } = packageInfo;
  const navigate = useNavigation();
  useEffect(() => {
    refetch();
  }, []);

  const handleExplorePackages = () => {
    navigate.navigate("ServicePackages");
  };
  const countRemainingOrders = useMemo(
    () => (remainingOrders - ordersLimit) * -1,
    [remainingOrders, ordersLimit]
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <TouchableOpacity
            onPress={() => navigate.navigate("UserInformation")}
          >
            <Ionicons name="person-circle-outline" size={80} color="#aaa" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{personnelName}</Text>
        <Text style={styles.phone}>{phoneNumber}</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Gói hiện tại</Text>
            <View style={styles.trialBadge}>
              <Text style={styles.trialBadgeText}>{packageName}</Text>
            </View>
          </View>
          <Text style={styles.usageText}>
            <Text style={styles.usageHighlight}>
              {countRemainingOrders}/{ordersLimit}
            </Text>{" "}
            lượt tạo đơn miễn phí
          </Text>
          <Text style={styles.cardDescription}>
            Gói dùng thử gồm 300 lượt tạo đơn miễn phí và quyền sử dụng đầy đủ
            tính năng
          </Text>
          <Text style={styles.upgradeNotice}>
            (*) Hãy nâng cấp gói dịch vụ ngay để không gián đoạn việc kinh doanh
            của bạn!
          </Text>
        </View>

        <View style={styles.promoCard}>
          <Text style={styles.promoPriceLabel}>GIÁ CHỈ TỪ</Text>
          <View style={styles.promoPriceValueContainer}>
            <Text style={styles.promoPriceValue}>1,300</Text>
            <Text style={styles.promoPriceUnit}>ĐỒNG{"\n"}/NGÀY</Text>
          </View>
          <Text style={styles.promoTitle}>
            Nâng cấp gói để nhận đặc quyền 2 KHÔNG
          </Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={styles.featureText}>
                KHÔNG giới hạn lượt tạo đơn
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={styles.featureText}>KHÔNG giới hạn tính năng</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.promoButton}
            onPress={handleExplorePackages}
          >
            <Text style={styles.promoButtonText}>Khám phá gói</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.hotlineCard}>
        <Ionicons name="call-outline" size={20} color="#007AFF" />
        <Text style={styles.hotlineText}>Gọi tổng đài 0977140536</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Phiên bản 1.1.0</Text>
    </ScrollView>
  );
};

export default DemoUserInfo;

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
  contentContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  trialBadge: {
    backgroundColor: "#F0F5FF",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  trialBadgeText: {
    color: "#0052CC",
    fontSize: 12,
    fontWeight: "500",
  },
  usageText: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 8,
  },
  usageHighlight: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#10B981", // Green color
  },
  cardDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
    lineHeight: 20,
  },
  upgradeNotice: {
    fontSize: 12,
    color: "#6B7280",
    fontStyle: "italic",
  },
  promoCard: {
    backgroundColor: "#2563EB",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    overflow: "hidden",
  },
  promoPriceLabel: {
    color: "#A5B4FC",
    fontSize: 14,
    fontWeight: "bold",
  },
  promoPriceValueContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 4,
  },
  promoPriceValue: {
    color: "#FFFFFF",
    fontSize: 52,
    fontWeight: "bold",
    lineHeight: 52,
  },
  promoPriceUnit: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
    lineHeight: 16,
    marginBottom: 6,
  },
  promoTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 12,
    textAlign: "center",
  },
  featureList: {
    alignSelf: "flex-start",
    marginBottom: 16,
    marginLeft: "10%", // Căn lề cho đẹp hơn
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 8,
  },
  promoButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  promoButtonText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "bold",
  },
  hotlineCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  hotlineText: {
    marginLeft: 8,
    color: "#007AFF",
    fontWeight: "600",
  },
  versionText: {
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
    color: "#aaa",
    fontSize: 12,
  },
});
