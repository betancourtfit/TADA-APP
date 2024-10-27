import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url } from '../firebase/database';

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'products.json',
        }),
        getCategories: builder.query({
            query: () => 'categories.json',
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="categoryId"&equalTo=${category}`,
            transformResponse: (response) => {
                // Verificar si el response no es un objeto vacío
                if (!response) {
                    return [];
                }

                // Convertir el objeto en un array
                const getValues = (obj) => Object.keys(obj).map(key => obj[key]);
                return getValues(response);
            }
        }),
    })
});

export const {
    useGetProductsQuery,
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery 
} = shopApi;