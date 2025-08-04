import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import AIScreen from "../screens/AIScreen";
import UserInformation from "../components/UserInformation";
import BillScreen from "../screens/BillScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AIScreen"
        component={AIScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BillScreen"
        component={BillScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserInformation"
        component={UserInformation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
