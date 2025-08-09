import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import System from "../lib/Services/System";
import { useAuth } from "../context/AuthContext";
import NotificationToast from "../utils/NotificationToast";
import LoadingDialog from "../components/modals/LoadingDialog";

const LoginByPhoneScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const { signIn = () => {} } = useAuth() || {};
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    phoneNumber: "",
    password: "",
  });

  const onLogin = async () => {
    setLoading(true);

    if (!phoneNumber) {
      setErrorMessage({
        ...errorMessage,
        phoneNumber: "Vui lòng nhập số điện thoại",
      });
      setLoading(false);
      return;
    }
    if (!password) {
      setErrorMessage({ ...errorMessage, password: "Vui lòng nhập mật khẩu" });
      setLoading(false);
      return;
    }
    const {
      data = {},
      success,
      error,
    } = await System.PostRequests.LoginShop({
      mobileNumber: phoneNumber,
      password,
    });

    if (success && data.shopID) {
      const { shopID = "", personnelID = "" } = data;
      signIn({
        shopID,
        userData: { phoneNumber, personalID: personnelID },
      });
      NotificationToast.success("Đăng nhập thành công");
      setLoading(false);
      setErrorMessage({
        phoneNumber: "",
        password: "",
      });
      setLoading(false);
    } else {
      console.log("error", error);
      const { mobileNumber, password } = error.response.data || {};
      if (mobileNumber) {
        setErrorMessage({ ...errorMessage, phoneNumber: mobileNumber });
      }
      if (password) {
        setErrorMessage({ ...errorMessage, password });
      }
      setLoading(false);
      NotificationToast.error(mobileNumber || password);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <LoadingDialog isVisible={loading} />
      {/* Header */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.header} onPress={() => Linking.openURL("tel:+84977140536")}>
          <Text style={styles.headerText}>Hỗ trợ</Text>
          <Ionicons name="headset-outline" size={24} color="black" />
        </TouchableOpacity>

        {/* Body */}
        <View style={styles.body}>
          <Image
            source={require("../../assets/AppIcons/poso-logo-black-text.png")}
            contentFit="contain"
            style={styles.logo}
            placeholder={require("../../assets/AppIcons/appstore.png")}
            transition={500}
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
            onBlur={() => setErrorMessage({ ...errorMessage, phoneNumber: "" })}
          />
          {errorMessage.phoneNumber && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage.phoneNumber}</Text>
            </View>
          )}
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu"
            keyboardType="default"
            type="text"
            value={password}
            onChangeText={setPassword}
            onBlur={() => setErrorMessage({ ...errorMessage, password: "" })}
            secureTextEntry={true}
          />
          {errorMessage.password && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage.password}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={onLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Đăng nhập</Text>
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
            contentFit="contain"
            placeholder={require("../../assets/AppIcons/appstore.png")}
            transition={500}
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
  errorText: {
    color: "red",
    fontSize: 12,
    fontWeight: 500,
    marginLeft: 10,
  },
  errorContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 16,
  },
});

export default LoginByPhoneScreen;
