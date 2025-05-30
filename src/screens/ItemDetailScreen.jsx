import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
import { colors } from '../global/colors';
import { addToCart } from '../features/cartSlice';

export default function ItemDetailScreen() {
    const { product } = useRoute().params;
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);

    const handleAddToCart = () => {
        const alreadyInCart = cartItems.some(item => item.id === product.id);
        if (alreadyInCart) {
            Alert.alert(
                'Ya en el carrito',
                `${product.name} ya fue agregado anteriormente.`,
                [{ text: 'OK' }],
                { cancelable: true }
            );
        } else {
            dispatch(addToCart(product));
            Alert.alert(
                'Producto agregado',
                `${product.name} fue agregado al carrito.`,
                [{ text: 'OK' }],
                { cancelable: true }
            );
        }
    };

    return (
        <View style={styles.screenContainer}>
            <NavBar />
            <ScrollView style={styles.container}>
                <Image source={{ uri: product.img }} style={styles.image} />
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.meta}>Nación: {product.nacion}</Text>
                <Text style={styles.meta}>Vehículo: {product.vehiculo}</Text>
                <Text style={styles.meta}>Tier: {product.tier}</Text>
                <Text style={styles.price}>Precio: ${product.price}</Text>
                <Button
                    title="Agregar al carrito"
                    onPress={handleAddToCart}
                    color={colors.success}
                />
                <Text style={styles.detail}>{product.detail}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        padding: 15,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        resizeMode: 'cover',
        marginBottom: 15,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    price: {
        fontSize: 18,
        color: colors.success,
        marginBottom: 10,
    },
    meta: {
        fontSize: 14,
        color: '#ccc',
        marginBottom: 4,
    },
    detail: {
        fontSize: 16,
        color: 'white',
        marginTop: 15,
        lineHeight: 22,
        marginBottom: 70,
    },
});