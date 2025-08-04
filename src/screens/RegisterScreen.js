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
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "@rneui/base";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [business, setBusiness] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
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
          {/* Form Inputs */}
          <TextInput
            style={styles.input}
            placeholder="Họ tên"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          {/* Giả lập Picker/Dropdown */}
          <TouchableOpacity style={styles.picker}>
            <Text style={styles.pickerText}>Tỉnh/thành phố</Text>
            <Ionicons name="chevron-down-outline" size={20} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.picker}>
            <Text style={styles.pickerText}>Ngành kinh doanh</Text>
            <Ionicons name="chevron-down-outline" size={20} color="#888" />
          </TouchableOpacity>

          {/* Agreement Checkbox */}
          <View style={styles.agreementContainer}>
            <CheckBox
              checked={agreed}
              onPress={() => setAgreed(!agreed)}
              checkedColor="#3B82F6"
              size={30}
              />
            <Text style={styles.agreementText}>
              Tôi đã đọc và đồng ý với{" "}
              <Text style={styles.linkText}>
                Điều khoản và chính sách sử dụng
              </Text>{" "}
              của Knote
            </Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Bạn đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.loginText, styles.linkText]}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Một sản phẩm của </Text>
          <Image
            source={require("../../assets/AppIcons/brand/poso.png")} // Hãy thay bằng logo của bạn
            style={styles.posoLogo}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: { flexGrow: 1 },
  header: {
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
    paddingTop: "10%",
  },
  logo: { width: 200, height: 150, resizeMode: "contain" },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    fontSize: 16,
    marginBottom: 16,
  },
  checkboxContainer: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#3B82F6",
    marginRight: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerText: { fontSize: 16, color: "#A9A9A9" }, // Màu placeholder
  agreementContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 8,
    alignItems: "center",
    marginBottom: 24,
    // alignItems: "flex-start",
  },
  agreementText: { flex: 1, fontSize: 14, color: "#666" },
  linkText: { color: "#3B82F6", fontWeight: "bold" },
  button: {
    backgroundColor: "#3B82F6",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  loginContainer: { flexDirection: "row", marginTop: 24 },
  loginText: { fontSize: 16 },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: { color: "#888" },
  posoLogo: { width: 70, height: 80, resizeMode: "contain" },
});

export default RegisterScreen;
