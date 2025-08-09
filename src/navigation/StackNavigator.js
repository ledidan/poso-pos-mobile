import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import AIScreen from "../screens/AIScreen";
import UserInformation from "../components/UserInformation";
import BillScreen from "../screens/BillScreen";
import ServicePackages from "../components/More/Screen/ServicePackages";
import BankSetup from "../components/ui/BankSetup";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainTabNavigator">
      <Stack.Screen
        name="MainTabNavigator"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AIScreen"
        component={AIScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Bill"
        component={BillScreen}
        options={{ headerShown: false, navigationBarHidden: false }}
      />
      <Stack.Screen
        name="UserInformation"
        component={UserInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServicePackages"
        component={ServicePackages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BankSetup"
        component={BankSetup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
