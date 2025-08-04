// components/TopSelling.jsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TopSelling = () => {
  const [activeTab, setActiveTab] = useState("revenue");

  return (
    <View style={styles.contentCard}>
      <Text style={styles.sectionTitle}>Hàng bán chạy</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'revenue' && styles.activeTab]}
          onPress={() => setActiveTab('revenue')}
        >
          <Text style={[styles.tabText, activeTab === 'revenue' && styles.activeTabText]}>Doanh thu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'quantity' && styles.activeTab]}
          onPress={() => setActiveTab('quantity')}
        >
          <Text style={[styles.tabText, activeTab === 'quantity' && styles.activeTabText]}>Số lượng</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bestSellerItem}>
        <Text style={styles.itemName}>Sting</Text>
        <View style={styles.itemValueContainer}>
          <Text style={styles.itemRevenue}>100,000</Text>
          <Text style={styles.itemQuantity}>x5</Text>
        </View>
      </View>
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
    marginBottom: 16,
    color: '#1C1C1E',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F4F8',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6E6E73',
  },
  activeTabText: {
    color: '#000',
  },
  bestSellerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemRevenue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#8A8A8E',
  },
});

export default TopSelling;
