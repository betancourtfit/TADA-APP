import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";
import { shopApi } from "../services/shopService";
import  cartReducer  from "../features/cart/cartSlice";
import { orderApi } from "../services/orderService";
import { authApi } from "../services/authService";
import authReducer from "../features/auth/authSlice";
import { userApi } from "../services/userService";

export default configureStore({
    reducer: {
        shop: shopReducer,
        cart: cartReducer,
        auth: authReducer,
        [userApi.reducerPath]: userApi.reducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware, orderApi.middleware, authApi.middleware, userApi.middleware),
    });




