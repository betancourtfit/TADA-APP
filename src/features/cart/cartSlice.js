import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: {
            cartItems: [],
            user: null,
            total: 0,
            updatedAt: Date.now().toLocaleString()
        }
    },
    reducers: {
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload];
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },
    },
});