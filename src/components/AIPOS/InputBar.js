import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InputBar = ({ value, onChange, onTogglePanel, onSend, isPanelOpen }) => (
  <View
    style={[
      styles.bar,
      isPanelOpen ? { marginBottom: 0 } : { marginBottom: 20 },
    ]}
  >
    <TouchableOpacity
      style={[styles.iconBtn, isPanelOpen && styles.iconBtnOpen]}
      onPress={() => onTogglePanel(!isPanelOpen)}
    >
      <Ionicons
        name="grid-outline"
        size={22}
        color={isPanelOpen ? "#fff" : "#007AFF"}
      />
    </TouchableOpacity>
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Nhập số lượng + tên hàng + giá bán"
        value={value}
        onChangeText={onChange}
        onPressIn={() => onTogglePanel(false)}
      />
      {value.length > 0 && (
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => onChange("")}
            style={styles.closeBtn}
          >
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSend} style={styles.sendBtn}>
            <Ionicons
              name="send"
              size={26}
              color="#007AFF"
              style={{ marginLeft: 20, marginRight: 5 }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    marginBottom: 35,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
    padding: 20,
  },

  wrapper: { flex: 1, position: "relative", justifyContent: "center" },
  input: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 20,
    paddingRight: 60,
  },
  actions: {
    position: "absolute",
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  closeBtn: {
    backgroundColor: "gray",
    borderRadius: 50,
  },
  iconBtn: {
    padding: 8,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },
  iconBtnOpen: {
    backgroundColor: "#007AFF",
  },
});
export default InputBar;
