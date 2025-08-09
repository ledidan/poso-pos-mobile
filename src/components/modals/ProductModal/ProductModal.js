import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import InputField from "../../ui/InputField";
import NumberField from "../../ui/NumberField";
import { Dialog, Portal } from "react-native-paper";
const ProductModal = ({
  isVisible,
  onClose,
  onSubmit,
  initialData = null,
  addItem,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (initialData) {
      setName(initialData.itemName || "");
      setPrice(initialData.itemPrice || 0);
    } else {
      setName("");
      setPrice(0);
    }
  }, [initialData, isVisible]);

  const handleSave = () => {
    if (!name || !price) return;
    const product = {
      ...(initialData || {}),
      itemName: name,
      itemPrice: parseFloat(price),
    };
    onSubmit(product);
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setPrice(0);
    onClose();
  };

  const isEdit = !!initialData;

  const handleSetPrice = (price) => {
    setPrice(price);
  };
  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={handleClose}
        style={{
          padding: 0,
          backgroundColor: "none",
          maxHeight: "100%",
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
          </Text>

          <InputField
            containerStyle={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            inputStyle={{ width: "70%" }}
            label="Tên sản phẩm"
            placeholder="Nhập tên..."
            value={name}
            onChangeText={setName}
          />
          <NumberField
            label="Giá bán"
            type="price"
            value={price}
            onValueChange={handleSetPrice}
            step={5000}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
              <Text style={styles.cancelText}>Huỷ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveBtn, !(name && price) && { opacity: 0.5 }]}
              onPress={handleSave}
              disabled={!(name && price)}
            >
              <Text style={styles.btnText}>{isEdit ? "Cập nhật" : "Lưu"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>
    </Portal>
  );
};

export default ProductModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    // marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
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
    width: "50%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#eee",
    // marginRight: 12,
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
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
});
