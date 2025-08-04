import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCartStore } from "../../lib/stores/cartStore";
import Customers from "../../lib/Services/Customers";
import Merchants from "../../lib/Services/Merchants";
import { _initializeDetailsOfItemInCart } from "../../lib/Functions/OrderFormat";
import NotificationToast from "../../utils/NotificationToast";
import CartList from "./Cart/CartList";
import CartInputBar from "./Cart/CartInputBar";
import CartHeader from "./Cart/CartHeader";
import CartModals from "./Cart/CartModals";
import CartTotal from "./Cart/CartTotal";
import _isEmpty from "lodash.isempty";
import { useDismissAction } from "../../context/DismissActionContext";
import LoadingDialog from "../modals/LoadingDialog";

const AIPOS = ({
  menus = {},
  shopID,
  loading = false,
  error = null,
  refetch = () => {},
}) => {
  // navigation
  const { CreateNewItem, SaveChangedItemInfo } = Merchants.PostRequests;
  const navigation = useNavigation();
  const { bill } = useRoute().params || {};
  const [showPanel, setShowPanel] = useState(false);
  const [initialCart, setInitialCart] = useState([]);
  const [input, setInput] = useState("");
  const {
    items: cart,
    addItem,
    removeItem,
    clearCart,
    updateItem,
    updateCart,
  } = useCartStore();

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editItem, setEditItem] = useState(null);

  const [orderID, setOrderID] = useState(null);

  const [orderHandler, setOrderHandler] = useState({
    submittedOrderDeliveryTypeID: "pickUp",
    isSendingOrderToShop: false,
    isSavingItem: false,
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
  }, []);

  useEffect(() => {
    if (bill && bill.items) {
      setOrderID(bill.orderID);
      updateCart(bill.orderID, bill.items);
      setInitialCart(bill.items);
    }
  }, [bill]);

  const getOrderItemsForOrderDetails = () =>
    cart.map((cartItem) =>
      _initializeDetailsOfItemInCart({
        itemID: cartItem.itemID,
        itemInfo: {
          ...cartItem,
          quantity: cartItem.quantity,
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
      return;
    }

    updateOrderHandler({
      isSendingOrderToShop: false,
    });
    clearCart();
    navigation.navigate("BillScreen", {
      orderID: orderID,
    });
  };

  const onCheckOut = async (orderDetails = {}) => {
    updateOrderHandler({
      isSendingOrderToShop: true,
    });
    onSubmitOrderToShop({
      ...orderDetails,
      status: "active",
    });
  };
  const handleSubmitOrder = async () => {
    if (!cart.length) {
      NotificationToast.error(
        "Thông tin chưa đầy đủ",
        "Vui lòng thêm sản phẩm để đặt hàng"
      );
      return;
    }
    await onCheckOut({
      orderItems: getOrderItemsForOrderDetails(),
      orderDeliveryTypeID: "pickUp",
      paymentMethodDetail: "",
      total: total,
      timeStamp: new Date().toISOString(),
      status: "active",
    });
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
      const { sanitizedItemInfo } = await SaveChangedItemInfo({
        itemID,
        itemInfo: {},
        shopID,
      });
      if (sanitizedItemInfo) {
        onUpdateAllItems({ itemID, itemInfo: sanitizedItemInfo });
        NotificationToast.success("Xóa sản phẩm thành công");
        return true;
      }
    } catch (error) {
      NotificationToast.error("Lỗi khi xóa sản phẩm");
    } finally {
      updateOrderHandler({
        isSavingItem: false,
      });
      refetch();
    }
    return false;
  };

  const onSaveItem = async (itemInfo) => {
      updateOrderHandler({
      isCreatingItem: true,
    });
    const params = { itemID, itemInfo, shopID };
    try {
      const { sanitizedItemInfo } = await SaveChangedItemInfo(params);
      if (sanitizedItemInfo) {
        onUpdateAllItems({ itemInfo: sanitizedItemInfo });
        updateOrderHandler({
          isSavingItem: false,
        });
        return true;
      }
      NotificationToast.error("Lỗi khi lưu sản phẩm");
    } catch (error) {
      NotificationToast.error("Lỗi khi lưu sản phẩm");
    } finally {
      updateOrderHandler({
        isCreatingItem: false,
      });
      refetch();
    }
    return false;
  };

  const onCreateNewItem = async (itemInfo) => {
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
    const res = await (showEditModal
      ? onSaveItem(itemInfo)
      : onCreateNewItem(itemInfo));
    try {
      if (res) {
        NotificationToast.success(
          `${showEditModal ? "Lưu" : "Tạo"} ${itemInfo.itemName}`
        );
        setShowEditModal(false);
        updateOrderHandler({
          isSavingItem: false,
        });
      } else {
        NotificationToast.error("Lỗi khi lưu sản phẩm");
      }
    } catch (error) {
      NotificationToast.error("Lỗi khi lưu sản phẩm");
    } finally {
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

  return (
    <TouchableWithoutFeedback onPress={dismissAllActions}>
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <LoadingDialog
          isVisible={
            orderHandler.isSavingItem || orderHandler.isSendingOrderToShop
          }
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
          onClose={checkCartChanged}
          onSave={handleSubmitOrder}
          isSaving={orderHandler.isSendingOrderToShop}
        />
        <CartList
          cart={cart}
          onEditItem={onEditItem}
          onAddNew={() => setShowPanel(true)}
        />
        <CartTotal total={total} />
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
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AIPOS;
