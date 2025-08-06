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

const Bill = ({ bills, shopID, refetch = () => {} }) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

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
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hoá đơn</Text>
        <TouchableOpacity style={styles.guideBtn}>
          <Text style={styles.guideText}>Hướng dẫn</Text>
          <Ionicons name="play-circle-outline" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: "#f3f3f3" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {bills.length > 0 ? (
          bills.map((day, index) => (
            <BillDaySection
              key={index}
              day={day}
              index={index}
              onSubmitChangeOrder={handleChangePaidOrder}
              onSubmitCloseOrder={handleCloseOrder}
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
});
export default Bill;
