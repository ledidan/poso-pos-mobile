import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
export default function HomeScreen() {


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Autuna</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Tổng quan CRM</Text>

        <View style={styles.chartBox}>
          <Text>📊 Biểu đồ khách hàng</Text>
        </View>

        <View style={styles.chartBox}>
          <Text>📈 Biểu đồ công việc</Text>
        </View>

        <View style={styles.chartBox}>
          <Text>📅 Biểu đồ chấm công</Text>
        </View>

        <View style={styles.chartBox}>
          <Text>💵 Biểu đồ hóa đơn / báo giá</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "600",
  },
  chartBox: {
    height: 150,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
