import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert, TouchableOpacity } from 'react-native';
import NavBar from '../components/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeFromCart } from '../features/cartSlice';
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default function CartScreen() {
    const cartItems = useSelector(state => state.cart.cartItems || []);
    const dispatch = useDispatch();

    const handleClearCart = () => {
        Alert.alert(
        'Confirmar',
        '¿Estás seguro que quieres limpiar el carrito?',
        [
            { text: 'Cancelar', style: 'cancel' },
            {
            text: 'Limpiar',
            style: 'destructive',
            onPress: () => dispatch(clearCart()),
            },
        ],
        { cancelable: true }
        );
    };

const handleRemoveItem = id => {
    Alert.alert(
    'Confirmar',
    '¿Quieres eliminar este producto del carrito?',
    [
        { text: 'Cancelar', style: 'cancel' },
        {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => dispatch(removeFromCart(id)),
        },
    ],
    { cancelable: true }
    );
};

const renderItem = ({ item }) => (
    <View style={styles.item}>
    <Text style={styles.text}>{item.name} {'\u200A'}</Text>
    <View style={styles.rightContainer}>
        <Text style={styles.text}>${item.price} {'\u200A'}</Text>
        <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.trashButton}>
        <Icon name="trash-can-outline" size={24} color={colors.error} />
    </TouchableOpacity>
    </View>
</View>
);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

return (
    <View style={styles.container}>
        <NavBar />
        <View style={styles.content}>
        {cartItems.length > 0 && (
        <Button title="Limpiar carrito" onPress={handleClearCart} color={colors.error} />
    )}

    {cartItems.length === 0 ? (
        <Text style={styles.text}>El carrito está vacío {'\u200A'}</Text>
    ) : (
        <>
        <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ marginTop: 10, paddingBottom: 100 }}
        />
        <Text style={styles.total}>Total: ${totalPrice} {'\u200A'}</Text>
        <View style={styles.buyButtonContainer}>
        <Button title="Comprar" onPress={() => {}} color={colors.success} />
        </View>
        </>
    )}
    </View>
</View>
);
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: colors.background,
},
    content: {
    flex: 1,
    padding: 20,
},
    text: {
    color: 'white',
    fontSize: 18,
},
    item: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
    rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
},
    trashButton: {
    marginLeft: 15,
},
    total: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'right',
},
    buyButtonContainer: {
    marginBottom: 40,
    },
});