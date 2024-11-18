import { createSlice } from "@reduxjs/toolkit";
import { calculate_total_price } from "../../utils/functions";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: {
            cartItems: [],
            user: "demo",
            total: 0,
            updatedAt: Date.now().toLocaleString()
        }
    },
    reducers: {
        addToCart: (state, action) => {
            const productExist = state.value.cartItems.find((item) => item.id === action.payload.id);
            if (productExist) {
                productExist.quantity += 1;
            } else {
                state.value.cartItems.push(action.payload);
            }
            // Calcular el precio total
            state.value.total = calculate_total_price(state.value.cartItems);
            state.value.updatedAt = new Date().toLocaleString();
        },
        removeFromCart: (state, action) => {
            state.value.cartItems = state.value.cartItems.filter((item) => item.id !== action.payload.id);
            // Calcular el precio total
            state.value.total = calculate_total_price(state.value.cartItems);
            state.value.updatedAt = new Date().toLocaleString();

        },
        cleanCart: (state) => {
            state.value.cartItems = [];
            state.value.total = 0;
            state.value.updatedAt = new Date().toLocaleString();
        },
    }
});

export const { addToCart, removeFromCart, cleanCart } = cartSlice.actions;

export default cartSlice.reducer;