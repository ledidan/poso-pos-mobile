import React from "react";
import { View, Text } from "react-native";

const CartTotal = ({ total }) => (
  <View style={{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    padding: 20,
  }}>
    <Text style={{ fontSize: 20, fontWeight: "600" }}>Tổng cộng</Text>
    <Text style={{ fontSize: 20, fontWeight: "600", color: "#007AFF" }}>{total}</Text>
  </View>
);

export default CartTotal;
