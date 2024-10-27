import { createSlice } from '@reduxjs/toolkit';
import categories from '../../Data/categories';
import products from '../../Data/products';

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
        categories: categories,
        products: products,
        categorySelected:""
        }
    },
    reducers: {
        setCategory: (state, action) => {
            state.value.categorySelected = action.payload;
        }
    },

});

export const { setCategory } = shopSlice.actions;

export default shopSlice.reducer;