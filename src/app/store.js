import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";
import { shopApi } from "../services/shopService";

export default configureStore({
    reducer: {
        shop: shopReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware),
    });




