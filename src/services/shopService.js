import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'products.json',
        }),
        getCategories: builder.query({
            query: () => 'categories.json',
            transformResponse: (response) => {
                if (!response) {
                    return [];
                }

                const getValues = (obj) => Object.keys(obj).map(key => obj[key]);
                return getValues(response);
            }
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
        getProductById: builder.query({
            query: (id) => `products.json?orderBy="id"&equalTo=${id}`,
            // transformar object a array
            transformResponse: (response) => {
                if (!response) {
                    return [];
                }

                const getValues = (obj) => Object.keys(obj).map(key => obj[key]);
                return getValues(response);
            }
        }),
    })
});

export const {
    useGetProductsQuery,
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
    useGetProductByIdQuery, 
} = shopApi;