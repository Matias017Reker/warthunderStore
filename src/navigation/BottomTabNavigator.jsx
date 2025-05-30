import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import AccountScreen from "../screens/AccountScreen";
import MarketStackNavigator from "./MarketStack";
import { Ionicons } from "@expo/vector-icons";
import MyAccountNavigator from './MyAccountNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
            backgroundColor: "#111",
            borderTopColor: "#333",
            height: 100,
            paddingBottom: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
            case "Home":
                iconName = focused ? "home" : "home-outline";
                break;
            case "Market":
                iconName = focused ? "pricetags" : "pricetags-outline";
                break;
            case "Cart":
                iconName = focused ? "cart" : "cart-outline";
                break;
            case "Mi Cuenta":
                iconName = focused ? "person" : "person-outline";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
        },
        })}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Market" component={MarketStackNavigator} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Mi Cuenta" component={MyAccountNavigator} />
    </Tab.Navigator>
    );
};

export default BottomTabNavigator;