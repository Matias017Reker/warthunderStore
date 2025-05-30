import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cartSlice';
import authReducer from "../features/user/userSlice"
import { shopApi } from "../services/shopServices";
import { authApi } from "../services/authServices";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(shopApi.middleware)
    .concat(authApi.middleware)
})

export default store;