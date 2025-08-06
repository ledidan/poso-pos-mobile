import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import { ThemeProvider, createTheme } from "@rneui/themed";
import * as ScreenOrientation from "expo-screen-orientation";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/utils/toastConfig";
import { useAuth } from "./src/context/AuthContext";
import LoadingDialog from "./src/components/modals/LoadingDialog";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { MenuProvider } from "react-native-popup-menu";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function App() {
  // const { userToken, isLoading } = useAuth();
  const theme = createTheme({
    lightColors: {
      primary: "#e7e7e8",
    },
    darkColors: {
      primary: "#000",
    },
    mode: "light",
  });

  const lockOrientation = async () => {
    // // Khoá dọc
    // await ScreenOrientation.lockAsync(
    //   ScreenOrientation.OrientationLock.PORTRAIT
    // );
    // // Khoá ngang
    // await ScreenOrientation.lockAsync(
    //   ScreenOrientation.OrientationLock.LANDSCAPE
    // );
    // Cho xoay auto
    await ScreenOrientation.unlockAsync();
  };
  useEffect(() => {
    lockOrientation();
  }, []);

  // if (isLoading) {
  //   return <LoadingDialog isVisible={true} />;
  // }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <MenuProvider>{<StackNavigator />}</MenuProvider>
            <Toast config={toastConfig} />
            {/* {userToken ? <StackNavigator /> : <AuthNavigator />} */}
          </NavigationContainer>
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
