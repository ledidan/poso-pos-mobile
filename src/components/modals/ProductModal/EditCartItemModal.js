import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import InputField from "../../ui/InputField";
import { Dialog } from "@rneui/base";
import NumberField from "../../ui/NumberField";
import { Ionicons } from "@expo/vector-icons";
import DismissKeyboard from "../DismissKeyboard";

const EditCartItemModal = ({
  isVisible,
  onClose,
  onSubmit,
  initialData = {},
  removeItem,
}) => {
  const [itemData, setItemData] = useState(initialData || {});


  useEffect(() => {
    setItemData(initialData);
  }, [initialData]);

  const handleSave = () => {
    onSubmit(itemData);
    handleClose();
  };

  const handleChange = (field, value) => {
    setItemData((prev) => ({ ...prev, [field]: value }));
  };
  const handleClose = () => {
    onClose();
  };

  const isEdit = !!initialData;


  const handleRemoveItem = (id) => {
    removeItem(id);
    handleClose();
  };
  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={handleClose}
      overlayStyle={{
        padding: 0,
        width: "100%",
        backgroundColor: "none",
        maxHeight: "100%",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>
                {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                style={{
                  padding: 10,
                  backgroundColor: "#eee",
                  borderRadius: 10,
                }}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <InputField
              containerStyle={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              inputStyle={{ width: "70%" }}
              label="Tên sản phẩm"
              placeholder="Nhập tên..."
              value={itemData?.itemName}
              onChangeText={(value) => handleChange("itemName", value)}
            />
            <NumberField
              label="Số lượng"
              value={itemData?.quantity}
              onValueChange={(value) => {
                handleChange("quantity", value);
              }}
              type="number"
              step={1}
            />
            <NumberField
              label="Giá bán"
              value={itemData?.itemPrice}
              onValueChange={(value) => {
                handleChange("itemPrice", value);
              }}
              type="price"
              step={5000}
            />
            <InputField
              containerStyle={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              inputStyle={{ width: "100%" }}
              // label="Ghi chú"
              placeholder="Nhập ghi chú..."
              value={itemData?.itemNote}
              onChangeText={(value) => handleChange("itemNote", value)}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => handleRemoveItem(itemData.itemID)}
              >
                <Ionicons name="trash" size={24} color="#eb1600" />
                <Text style={styles.cancelText}>Xoá</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.saveBtn,
                  !itemData?.quantity && { opacity: 0.5 },
                ]}
                onPress={handleSave}
                disabled={!itemData?.quantity}
              >
                <Text style={styles.btnText}>
                  {isEdit ? "Cập nhật" : "Lưu"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Dialog>
  );
};

export default EditCartItemModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "left",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
    width: "100%",
    marginTop: 24,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  cancelBtn: {
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    gap: 5,
    width: "50%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  saveBtn: {
    width: "50%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  cancelText: {
    color: "#eb1600",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});
