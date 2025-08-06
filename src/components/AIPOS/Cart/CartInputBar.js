import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import InputBar from "../InputBar";
import ProductPanel from "../ProductPanel";
import { useDismissAction } from "../../../context/DismissActionContext";

const CartInputBar = ({
  input,
  setInput,
  showPanel,
  setShowPanel,
  menus,
  addItem,
  onAddNew,
  onSubmitRemoveItem,
  onSubmitItemInfo,
}) => {
  const { dismissAllActions } = useDismissAction();

  const handleTogglePanel = (newValue) => {
    if (!newValue) {
      dismissAllActions();
    } else {
      setShowPanel(newValue);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor: "#fff" }}
      keyboardVerticalOffset={Platform.OS === "ios" ? -10 : -100}
    >
      <InputBar
        value={input}
        onChange={setInput}
        onTogglePanel={handleTogglePanel}
        onSend={addItem}
        isPanelOpen={showPanel}
        menus={menus}
      />
      <ProductPanel
        onSubmitRemoveItem={onSubmitRemoveItem}
        visible={showPanel}
        menus={menus}
        onAddChip={addItem}
        onAddNew={onAddNew}
      />
    </KeyboardAvoidingView>
  );
};

export default CartInputBar;
