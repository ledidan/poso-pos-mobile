// screens/HomeScreen.jsx
import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Home/Header";
import RevenueChart from "../components/Home/RevenueChart";
import TopSelling from "../components/Home/TopSelling";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.trialBanner}>
        <View style={styles.trialBannerContent}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#00529B"
          />
          <Text style={styles.trialText}>Bạn đang ở Gói dùng thử. </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.trialLink}>Xem thêm gói</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="close-outline" size={30} color="#00529B" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentCard}>
          <Text style={styles.sectionTitle}>Tổng quan</Text>
          <View style={[styles.card, styles.blueCard]}>
            <Text style={styles.cardTitle}>Tổng doanh thu</Text>
            <Text style={styles.cardValue}>100.000</Text>
          </View>
          <View style={[styles.card, styles.blueCard]}>
            <Text style={styles.cardTitle}>Số lượng giao dịch</Text>
            <Text style={styles.cardValue}>1</Text>
          </View>
        </View>

        <RevenueChart />
        <TopSelling />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1, backgroundColor: "#EAF5FF" },
  scrollViewContent: { paddingHorizontal: 16, paddingBottom: 30 },
  trialBanner: {
    width: "100%",
    backgroundColor: "#D6E9FF",
    paddingVertical: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1C1C1E",
  },
  trialBannerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  trialText: { color: "#00529B", fontSize: 14 },
  trialLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 14,
    color: "#00529B",
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  blueCard: {
    backgroundColor: "#007AFF",
    alignItems: "flex-start",
  },
  cardTitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    marginBottom: 4,
  },
  cardValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
});

export default HomeScreen;
