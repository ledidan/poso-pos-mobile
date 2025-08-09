import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";

const successColor = "#009048";
const errorColor = "#eb2504";
const infoColor = "#007AFF";
export const toastConfig = {
  /*
    Ghi đè component 'success'. 
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: successColor,
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
      }}
      contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: successColor,
      }}
      text2Style={{
        fontSize: 14,
      }}
      renderLeadingIcon={() => (
        <Ionicons
          name="checkmark-circle"
          size={25}
          color={successColor}
          style={{ marginLeft: 15 }}
        />
      )}
    />
  ),

  /*
    Ghi đè component 'error'.
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: errorColor,
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 14,
      }}
      renderLeadingIcon={() => (
        <Ionicons
          name="alert-circle"
          size={25}
          color={errorColor}
          style={{ marginLeft: 15 }}
        />
      )}
    />
  ),
  info: (props) => (
    <InfoToast
      {...props}
      style={{
        borderLeftColor: infoColor,
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
      }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 12,
        fontWeight: "bold",
        color: infoColor,
      }}
      text2Style={{
        fontSize: 12,
        color: infoColor,
      }}
      renderLeadingIcon={() => (
        <Ionicons
          name="information-circle"
          size={25}
          color={infoColor}
          style={{ marginLeft: 10 }}
        />
      )}
    />
  ),
};
