// orderService.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url } from '../firebase/database';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: 'orders.json',
                method: 'POST',
                body: order,
            }),
        }),
        getOrders: builder.query({
            query: () => 'orders.json',
            transformResponse: (response) => {
                // Convertir el objeto en un array para facilitar el manejo
                if (!response) {
                    return [];
                }
                return Object.keys(response).map((key) => ({
                    id: key,
                    ...response[key],
                }));
            },
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrdersQuery, 
} = orderApi;