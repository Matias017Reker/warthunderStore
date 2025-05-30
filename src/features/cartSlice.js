import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const exists = state.cartItems.find(item => item.id === action.payload.id);
            if (!exists) {
                state.cartItems.push(action.payload);
            }
        },
    removeFromCart(state, action) {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
        state.cartItems = [];
    },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;