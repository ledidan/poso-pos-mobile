import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyBillPlaceholder = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Không có đơn hàng. Bấm "+" để tạo đơn</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
    margin: 16,
  },
  text: {
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
});

export default EmptyBillPlaceholder;
