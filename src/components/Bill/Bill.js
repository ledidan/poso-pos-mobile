import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BillDaySection from "./BillDaySection";
import EmptyBillPlaceholder from "./EmptyBillPlaceHolder";

const Bill = ({ bills }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hoá đơn</Text>
        <TouchableOpacity style={styles.guideBtn}>
          <Text style={styles.guideText}>Hướng dẫn</Text>
          <Ionicons name="play-circle-outline" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
        {bills.length > 0 ? (
          bills.map((day, index) => (
            <BillDaySection key={index} day={day} index={index} />
          ))
        ) : (
          <EmptyBillPlaceholder />
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AIScreen")}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 80,
    paddingBottom: 20,
    paddingHorizontal: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  guideBtn: {
    backgroundColor: "#EDF4FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  guideText: {
    color: "#007AFF",
    fontWeight: "600",
    marginRight: 4,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 24,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});
export default Bill;
