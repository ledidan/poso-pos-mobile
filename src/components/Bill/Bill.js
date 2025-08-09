import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BillDaySection from "./BillDaySection";
import EmptyBillPlaceholder from "./EmptyBillPlaceHolder";
import Customers from "../../lib/Services/Customers";
import Merchants from "../../lib/Services/Merchants";
import NotificationToast from "../../utils/NotificationToast";
import dayjs from "dayjs";
import { _initializeDetailsOfItemInCart } from "../../lib/Functions/OrderFormat";
import ConfirmDialog from "../modals/ConfirmDialog";
import QRCodeDialog from "../ui/QRDialog";

const Bill = ({
  bills,
  pastBills,
  shopID,
  refetch = () => {},
  bankConnectionInfo = {},
  activeTab = "active",
  setActiveTab = () => {},
}) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isConfirmAddBank, setIsConfirmAddBank] = useState(false);
  const [isQRCodeDialogVisible, setIsQRCodeDialogVisible] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    qrCode: "",
    amount: 0,
  });
  const { account_name = "" } = bankConnectionInfo;

  const getOrderItemsForOrderDetails = (orderDetails = {}) =>
    orderDetails.orderItems.map((cartItem) =>
      _initializeDetailsOfItemInCart({
        itemID: cartItem.itemID,
        itemInfo: {
          ...cartItem,
          quantity: cartItem.quantity,
          itemNote: cartItem.itemNote || "",
          modifierGroups: cartItem.modifierGroups || [],
        },
      })
    );

  const handleChangeOrderAPI = async (orderID = "", orderDetails = {}) => {
    try {
      const { success } =
        await Customers.PostRequests.AddOrderToShopActiveOrders({
          orderDetails,
          orderID,
          shopID,
        });
      if (!success) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleCloseOrderAPI = async (orderID = "") => {
    try {
      const { success } =
        await Merchants.PostRequests.MoveActiveOrderToPastOrders({
          orderID,
          shopID,
        });
      if (!success) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleCloseOrder = async (orderID = "") => {
    const success = await handleCloseOrderAPI(orderID);
    if (success) {
      NotificationToast.success("Đã đóng đơn hàng thành công");
    } else {
      NotificationToast.error("Lỗi khi đóng đơn hàng");
    }
    refetch();
  };

  const handleChangePaidOrder = async (orderID = "", orderDetails = {}) => {
    const {
      paymentMethodDetail = "",
      isPaid = false,
      paymentMethod = "",
      status = "",
    } = orderDetails;
    await handleChangeOrderAPI(orderID, {
      ...orderDetails,
      orderItems: getOrderItemsForOrderDetails(orderDetails),
      paymentMethod,
      paymentMethodDetail,
      isPaid,
      status,
    });
    try {
      if (isPaid) {
        NotificationToast.success("Thanh toán đơn hàng thành công");
      } else {
        NotificationToast.success("Đã huỷ thanh toán đơn hàng");
      }
    } catch (error) {
      NotificationToast.error("Lỗi khi cập nhật đơn hàng");
    } finally {
      refetch();
    }
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const handleGenerateBill = async ({ orderID = "", amount = 0 }) => {
    const { success, qrCode } = await Customers.PostRequests.GenerateBill({
      shopID,
      amount,
      orderID,
      bankConnectionInfo,
    });
    if (success) {
      setIsQRCodeDialogVisible(true);
      setPaymentInfo({
        qrCode,
        amount,
      });
    } else {
      setIsConfirmAddBank(true);
    }
  };

  const handleConfirmAddBank = () => {
    setIsConfirmAddBank(false);
    navigation.navigate("BankSetup");
  };

  const handlePickDate = () => {
    console.log("pick date");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <ConfirmDialog
        isVisible={isConfirmAddBank}
        onConfirm={handleConfirmAddBank}
        onClose={() => setIsConfirmAddBank(false)}
        title="Bạn chưa có thông tin ngân hàng"
        message="Bạn có muốn thêm thông tin ngân hàng không?"
        confirmText="Thêm"
        cancelText="Bỏ qua"
      />
      <QRCodeDialog
        visible={isQRCodeDialogVisible}
        onDismiss={() => setIsQRCodeDialogVisible(false)}
        qrCodeUrl={paymentInfo.qrCode}
        recipientName={account_name}
        amount={paymentInfo.amount}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Hoá đơn</Text>
        <TouchableOpacity style={styles.guideBtn}>
          <Text style={styles.guideText}>Hướng dẫn</Text>
          <Ionicons name="play-circle-outline" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "active" && styles.tabActive]}
          onPress={() => setActiveTab("active")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "active" && styles.tabTextActive,
            ]}
          >
            Đơn mới
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "past" && styles.tabActive]}
          onPress={() => setActiveTab("past")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "past" && styles.tabTextActive,
            ]}
          >
            Đơn cũ
          </Text>
        </TouchableOpacity>
        {activeTab === "past" && (
          <TouchableOpacity onPress={handlePickDate} style={styles.filterBtn}>
            <Ionicons name="calendar-outline" size={20} color="#007AFF" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#f3f3f3" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {(activeTab === "active" ? bills : pastBills).length > 0 ? (
          (activeTab === "active" ? bills : pastBills).map((day, index) => (
            <BillDaySection
              key={index}
              day={day}
              index={index}
              onSubmitChangeOrder={handleChangePaidOrder}
              onSubmitCloseOrder={handleCloseOrder}
              onSubmitGenerateBill={handleGenerateBill}
            />
          ))
        ) : (
          <EmptyBillPlaceholder />
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AIScreen")}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 80,
    paddingBottom: 20,
    paddingHorizontal: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  guideBtn: {
    backgroundColor: "#EDF4FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  guideText: {
    color: "#007AFF",
    fontWeight: "600",
    marginRight: 4,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 24,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  // ** Tabs
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Tabs container
  tabs: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    gap: 20,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#007AFF", // Màu active
  },
  tabText: {
    fontSize: 16,
    color: "#6B7280", // xám nhạt
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#007AFF",
    fontWeight: "600",
  },

  filterBtn: {
    marginLeft: "auto",
    padding: 8,
  },
});
export default Bill;
