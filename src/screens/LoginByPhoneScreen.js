import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LoginByPhoneScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinue = () => {
    // Chuyển sang màn hình OTP và gửi kèm số điện thoại
    // navigation.navigate("Otp", { phone: phoneNumber });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <DialogLoading isVisible={true} /> */}
      {/* Header */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.header}>
          <Text style={styles.headerText}>Hỗ trợ</Text>
          <Ionicons name="headset-outline" size={24} color="black" />
        </TouchableOpacity>

        {/* Body */}
        <View style={styles.body}>
          <Image
            source={require("../../assets/AppIcons/poso-logo-black-text.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>
            Nhập số điện thoại cửa hàng để bắt đầu
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            type="number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Tiếp tục</Text>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Bạn chưa sử dụng Poso? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={[styles.registerText, styles.registerLink]}>
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Một sản phẩm của </Text>
          <Image
            source={require("../../assets/AppIcons/brand/poso.png")}
            style={styles.posoLogo}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
    gap: 4,
  },
  headerText: { fontSize: 16 },
  body: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: "15%",
  },
  logo: { width: 200, height: 150, resizeMode: "contain" },
  title: { fontSize: 18, color: "#333", marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#3B82F6",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  registerContainer: { flexDirection: "row", marginTop: 24 },
  registerText: { fontSize: 16 },
  registerLink: { fontWeight: "bold", color: "#3B82F6" },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: { color: "#888", fontWeight: 400 },
  posoLogo: { width: 70, height: 80, resizeMode: "contain" },
});

export default LoginByPhoneScreen;
