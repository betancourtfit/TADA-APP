import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({

    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_AUTH_URL }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => {
                return {
                    url: `accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
                    method: "POST",
                    body: {
                        email: credentials.email,
                        password: credentials.password,
                        returnSecureToken: true,
                    },
                };
            },
        }),
        signup: builder.mutation({
            query: (credentials) => {
                return {
                    url: `accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
                    method: "POST",
                    body: {
                        email: credentials.email,
                        password: credentials.password,
                        returnSecureToken: true,
                        name: credentials.name,
                        lastName: credentials.lastName,
                        idNumber: credentials.idNumber,
                        phone: credentials.phone, 
                    },
                };
            },
        }),
        signupAnonymous: builder.mutation({
            query: () => {
                return {
                    url: `accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
                    method: "POST",
                    body: {
                        returnSecureToken: true,
                    },
                };
            },
        }),
    }),
});

export const { 
    useLoginMutation, 
    useSignupMutation,
    useSignupAnonymousMutation 
} = authApi;