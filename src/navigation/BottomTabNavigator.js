import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import MoreScreen from "../screens/MoreScreen";
import QrScreen from "../screens/QrScreen";
import AIScreen from "../screens/AIScreen";
import CustomTabIcon from "../components/AIPOS/CustomTabIcon";
import BillScreen from "../screens/BillScreen";

const Tab = createBottomTabNavigator();
const EmptyScreen = () => null;

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 110,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          paddingTop: 10,
          fontWeight: "500",
        },
        headerShown: false,
        tabBarActiveTintColor: "#ff800a",
        tabBarInactiveTintColor: "#505e70",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Tổng quan",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="bar-chart-outline"
              size={size}
              color={focused ? "#ff800a" : "#505e70"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="QR"
        component={QrScreen}
        options={{
          tabBarLabel: "Thanh toán QR",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="qr-code-outline"
              size={size}
              color={focused ? "#ff800a" : "#505e70"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AI"
        component={AIScreen}
        options={{
          tabBarLabel: "Tính tiền",
          tabBarIcon: ({ color, size, focused }) => (
            <CustomTabIcon
              color={focused ? "#ff800a" : "#505e70"}
              size={size}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("AIScreen");
          },
        })}
      />

      <Tab.Screen
        name="Bill"
        component={BillScreen}
        options={{
          tabBarLabel: "Hoá đơn",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="document-text-outline"
              size={size}
              color={focused ? "#ff800a" : "#505e70"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: "Nhiều hơn",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="menu-outline"
              size={size}
              color={focused ? "#ff800a" : "#505e70"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
