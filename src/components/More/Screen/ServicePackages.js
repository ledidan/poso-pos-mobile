import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const packagesData = [
  {
    id: 1,
    name: "Làm quen",
    duration: "3 tháng",
    totalPrice: 150000,
    monthlyPrice: 50000,
    savings: null,
    tag: null,
  },
  {
    id: 2,
    name: "Gắn kết",
    duration: "6 tháng",
    totalPrice: 260000,
    monthlyPrice: 43000,
    savings: 40000,
    tag: "Phổ biến nhất",
  },
  {
    id: 3,
    name: "Đồng hành",
    duration: "12 tháng",
    totalPrice: 480000,
    monthlyPrice: 40000,
    savings: 120000,
    tag: "Tiết kiệm nhất",
  },
];

const ServicePackages = ({ navigation }) => {
  // State để lưu trữ gói đang được chọn, mặc định là gói 'Gắn kết'
  const [selectedPackage, setSelectedPackage] = useState(packagesData[1]);

  // Hàm định dạng tiền tệ
  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN") + "đ";
  };
  const SUPPORT_PHONE_NUMBER = "0977140536";

  const handlePhoneCall = () => {
    Linking.openURL(`tel:${SUPPORT_PHONE_NUMBER}`);
  };
  const handleZaloChat = async () => {
    const zaloUrl = `https://zalo.me/${SUPPORT_PHONE_NUMBER}`;
    try {
      const supported = await Linking.canOpenURL(zaloUrl);
      if (supported) {
        await Linking.openURL(zaloUrl);
      } else {
        Alert.alert(
          "Thông báo",
          "Không thể mở Zalo. Vui lòng kiểm tra xem bạn đã cài đặt ứng dụng Zalo chưa."
        );
      }
    } catch (error) {
      Alert.alert("Lỗi", "Đã có lỗi xảy ra khi cố gắng mở Zalo.");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#111827"
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đăng ký gói dịch vụ</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {packagesData.map((pkg) => {
          const isSelected = selectedPackage.id === pkg.id;
          return (
            <TouchableOpacity
              key={pkg.id}
              style={[styles.packageCard, isSelected && styles.selectedCard]}
              onPress={() => setSelectedPackage(pkg)}
            >
              {/* Hiển thị tag 'Phổ biến nhất' / 'Tiết kiệm nhất' */}
              {pkg.tag && (
                <View
                  style={[
                    styles.tag,
                    pkg.tag === "Tiết kiệm nhất" && styles.bestValueTag,
                  ]}
                >
                  <Text style={styles.tagText}>{pkg.tag}</Text>
                </View>
              )}

              <View style={styles.packageInfo}>
                <Text style={styles.packageName}>
                  {pkg.name} ({pkg.duration})
                </Text>
                {pkg.savings && (
                  <View style={styles.savingsContainer}>
                    <Ionicons name="gift" size={14} color="#D92D20" />
                    <Text style={styles.savingsText}>
                      Tiết kiệm {formatCurrency(pkg.savings)}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.priceInfo}>
                <Text style={styles.totalPrice}>
                  {formatCurrency(pkg.totalPrice)}
                </Text>
                <Text style={styles.monthlyPrice}>
                  {formatCurrency(pkg.monthlyPrice)}/tháng
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* <Text style={styles.renewalNotice}>
          Gói dịch vụ sẽ tự động gia hạn với các điều khoản không thay đổi, trừ
          khi bạn hủy ít nhất 24 giờ trước khi chu kỳ hiện tại kết thúc.
        </Text> */}

        {/* Khối hỗ trợ */}
        <View style={styles.supportSection}>
          <TouchableOpacity style={styles.supportRow} onPress={handlePhoneCall}>
            <Ionicons name="headset-outline" size={24} color="#4B5563" />
            <Text style={styles.supportText}>
              Bạn cần hỗ trợ thanh toán?{" "}
              <Text style={styles.supportLink}>Gọi 0977140536</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportRow} onPress={handleZaloChat}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="#4B5563"
            />
            <Text style={styles.supportText}>
              Liên hệ <Text style={styles.supportLink}>Zalo</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer chứa nút thanh toán */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>
            Thanh toán: {formatCurrency(selectedPackage.totalPrice)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.restoreLink}>Khôi phục gói</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Ghi chú: Header "Đăng ký gói dịch vụ" nên được cấu hình trong
// options của screen trong Stack Navigator.
// Ví dụ: <Stack.Screen name="ServicePackages" component={ServicePackages} options={{ title: 'Đăng ký gói dịch vụ' }} />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    gap: 10,
    backgroundColor: "#FFFFFF",
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  backButton: {
    marginRight: 10,
    backgroundColor: "#dee2e6",
    borderRadius: 10,
    padding: 10,
  },
  scrollContainer: {
    padding: 16,
  },
  packageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    padding: 16,
    marginBottom: 16,
    position: "relative",
    overflow: "hidden",
  },
  selectedCard: {
    borderColor: "#2563EB", // Blue border for selected
  },
  tag: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#2563EB", // Blue for "Phổ biến nhất"
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  bestValueTag: {
    backgroundColor: "#D92D20", // Red for "Tiết kiệm nhất"
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  packageInfo: {
    marginBottom: 8,
  },
  packageName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  savingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  savingsText: {
    color: "#D92D20",
    fontWeight: "500",
    marginLeft: 6,
    fontSize: 13,
  },
  priceInfo: {
    alignItems: "flex-end",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  monthlyPrice: {
    fontSize: 14,
    color: "#6B7280",
  },
  renewalNotice: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginVertical: 16,
  },
  supportSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  supportRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  supportText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 12,
  },
  supportLink: {
    color: "#2563EB",
    fontWeight: "600",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  checkoutButton: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  restoreLink: {
    color: "#2563EB",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 16,
  },
});

export default ServicePackages;
