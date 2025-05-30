import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../global/colors';

export default function NavBar() {
    return (
    <View style={styles.navbar}>
        <Text style={styles.logoText}>WarThunder Store</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
    height: 70,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    },
    logoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    },
});