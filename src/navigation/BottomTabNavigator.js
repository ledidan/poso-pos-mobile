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
          color: "#505e70",
          paddingTop: 10,
          fontWeight: "500",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Tổng quan",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="QR"
        component={QrScreen}
        options={{
          tabBarLabel: "Thanh toán QR",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="qr-code-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="AI"
        component={AIScreen}
        options={{
          tabBarLabel: "Tính tiền AI",
          tabBarIcon: () => <CustomTabIcon />,
        }}
      />

      <Tab.Screen 
        name="Bill"
        component={BillScreen}
        options={{
          tabBarLabel: "Hoá đơn",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: "Nhiều hơn",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
