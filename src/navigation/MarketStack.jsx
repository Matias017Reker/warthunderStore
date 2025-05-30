import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MarketScreen from "../screens/MarketScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";

const Stack = createNativeStackNavigator();

const MarketStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MarketMain" component={MarketScreen} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
    </Stack.Navigator>
  );
};

export default MarketStackNavigator;