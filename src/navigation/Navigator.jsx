import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import MainStackNavigator from "./MainStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

const Navigator = () => {
    const user = useSelector((state) => state.auth.value.user);

    return (
    <NavigationContainer>
        {user ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
    );
};

export default Navigator;