import React from "react";
import LoadingDialog from "../../modals/LoadingDialog";
import ConfirmDialog from "../../modals/ConfirmDialog";
import ProductModal from "../../modals/ProductModal/ProductModal";
import EditCartItemModal from "../../modals/ProductModal/EditCartItemModal";

const CartModals = ({
  editItem,
  showEditModal,
  setShowEditModal,
  onSubmitItemInfo,
  handleCloseEditModal,
  handleRemoveItem,
  showAddModal,
  setShowAddModal,
  addItem,
  isCartChanged,
  setIsCartChanged,
  clearCart,
  navigation,
  orderHandler,
}) => (
  <>
    {orderHandler.isSendingOrderToShop && (
      <LoadingDialog isVisible={orderHandler.isSendingOrderToShop} />
    )}
    <ConfirmDialog
      isVisible={isCartChanged}
      onClose={() => setIsCartChanged(false)}
      onConfirm={() => {
        clearCart();
        navigation.goBack();
      }}
      title="Đơn hàng chưa được lưu"
      message="Bạn có chắc chắn muốn thoát không? Đơn hàng sẽ không được lưu."
      confirmText="Thoát"
      cancelText="Ở lại"
    />
    <EditCartItemModal
      isVisible={showEditModal}
      onClose={handleCloseEditModal}
      onSubmit={onSubmitItemInfo}
      removeItem={handleRemoveItem}
      initialData={editItem}
    />
    <ProductModal
      isVisible={showAddModal}
      onClose={() => setShowAddModal(false)}
      onSubmit={onSubmitItemInfo}
      addItem={addItem}
    />
  </>
);

export default CartModals;
