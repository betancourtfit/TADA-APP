// orderService.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            async queryFn(order, queryApi, extraOptions, baseQuery) {
                // Obtener las órdenes existentes
                const { data: orders } = await baseQuery('orders.json');
                let newId = 1;

                if (orders) {
                    // Obtener el último ID y calcular el nuevo ID
                    const ids = Object.keys(orders).map(key => {
                        const order = orders[key];
                        return order.id ? parseInt(order.id, 10) : 0;
                    });
                    newId = Math.max(...ids) + 1;
                }

                // Asignar el nuevo ID a la orden
                order.id = newId;

                // Enviar la nueva orden con el ID asignado
                const result = await baseQuery({
                    url: 'orders.json',
                    method: 'POST',
                    body: order,
                });

                return result;
            },
        }),
        getOrders: builder.query({
            query: () => 'orders.json',
            transformResponse: (response) => {
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