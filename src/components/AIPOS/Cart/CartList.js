import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ItemCard from "../ItemCard";

const CartList = ({ cart, onEditItem, onAddNew }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#EAF5FF" }}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.itemID}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 20 }}>
            <ItemCard item={item} onPress={() => onEditItem(item)} />
          </View>
        )}
        ListEmptyComponent={
          <View style={{
            backgroundColor: "#EAF5FF",
            flex: 1,
            height: 500,
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}>
            <Text style={{ fontSize: 16 }}>Chưa có hàng hoá nào</Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: "#007AFF",
                borderRadius: 10,
                backgroundColor: "#fff",
              }}
              onPress={onAddNew}
            >
              <Ionicons
                name="add-outline"
                size={24}
                color="#fff"
                style={{
                  padding: 2,
                  backgroundColor: "#007AFF",
                  borderRadius: 20,
                }}
              />
              <Text style={{ fontSize: 16, color: "#007AFF" }}>Thêm sản phẩm</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default CartList;
