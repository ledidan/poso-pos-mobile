// components/Header.jsx
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ selectedRange, onPressFilter }) => {  
  return (
    <View style={styles.header}>
      <View style={styles.logoRow}>
        <Image source={require("../../../assets/AppIcons/poso-logo-black-text.png")} style={styles.logo} />
      </View>

      <View style={styles.actions}>
        <Ionicons name="call-outline" size={24} color="#333" />
        <TouchableOpacity style={styles.dateFilter} onPress={onPressFilter}>
          <Text style={styles.dateText}>{selectedRange}</Text>
          <Ionicons name="chevron-down" size={16} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 80,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 60,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  dateFilter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E9F0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
});

export default Header;
