import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BillCard from "../Bill/BillCard";
import dayjs from "dayjs";

const BillDaySection = ({
  day = {},
  index = 0,
  onSubmitChangeOrder = () => {},
  onSubmitCloseOrder = () => {},
  onSubmitGenerateBill = () => {},
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>
          {/* {index === 0 ? "Hôm nay, " : ""} */}
          {dayjs(day.timeStamp).format("DD/MM/YYYY")}
        </Text>
        <Text style={styles.totalText}>
          {day.total.toLocaleString("vi-VN")}
        </Text>
      </View>
      {/* {day.map((bill, idx) => ( */}
      <BillCard
        bill={day}
        onSubmitChangeOrder={onSubmitChangeOrder}
        onSubmitCloseOrder={onSubmitCloseOrder}
        onSubmitGenerateBill={onSubmitGenerateBill}
      />
      {/* ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 12 },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  dateText: {
    fontWeight: "600",
    fontSize: 14,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default BillDaySection;
