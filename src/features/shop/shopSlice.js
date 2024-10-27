import { createSlice } from '@reduxjs/toolkit';
import categories from '../../Data/categories';
import products from '../../Data/products';

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
        categories: categories,
        products: products,
        categorySelected:null,
        productSelected: null
        }
    },
    reducers: {
        setCategory: (state, action) => {
            state.value.categorySelected = action.payload;
        },
        setProduct: (state, action) => {
            state.value.productSelected = action.payload;
        }
    },

});

export const { setCategory, setProduct } = shopSlice.actions;

export default shopSlice.reducer;