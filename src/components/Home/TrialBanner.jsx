import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TrialBanner = () => {
  return (
    <View style={styles.trialBanner}>
      <View style={styles.trialBannerContent}>
        <Ionicons name="information-circle-outline" size={24} color="#00529B" />
        <Text style={styles.trialText}>Bạn đang ở Gói dùng thử. </Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.trialLink}>Xem thêm gói</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="close-outline" size={30} color="#00529B" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  trialBanner: {
    width: "100%",
    backgroundColor: "#D6E9FF",
    paddingVertical: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  trialBannerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  trialText: { color: "#00529B", fontSize: 14 },
  trialLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 14,
    color: "#00529B",
  },
});
export default TrialBanner;
