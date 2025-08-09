import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";
import { Image } from "expo-image";
import axios from "axios";
import SelectionModal from "../components/ui/SelectionModal";
import RegisterNewShopHelper from "../components/Auth/RegisterNewShopHelper";
import System from "../lib/Services/System";
import REGEX from "../lib/Constants/RegEx";
const BUSINESS_CATEGORIES = [
  { id: 1, name: "Bán lẻ (Tạp hóa, Siêu thị mini)" },
  { id: 2, name: "Ăn uống & Nhà hàng (Quán ăn, Café)" },
  { id: 3, name: "Thời trang & Phụ kiện" },
  { id: 4, name: "Sức khỏe & Sắc đẹp (Spa, Salon, Nhà thuốc)" },
  { id: 5, name: "Dịch vụ (Sửa chữa, Giặt ủi)" },
  { id: 6, name: "Giáo dục & Đào tạo" },
  { id: 7, name: "Giải trí & Thể thao" },
  { id: 8, name: "Khác" },
];
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigation = useNavigation();

  const [provinces, setProvinces] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const [isBusinessModalVisible, setBusinessModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const onCreateNewShop = async (newShop = {}) => {
    const { newShopInfo, shopId } = RegisterNewShopHelper._constructNewShopInfo(
      { newShop }
    );
    const { success, shopId: newShopId } =
      await System.PostRequests.CreateNewShop({
        shopId,
        newShopInfo,
      });
    // ** Handle logic sending new shop info to user's zalo
    if (!success) return false;
    return true;
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://provinces.open-api.vn/api/p/"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách tỉnh thành:", error);
        Alert.alert("Lỗi", "Không thể tải danh sách Tỉnh/Thành phố.");
      }
    };
    fetchProvinces();
  }, []);

  const handleRegister = async () => {
    if (!name.trim() || !phone.trim() || !selectedCity || !selectedBusiness) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (!REGEX.VN_PHONE_NUMBER.test(phone)) {
      Alert.alert("Thông báo", "Số điện thoại không hợp lệ.");
      return;
    }
    if (!agreed) {
      Alert.alert(
        "Thông báo",
        "Bạn cần đồng ý với Điều khoản và chính sách sử dụng."
      );
      return;
    }

    setLoading(true);

    const payload = {
      personnelName: name.trim(),
      mobileNumber: phone.trim(),
      city: selectedCity.name,
      businessCategory: selectedBusiness.name,
    };

    try {
      const success = await onCreateNewShop(payload);
      if (!success) return;

      Alert.alert("Thành công", "Đăng ký tài khoản thành công!", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      Alert.alert("Lỗi", "Đăng ký không thành công, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (  
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <TouchableOpacity style={styles.header} onPress={() => Linking.openURL("tel:+84977140536")}>
          <Text style={styles.headerText}>Hỗ trợ</Text>
          <Ionicons name="headset-outline" size={24} color="black" />
        </TouchableOpacity>

        {/* Body */}
        <View style={styles.body}>
          <Image
            source={require("../../assets/AppIcons/poso-logo-black-text.png")}
            style={styles.logo}
            contentFit="contain"
          />
          {/* Form Inputs */}
          <TextInput
            style={styles.input}
            placeholder="Họ tên"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />

          {/* SỬA: Picker Tỉnh/Thành phố */}
          <TouchableOpacity
            style={styles.picker}
            onPress={() => setCityModalVisible(true)}
          >
            <Text
              style={[
                styles.pickerText,
                selectedCity && styles.pickerSelectedText,
              ]}
            >
              {selectedCity ? selectedCity.name : "Tỉnh/thành phố"}
            </Text>
            <Ionicons name="chevron-down-outline" size={20} color="#888" />
          </TouchableOpacity>

          {/* SỬA: Picker Ngành kinh doanh */}
          <TouchableOpacity
            style={styles.picker}
            onPress={() => setBusinessModalVisible(true)}
          >
            <Text
              style={[
                styles.pickerText,
                selectedBusiness && styles.pickerSelectedText,
              ]}
            >
              {selectedBusiness ? selectedBusiness.name : "Ngành kinh doanh"}
            </Text>
            <Ionicons name="chevron-down-outline" size={20} color="#888" />
          </TouchableOpacity>

          {/* Agreement Checkbox */}
          <View style={styles.agreementContainer}>
            <Checkbox.Android
              status={agreed ? "checked" : "unchecked"}
              onPress={() => setAgreed(!agreed)}
              color="#006afc"
            />
            <Text style={styles.agreementText}>
              Tôi đã đọc và đồng ý với{" "}
              <Text style={styles.linkText}>
                Điều khoản và chính sách sử dụng
              </Text>{" "}
              của Poso
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Đăng ký</Text>
            )}
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
            source={require("../../assets/AppIcons/brand/poso.png")}
            style={styles.posoLogo}
            contentFit="contain"
          />
        </View>
      </ScrollView>

      <SelectionModal
        visible={isCityModalVisible}
        title="Chọn Tỉnh/Thành phố"
        data={provinces}
        onClose={() => setCityModalVisible(false)}
        onSelect={(item) => {
          setSelectedCity(item);
          setCityModalVisible(false);
        }}
        searchPlaceholder="Tìm Tỉnh/Thành phố..."
      />

      <SelectionModal
        visible={isBusinessModalVisible}
        title="Chọn Ngành kinh doanh"
        data={BUSINESS_CATEGORIES}
        onClose={() => setBusinessModalVisible(false)}
        onSelect={(item) => {
          setSelectedBusiness(item);
          setBusinessModalVisible(false);
        }}
        searchPlaceholder="Tìm ngành nghề..."
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pickerText: { fontSize: 16, color: "#8A8A8E" },
  pickerSelectedText: { color: "black" },
  buttonDisabled: { backgroundColor: "#A9A9A9" },
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
  agreementContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 8,
    alignItems: "center",
    marginBottom: 24,
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
