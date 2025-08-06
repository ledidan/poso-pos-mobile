// components/TopSelling.jsx
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TopSelling = ({ topItems = [] }) => {
  const [activeTab, setActiveTab] = useState("revenue");

  const sortedItems = [...topItems].sort((a, b) => {
    if (activeTab === "revenue") return b.revenue - a.revenue;
    return b.quantity - a.quantity;
  });

  const renderNoData = () => (
    <View style={styles.noDataContainer}>
      <Ionicons name="bar-chart-outline" size={36} color="#006afc" />
      <Text style={styles.noDataText}>Chưa có dữ liệu</Text>
    </View>
  );

  return (
    <View style={styles.contentCard}>
      <Text style={styles.sectionTitle}>Hàng bán chạy</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "revenue" && styles.activeTab]}
          onPress={() => setActiveTab("revenue")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "revenue" && styles.activeTabText,
            ]}
          >
            Doanh thu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "quantity" && styles.activeTab]}
          onPress={() => setActiveTab("quantity")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "quantity" && styles.activeTabText,
            ]}
          >
            Số lượng
          </Text>
        </TouchableOpacity>
      </View>
      {sortedItems.length > 0 ? sortedItems.map((item) => (
        <View key={item.itemID} style={styles.bestSellerItem}>
          <View style={styles.itemValueContainer}>
            <View style={styles.itemValueInfo}>
              <Text style={styles.itemName}>{item.itemName}</Text>
            </View>
            {activeTab === "revenue" ? (
              <View style={styles.itemValuePrice}>
                <Text style={styles.itemRevenue}>
                  {item.revenue?.toLocaleString("vi-VN")}đ
                </Text>
                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.itemValueQuantity}>x{item.quantity}</Text>
                <Text style={styles.itemValueRevenue}>
                  {item.revenue?.toLocaleString("vi-VN")}đ
                </Text>
              </View>
            )}
          </View>
        </View>
      )) : renderNoData()}
    </View>
  );
};

const styles = StyleSheet.create({
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 10,
    color: "#1C1C1E",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F0F4F8",
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },

  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#fff",
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6E6E73",
  },
  activeTabText: {
    color: "#000",
  },
  bestSellerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemValueContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  itemValueInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  itemValueQuantity: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  itemValueRevenue: {
    fontSize: 13,
    color: "#8A8A8E",
  },
  itemRevenue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 13,
    color: "#8A8A8E",
  },
  noDataContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: 400,
    color: "#A9A9A9",
  },
});

export default TopSelling;
