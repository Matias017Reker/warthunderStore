import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountScreen from '../screens/AccountScreen';
import ImageSelectorScreen from '../screens/ImageSelectorScreen';

const Stack = createNativeStackNavigator();

const MyAccountNavigator = () => {
  return (
    <Stack.Navigator
    initialRouteName='My Account'
    screenOptions={{
        headerShown: false,
        contentStyle: {
            backgroundColor: colors.background,
        }
    }}
    >
    <Stack.Screen name="My Account" component={AccountScreen} />
    <Stack.Screen name="Image Selector" component={ImageSelectorScreen} />
    </Stack.Navigator>
  )
}

export default MyAccountNavigator

const styles = StyleSheet.create({})