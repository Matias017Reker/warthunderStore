import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "./Card";

const Categories = ({category}) => {
    return (
        <Card>
            <Text style= {styles.text}>{category}</Text>
        </Card>
    )
}

export default Categories

const styles = StyleSheet.create({
    text: {
        
    }
})