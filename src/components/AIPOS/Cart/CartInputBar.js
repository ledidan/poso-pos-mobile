import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import InputBar from "../InputBar";
import ProductPanel from "../ProductPanel";

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
}) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ backgroundColor: "#fff" }}
    keyboardVerticalOffset={Platform.OS === "ios" ? -10 : -100}
  >
    <InputBar
      value={input}
      onChange={setInput}
      onTogglePanel={setShowPanel}
      onSend={() => console.log("Send:", input)}
      isPanelOpen={showPanel}
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

export default CartInputBar;
