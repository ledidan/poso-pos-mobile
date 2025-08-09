import React from "react";
import { StyleSheet } from "react-native";
import { Portal, Dialog, ActivityIndicator, Text } from "react-native-paper";

const LoadingDialog = ({ isVisible }) => {
  return (
    <Portal>
      <Dialog visible={isVisible} dismissable={false} style={styles.dialog}>
        <Dialog.Content style={styles.content}>
          <ActivityIndicator size="small" color="#007AFF" />
          {/* {text && <Text style={styles.text}>{text}</Text>} */}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    alignSelf: "center",
    width: "auto",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    // paddingVertical: 20,
    paddingHorizontal: 24,
  },
  text: {
    marginLeft: 20,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default LoadingDialog;
