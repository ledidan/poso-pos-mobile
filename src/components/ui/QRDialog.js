import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Portal, Dialog, Button, Text, Title } from "react-native-paper";
import { Image } from "expo-image";
/**
 * Hàm tiện ích để định dạng số thành chuỗi tiền tệ Việt Nam.
 * @param {number} number - Số tiền cần định dạng.
 * @returns {string} - Chuỗi đã định dạng (ví dụ: "10.000 ₫").
 */
const formatCurrency = (number) => {
  if (typeof number !== "number") {
    return "0 ₫";
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

/**
 * Component Dialog để hiển thị mã QR thanh toán.
 * @param {object} props
 * @param {boolean} props.visible - Điều khiển hiển thị dialog.
 * @param {() => void} props.onDismiss - Hàm được gọi khi đóng dialog.
 * @param {string} props.qrCodeUrl - URL của hình ảnh mã QR.
 * @param {string} props.recipientName - Tên người nhận (chủ tài khoản).
 * @param {number} props.amount - Số tiền thanh toán.
 */
const QRCodeDialog = ({
  visible,
  onDismiss,
  qrCodeUrl,
  recipientName,
  amount,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title style={styles.title}>{recipientName}</Dialog.Title>

        <Dialog.Content>
          <View style={styles.contentContainer}>
            {qrCodeUrl ? (
              <Image
                source={qrCodeUrl}
                transition={100}
                style={styles.qrImage}
                contentFit="contain"
              />
            ) : (
              <Text>Không thể tạo mã QR.</Text>
            )}

            {/* Hiển thị số tiền */}
            <Text style={styles.amountLabel}>Số tiền thanh toán</Text>
            <Text style={styles.amountText}>{formatCurrency(amount)}</Text>
          </View>
        </Dialog.Content>

        {/* Nút bấm để đóng Dialog */}
        <Dialog.Actions>
          <Button onPress={onDismiss}>Đóng</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  contentContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  qrImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 16,
    color: "#666",
  },
  amountText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
});

export default QRCodeDialog;
