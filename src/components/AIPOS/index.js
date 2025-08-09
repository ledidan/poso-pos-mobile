import React, { useEffect, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCartStore } from "../../lib/stores/cartStore";
import Customers from "../../lib/Services/Customers";
import Merchants from "../../lib/Services/Merchants";
import System from "../../lib/Services/System";
import { _initializeDetailsOfItemInCart } from "../../lib/Functions/OrderFormat";
import NotificationToast from "../../utils/NotificationToast";
import CartList from "./Cart/CartList";
import CartInputBar from "./Cart/CartInputBar";
import CartHeader from "./Cart/CartHeader";
import CartModals from "./Cart/CartModals";
import CartTotal from "./Cart/CartTotal";
import _isEmpty from "lodash.isempty";
import { useDismissAction } from "../../context/DismissActionContext";
import UpgradeDialog from "../ui/UpgradeDialog";

const AIPOS = ({
  menus = {},
  shopID,
  refetch = () => {},
  refetchShopInfo = () => {},
  shopBasicInfo = {},
}) => {
  const { subscriptionInfo = {} } = shopBasicInfo;
  const { packageInfo = {} } = subscriptionInfo;
  // navigation
  const { CreateNewItem, SaveChangedItemInfo } = Merchants.PostRequests;
  const { ChangeShopOrderLimit } = System.PostRequests;
  const navigation = useNavigation();
  const { bill = {} } = useRoute().params || {};
  const [showPanel, setShowPanel] = useState(false);
  const [initialCart, setInitialCart] = useState([]);
  const [input, setInput] = useState("");
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const {
    orderItems: cart,
    addItem,
    removeItem,
    clearCart,
    updateItem,
    updateCart,
  } = useCartStore();

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editItem, setEditItem] = useState(null);
  const [note, setNote] = useState("");
  const [orderID, setOrderID] = useState(null);

  const [orderHandler, setOrderHandler] = useState({
    submittedOrderDeliveryTypeID: "pickUp",
    isSendingOrderToShop: false,
    isSavingItem: false,
    isCreatingItem: false,
  });
  const updateOrderHandler = (value) =>
    setOrderHandler((prev) => ({ ...prev, ...value }));

  const [isCartChanged, setIsCartChanged] = useState(false);

  const total = cart
    .reduce((s, i) => s + i.quantity * i.itemPrice, 0)
    .toLocaleString("vi-VN");

  const { registerDismissAction, unregisterDismissAction, dismissAllActions } =
    useDismissAction();

  // Dismiss actions
  useEffect(() => {
    registerDismissAction("closePanelAction", closePanelAction);
    return () => {
      unregisterDismissAction("closePanelAction");
    };
  }, [showPanel]);

  useEffect(() => {
    if (bill && bill.orderItems) {
      setOrderID(bill.orderID);
      updateCart(bill.orderID, bill.orderItems);
      setInitialCart(bill.orderItems);
    }
  }, [bill]);

  const getOrderItemsForOrderDetails = () =>
    cart.map((cartItem) =>
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

  const onSubmitOrderToShop = async (orderDetails = {}) => {
    const { orderDeliveryTypeID = "pickUp" } = orderDetails;
    const { success } = await Customers.PostRequests.AddOrderToShopActiveOrders(
      {
        orderDetails,
        orderID,
        shopID,
      }
    );
    if (!success) {
      updateOrderHandler({
        isSendingOrderToShop: false,
        submittedOrderDeliveryTypeID: orderDeliveryTypeID,
      });
      NotificationToast.error("Lỗi khi đặt hàng");
      return;
    }
    updateOrderHandler({
      isSendingOrderToShop: false,
    });
    if (orderID) {
      NotificationToast.success("Cập nhật đơn hàng thành công");
    } else {
      NotificationToast.success("Đặt hàng thành công");
      // cập nhật remainingOrders trong subscriptionInfo
      await ChangeShopOrderLimit({ shopID });
      refetchShopInfo();
    }
    clearCart();
    navigation.navigate("MainTabNavigator", {
      orderID: orderID,
      screen: "Bill",
    });
  };

  const onCheckOut = async (orderDetails = {}) => {
    try {
      updateOrderHandler({
        isSendingOrderToShop: true,
      });
      await onSubmitOrderToShop({
        ...orderDetails,
        status: "active",
      });
    } catch (err) {
      NotificationToast.error("Có lỗi xảy ra khi thanh toán");
    }
  };

  const handleSubmitOrder = async () => {
    if (!cart.length) {
      NotificationToast.error(
        "Thông tin chưa đầy đủ",
        "Vui lòng thêm sản phẩm để đặt hàng"
      );
      return;
    }
    // check if remainingOrders is less than 0
    if (packageInfo.remainingOrders <= 0) {
      // NotificationToast.error(
      //   "Bạn đã hết lượt đặt hàng, vui lòng mua gói để tiếp tục sử dụng"
      // );
      setIsDialogVisible(true);
      return;
    }
    try {
      await onCheckOut({
        orderItems: getOrderItemsForOrderDetails(),
        orderDeliveryTypeID: "pickUp",
        paymentMethodDetail: "",
        total: total,
        timeStamp: new Date().toISOString(),
        isPaid: false,
      });
    } catch (err) {
      NotificationToast.error("Có lỗi xảy ra khi thanh toán");
    }
  };

  const checkCartChanged = () => {
    if (JSON.stringify(initialCart) !== JSON.stringify(cart)) {
      setIsCartChanged(true);
    } else {
      setIsCartChanged(false);
      clearCart();
      navigation.goBack();
    }
  };

  const onUpdateAllItems = ({ itemID = "", itemInfo = {} }) => {
    if (!itemID) return;
    else if (_isEmpty(itemInfo)) removeItem(itemID);
    else updateItem(itemID, itemInfo);
  };

  const onRemoveItem = async (itemID) => {
    updateOrderHandler({
      isSavingItem: true,
    });
    try {
      await SaveChangedItemInfo({
        itemID,
        itemInfo: {},
        shopID,
      });
      removeItem(itemID);
      NotificationToast.success("Xóa sản phẩm thành công");
    } catch (error) {
      NotificationToast.error("Lỗi khi xóa sản phẩm");
    } finally {
      updateOrderHandler({
        isSavingItem: false,
      });
      refetch();
    }
  };

  const onSaveItemAPI = async (itemInfo = {}) => {
    updateOrderHandler({
      isCreatingItem: true,
    });
    if (!itemInfo || Object.keys(itemInfo).length === 0) {
      NotificationToast.error("Thông tin sản phẩm không được để trống");
      return false;
    }
    const { itemID = "" } = itemInfo || {};
    const params = { itemID, itemInfo, shopID };
    try {
      await SaveChangedItemInfo(params);
      updateOrderHandler({
        isSavingItem: false,
      });
      NotificationToast.error("Lỗi khi lưu sản phẩm");
      return true;
    } catch (error) {
      NotificationToast.error("Lỗi khi lưu sản phẩm");
      return false;
    } finally {
      updateOrderHandler({
        isCreatingItem: false,
      });
      refetch();
    }
  };
  const onCreateNewItemAPI = async (itemInfo) => {
    updateOrderHandler({
      isCreatingItem: true,
    });
    const res = await CreateNewItem({
      itemInfo,
      shopID,
    });
    if (res.newItemID && res.sanitizedItemInfo) {
      onUpdateAllItems({
        itemID: res.newItemID,
        itemInfo: res.sanitizedItemInfo,
      });
      updateOrderHandler({
        isCreatingItem: false,
      });
      refetch();
      return true;
    }
    NotificationToast.error("Lỗi khi tạo sản phẩm");
    return false;
  };

  const onSubmitItemInfo = async (itemInfo) => {
    const sanitizedItemInfo = {
      ...itemInfo,
      itemImages: itemInfo.itemImages || { full: { imageUrl: "" } },
      modifierGroups: itemInfo.modifierGroups || [],
    };
    const res = await (showEditModal
      ? onSaveItemAPI({
          ...sanitizedItemInfo,
        })
      : onCreateNewItemAPI({
          ...sanitizedItemInfo,
        }));
    try {
      if (res) {
        NotificationToast.success(
          `${showEditModal ? "Lưu" : "Tạo"} ${itemInfo.itemName}`
        );
        setShowEditModal(false);
        updateItem(itemInfo.itemID, itemInfo);
        onUpdateAllItems({ itemID: itemInfo.itemID, itemInfo });
        updateOrderHandler({
          isSavingItem: false,
        });
      } else {
        NotificationToast.error("Lỗi khi lưu sản phẩm");
      }
    } catch (error) {
      NotificationToast.error("Lỗi khi lưu sản phẩm");
    } finally {
      refetch();
      updateOrderHandler({
        isSavingItem: false,
      });
    }
  };

  const onEditItem = (item) => {
    setEditItem(item);
    setShowEditModal(true);
  };

  const closePanelAction = () => {
    if (showPanel) {
      setShowPanel(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogVisible(false);
  };

  const handleUpgrade = () => {
    navigation.navigate("ServicePackages");
    handleCloseDialog();
  };

  const handleContact = () => {
    Linking.openURL("tel:+84977140536");
    handleCloseDialog();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissAllActions}>
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        {/* <LoadingDialog
          isVisible={
             orderHandler?.isSavingItem ||
    orderHandler?.isSendingOrderToShop ||
    orderHandler?.isCreatingItem
          }
        /> */}
        <UpgradeDialog
          visible={isDialogVisible}
          onClose={handleCloseDialog}
          onUpgrade={handleUpgrade}
          onContact={handleContact}
        />
        <CartModals
          editItem={editItem}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          setShowAddModal={setShowAddModal}
          setIsCartChanged={setIsCartChanged}
          handleCloseEditModal={() => {
            updateItem(editItem.itemID, editItem);
            setShowEditModal(false);
          }}
          onSubmitItemInfo={onSubmitItemInfo}
          handleRemoveItem={removeItem}
          showAddModal={showAddModal}
          addItem={addItem}
          isCartChanged={isCartChanged}
          clearCart={clearCart}
          navigation={navigation}
          orderHandler={orderHandler}
        />
        <CartHeader
          bill={bill}
          onClose={checkCartChanged}
          onSave={handleSubmitOrder}
          isSaving={orderHandler.isSendingOrderToShop}
        />
        <CartList
          cart={cart}
          bill={bill}
          total={total}
          onEditItem={onEditItem}
          onAddNew={() => setShowPanel(true)}
        />
        {!bill.isPaid && <CartTotal total={total} />}
        {!bill.isPaid && (
          <CartInputBar
            onSubmitRemoveItem={onRemoveItem}
            onSubmitItemInfo={onSubmitItemInfo}
            input={input}
            setInput={setInput}
            showPanel={showPanel}
            setShowPanel={setShowPanel}
            menus={menus}
            addItem={addItem}
            onAddNew={() => setShowAddModal(true)}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AIPOS;
