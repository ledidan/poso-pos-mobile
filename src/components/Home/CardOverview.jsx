import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CardOverview = ({ data }) => {
  const { totalRevenue, totalTransactions } = data;
  return (
    <View style={styles.contentCard}>
      <Text style={styles.sectionTitle}>Tổng quan</Text>
      <View style={[styles.card, styles.blueCard]}>
        <Text style={styles.cardTitle}>Tổng doanh thu</Text>
        <Text style={styles.cardValue}>{totalRevenue.toLocaleString("vi-VN")}</Text>
      </View>
      <View style={[styles.card, styles.blueCard]}>
        <Text style={styles.cardTitle}>Số lượng giao dịch</Text>
        <Text style={styles.cardValue}>{totalTransactions}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
    color: "#1C1C1E",
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
export default CardOverview;
