import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { truncate } from "lodash";
import dayjs from "dayjs";
import InfoRow from "../ui/InfoRow";
import ChangePasswordPopup from "./ChangePasswordPopup";
import System from "../../lib/Services/System";
import NotificationToast from "../../utils/NotificationToast";
import LoadingDialog from "../modals/LoadingDialog";
import CloseAccountDialog from "./CloseAccountDialog";

const UserInformation = () => {
  const navigation = useNavigation();
  const { signOut = () => {}, user = {}, refetch = () => {} } = useAuth() || {};
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCloseAccountDialogVisible, setIsCloseAccountDialogVisible] = useState(false);
  const {
    personnelName = "",
    phoneNumber = "",
    address = "",
    businessCategory = "",
    bankConnectionInfo,
  } = user;
  const userData = {
    name: personnelName,
    phone: phoneNumber,
    city: address,
    businessType: businessCategory,
  };
  const [bankInfo, setBankInfo] = useState(bankConnectionInfo || {});
  const handleEditBankInfo = () => {
    navigation.navigate("BankSetup", { initialData: bankInfo, isEdit: true });
  };
  const handleLogout = () => {
    signOut();
  };

  const onSubmitChangePassword = async () => {
    try {
      setIsLoading(true);
      const { success } = await System.PostRequests.SaveUserPassword({
        mobileNumber: user.mobileNumber,
        password: newPassword,
      });
      if(success) {
        NotificationToast.success("Thay đổi mật khẩu thành công");
        setIsChangePasswordVisible(false);
        setNewPassword("");
        setConfirmPassword("");
      }
      refetch();
    } catch (error) {
      NotificationToast.error("Thay đổi mật khẩu thất bại");
    } finally {
      setIsLoading(false);
    }
  };
  const handleChangePassword = async () => {
    await onSubmitChangePassword();
    setIsChangePasswordVisible(false);
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LoadingDialog isVisible={isLoading} />
      <ChangePasswordPopup
        visible={isChangePasswordVisible}
        onClose={() => setIsChangePasswordVisible(false)}
        onSubmit={handleChangePassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        setNewPassword={setNewPassword}
        setConfirmPassword={setConfirmPassword}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin tài khoản</Text>
      </View>
      <ScrollView>
        <View style={[styles.changePasswordContainer]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={[
                styles.sectionTitle,
                {
                  marginHorizontal: 10,
                  marginBottom: 0,
                },
              ]}
            >
              Thông tin bảo mật
            </Text>
            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={() => setIsChangePasswordVisible(true)}
            >
              <Text style={styles.changePasswordText}>Thay đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <InfoRow label="Mật khẩu" value={user.password} type="password" />
          </View>
        </View>
        <Text
          style={[
            styles.sectionTitle,
            {
              marginHorizontal: 10,
              marginBottom: 0,
              marginTop: 20,
            },
          ]}
        >
          Thông tin cá nhân
        </Text>
        <View style={styles.infoContainer}>
          <InfoRow label="Họ tên" value={userData.name} />
          <InfoRow label="Số điện thoại" value={userData.phone} />
          <InfoRow label="Tỉnh/Thành phố" value={userData.city} />
          <InfoRow
            label="Ngành hàng"
            value={truncate(userData.businessType, { length: 30 })}
          />
          <InfoRow
            label="Ngày tạo"
            value={dayjs(userData.createdAt).format("DD/MM/YYYY")}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Thông tin thanh toán</Text>
          {Object.keys(bankInfo).length > 0 ? (
            <TouchableOpacity
              style={styles.bankInfoRow}
              onPress={handleEditBankInfo}
            >
              <Image
                source={{ uri: bankInfo.bank_logo }}
                style={styles.bankLogo}
              />
              <View style={styles.bankTextContainer}>
                <Text style={styles.bankName}>{bankInfo.bank_name}</Text>
                <Text style={styles.accountName}>{bankInfo.account_name}</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#6E6E73"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("BankSetup")}
            >
              <Ionicons
                name="add-circle-outline"
                size={22}
                color="#007AFF"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.addButtonText}>Thêm liên kết ngân hàng</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => setIsCloseAccountDialogVisible(true)}>
            <Text style={styles.deleteButtonText}>Yêu cầu hủy tài khoản</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CloseAccountDialog
        visible={isCloseAccountDialogVisible}
        onClose={() => setIsCloseAccountDialogVisible(false)}
        hotlineNumber={"+84977140536"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#F5F5F7",
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
  },
  infoContainer: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  label: {
    fontSize: 16,
    color: "#6E6E73",
  },
  value: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  // MỚI: Styles cho khu vực mới
  sectionContainer: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8A8A8E",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  bankInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F5F5F7",
    borderRadius: 10,
  },
  bankLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
    marginRight: 12,
  },
  bankTextContainer: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "600",
  },
  accountName: {
    fontSize: 14,
    color: "#6E6E73",
    marginTop: 2,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    justifyContent: "center",
    backgroundColor: "#F5F5F7",
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  logoutButton: {
    backgroundColor: "#E5E5EA",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
  },
  deleteButton: {
    marginTop: 16,
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 15,
    color: "#FF3B30",
  },
  changePasswordContainer: {
    marginTop: 10,
  },
  changePasswordButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 10,
    marginTop: 10,
  },
  changePasswordText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default UserInformation;
