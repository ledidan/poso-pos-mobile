import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartHeader = ({ onClose, onSave, isSaving, bill = {} }) => (
  <View style={{ marginTop: 60, padding: 10 }}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={onClose}
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
      >
        <Ionicons name="close-outline" size={30} color="#007AFF" />
        {bill.isPaid ? (
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {bill.customerName || "Khách lẻ"}
          </Text>
        ) : (
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tính tiền</Text>
        )}
      </TouchableOpacity>
      {!bill.isPaid && (
        <TouchableOpacity onPress={onSave} disabled={isSaving}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: "#fff",
              backgroundColor: "#007AFF",
              paddingVertical: 6,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
          >
            {isSaving ? "Đang lưu đơn..." : "Lưu"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default CartHeader;
