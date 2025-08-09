import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  TextInput,
  Button,
  Menu,
  Text,
  Card,
  TouchableRipple,
} from "react-native-paper";
import Merchants from "../../lib/Services/Merchants";
import NotificationToast from "../../utils/NotificationToast";
import ConfirmDialog from "../modals/ConfirmDialog";
import LoadingDialog from "../modals/LoadingDialog";
import { useAuth } from "../../context/AuthContext";
import { InputFunctions } from "../RegexInputFunctions";

const BankSetup = ({ route }) => {
  const navigation = useNavigation();
  const { isEdit = false, initialData = {} } = route.params || {};
  const { userToken = "", refetch = () => {} } = useAuth() || {};
  const shopID = userToken;
  const [isConfirmAddBank, setIsConfirmAddBank] = useState(false);
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(
    initialData.bank_bin ? initialData : null
  );
  const [accountNumber, setAccountNumber] = useState(
    initialData.account_number || ""
  );
  const [accountName, setAccountName] = useState(
    initialData.account_name || ""
  );
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoading(true);
        const bankData = await Merchants.GetRequests.GetAllVietnamBanks();
        setBanks(bankData || []);

        if (initialData.bank_bin) {
          const initialBank = bankData.find(
            (b) => b.bin === initialData.bank_bin
          );
          if (initialBank) setSelectedBank(initialBank);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách ngân hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleSelectBank = (bank) => {
    setSelectedBank(bank);
    closeMenu();
  };

  const onChangeAccountName = (text) => {
    const formattedVietnamese = InputFunctions._formatVietnameseString(text);
    setAccountName(formattedVietnamese);
  };
  const handleSubmit = async () => {
    if (!selectedBank || !accountNumber || !accountName) {
      NotificationToast.info("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setLoading(true);
    const payload = {
      bankConnectionInfo: {
        account_number: accountNumber,
        bank_bin: selectedBank.bin,
        bank_name: selectedBank.shortName,
        account_name: accountName,
        bank_logo: selectedBank.logo,
      },
      shopID,
    };
    try {
      const { success } = await Merchants.PostRequests.SaveBankConnectInfo({
        ...payload,
        shopID,
      });
      if (success) {
        NotificationToast.success("Thêm thông tin ngân hàng thành công");
        navigation.goBack();
      } else {
        NotificationToast.error("Lỗi khi thêm thông tin ngân hàng");
      }
    } catch (error) {
      console.error("Lỗi khi thêm thông tin ngân hàng:", error);
    } finally {
      refetch();
      setLoading(false);
    }
  };

  const clearForm = () => {
    setAccountNumber("");
    setAccountName("");
    setSelectedBank(null);
  };
  const handleDelete = () => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa liên kết ngân hàng này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              const { success } =
                await Merchants.PostRequests.SaveBankConnectInfo({
                  shopID,
                  bankConnectionInfo: null,
                });

              if (success) {
                NotificationToast.success("Xóa liên kết ngân hàng thành công");
                navigation.goBack();
              } else {
                NotificationToast.error("Lỗi khi xóa liên kết ngân hàng");
              }
            } catch (error) {
              console.error("Lỗi khi xóa liên kết ngân hàng:", error);
              NotificationToast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
            } finally {
              refetch();
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <LoadingDialog isVisible={loading} />;
  }

  return (
    <ScrollView style={styles.container}>
      <ConfirmDialog
        isVisible={isConfirmAddBank}
        onClose={() => {
          setIsConfirmAddBank(false);
        }}
        onConfirm={handleSubmit}
        title={"Xác nhận thông tin ngân hàng"}
        message={
          "Thông tin ngân hàng đã chính xác, hãy xác nhận lại để tránh lỗi khi thanh toán."
        }
        confirmText={"Xác nhận"}
        cancelText="Hủy"
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>
          {isEdit
            ? "Chỉnh sửa thông tin ngân hàng"
            : "Thêm thông tin ngân hàng"}
        </Text>
      </View>
      <Card style={styles.card}>
        <Card.Title
          title="Thông tin ngân hàng"
          titleStyle={{ fontSize: 16, fontWeight: "bold" }}
        />
        <Card.Content>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableRipple onPress={openMenu} style={styles.dropdown}>
                <View style={styles.dropdownView}>
                  {selectedBank ? (
                    <Image
                      source={{ uri: selectedBank.logo }}
                      style={styles.bankLogo}
                    />
                  ) : null}
                  <Text style={styles.dropdownText}>
                    {selectedBank
                      ? `${selectedBank.shortName} - ${selectedBank.name}`
                      : "Chọn ngân hàng"}
                  </Text>
                </View>
              </TouchableRipple>
            }
            contentStyle={styles.menuContent}
          >
            <ScrollView style={{ maxHeight: 300, width: "100%" }}>
              {banks.map((bank) => (
                <Menu.Item
                  key={bank.id}
                  style={{ fontSize: 13, width: "100%" }}
                  onPress={() => handleSelectBank(bank)}
                  title={`${bank.shortName} - ${bank.name}`}
                  leadingIcon={() => (
                    <Image
                      loadingIndicatorSource={require("../../../assets/spinnerLoading.gif")}
                      source={{ uri: bank.logo }}
                      style={styles.bankLogo}
                    />
                  )}
                />
              ))}
            </ScrollView>
          </Menu>

          {/* Input cho số tài khoản */}
          <TextInput
            label="Số tài khoản"
            value={accountNumber}
            onChangeText={setAccountNumber}
            mode="outlined"
            style={styles.input}
            keyboardType="number-pad"
          />

          {/* Input cho tên chủ tài khoản */}
          <TextInput
            label="Tên chủ tài khoản"
            value={accountName}
            onChangeText={onChangeAccountName}
            mode="outlined"
            style={styles.input}
            autoCapitalize="characters" // Tự động viết hoa
          />
        </Card.Content>
        <Card.Actions style={styles.actions}>
          {isEdit && (
            <Button onPress={handleDelete} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Huỷ liên kết</Text>
            </Button>
          )}
          <View style={styles.actionsContainer}>
            <Button onPress={clearForm}>Reset</Button>
            <Button mode="contained" onPress={() => setIsConfirmAddBank(true)}>
              Xác nhận
            </Button>
          </View>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  card: {
    flex: 1,
    margin: 16,
  },
  input: {
    marginTop: 16,
  },
  removeButtonText: {
    color: "red",
  },
  actions: {
    justifyContent: "space-between",
    padding: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 18,
    backgroundColor: "#f0f0f0",
  },
  dropdownView: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    flex: 1,
  },
  bankLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: "contain",
  },
  menuContent: {
    maxHeight: 400,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  backIcon: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
});

export default BankSetup;
