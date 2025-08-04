import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
import { useNavigation } from "@react-navigation/native";

const BillCard = ({ bill = {}, index = 0 }) => {
  const removeBill = () => {
    console.log("removeBill", bill);
  };
  const navigate = useNavigation();
  return (
    <View
      style={[styles.card, index % 2 === 0 ? styles.cardBlue : styles.cardGray]}
    >
      <TouchableOpacity onPress={() => navigate.navigate("AIScreen", { bill })}>
        <View style={styles.header}>
          <Text style={styles.timeTag}>
            {dayjs(bill.timeStamp).format("HH:mm")}
          </Text>
          <Text
            style={[
              styles.nameTag,
              { backgroundColor: index === 2 ? "#FFD9A0" : "#E9E9E9" },
            ]}
          >
            {bill.customerName || "Khách lẻ"}
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.itemsBlock}>
            {bill.items.map((item, i) => (
              <Text style={styles.itemText} key={i}>
                {item.itemName} x{item.quantity}
              </Text>
            ))}
          </View>
          <Text style={styles.totalBill}>
            {bill?.total?.toLocaleString("vi-VN") || "0"}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Menu>
          <MenuTrigger customStyles={{ triggerWrapper: styles.menuTrigger }}>
            <Ionicons name="ellipsis-vertical-outline" size={20} color="#333" />
            <Text style={styles.optionText}>Tùy chọn</Text>
          </MenuTrigger>
          <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }}>
            <MenuOption
              onSelect={() => navigate.navigate("AIScreen", { bill })}
              style={{
                padding: 10,

                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="eye-outline"
                size={20}
                color="#333"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.menuOptionText}>Xem chi tiết</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => console.log(`In hóa đơn ${bill.orderID}`)}
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="print-outline"
                size={20}
                color="#333"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.menuOptionText}>In hóa đơn</Text>
            </MenuOption>
            <View style={styles.divider} />
            <MenuOption
              onSelect={() => alert(`Xóa hóa đơn ${bill.orderID}`)}
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color="red"
                style={{ marginRight: 10 }}
              />
              <Text style={[styles.menuOptionText, { color: "red" }]}>Xóa</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
        <TouchableOpacity style={styles.row}>
          <Ionicons name="qr-code-outline" size={20} color="#777" />
          <Text style={styles.optionText}>Mã QR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paidBtn}
          onPress={() => console.log("Thanh toán")}
        >
          <Text style={styles.paidText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardBlue: {
    borderColor: "#1D6EF0",
    borderWidth: 1.5,
    borderStyle: "dashed",
  },
  cardGray: { borderWidth: 0 },
  header: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "center",
    width: "100%",
    padding: 12,
  },
  timeTag: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 6,
    fontSize: 13,
  },
  nameTag: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 6,
    fontSize: 13,
    fontWeight: "500",
  },
  content: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemsBlock: { marginBottom: 10, padding: 12 },
  itemText: { fontSize: 16, marginBottom: 4 },
  totalBill: { fontWeight: "bold", fontSize: 16, paddingRight: 10 },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  row: { flexDirection: "row", alignItems: "center" },
  optionText: { marginLeft: 5, color: "#777" },
  paidBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  paidText: { color: "#fff", fontWeight: "600" },
  menuTrigger: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuOptions: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: 200,
    padding: 10,
  },
});

export default BillCard;
