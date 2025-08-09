import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import * as ScreenOrientation from "expo-screen-orientation";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/utils/toastConfig";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import LoadingDialog from "./src/components/modals/LoadingDialog";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { MenuProvider } from "react-native-popup-menu";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

function AppContent() {
  const { userToken = "", isLoading } = useAuth() || {};

  if (isLoading) {
    return <LoadingDialog isVisible={true} />;
  }

  return userToken ? <StackNavigator /> : <AuthNavigator />;
}

export default function App() {
  const { isLoading } = useAuth() || {};
  const lockOrientation = async () => {
    await ScreenOrientation.unlockAsync();
  };
  useEffect(() => {
    lockOrientation();
  }, []);

  if (isLoading) {
    return <LoadingDialog isVisible={true} />;
  }
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#000000",
    },
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <AuthProvider>
              <MenuProvider>
                <AppContent />
              </MenuProvider>
              <Toast config={toastConfig} />
            </AuthProvider>
          </NavigationContainer>
        </PaperProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
