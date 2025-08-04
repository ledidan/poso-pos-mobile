import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Functions } from "../../lib";

const ItemCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.row}>
      <Text style={styles.name}>{item.itemName}</Text>
      <Text style={styles.total}>
        {Functions.Math.formatVND(item.quantity * item.itemPrice)}đ
      </Text>
    </View>
    <Text style={styles.detail}>
      {item.quantity} x {Functions.Math.formatVND(item.itemPrice)}
    </Text>
  </TouchableOpacity>
);

export default ItemCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  name: { fontSize: 17, fontWeight: "600" },
  total: { fontSize: 18, fontWeight: "600", color: "#333" },
  detail: { fontSize: 16, color: "#007AFF", marginTop: 7, fontWeight: "500" },
});
