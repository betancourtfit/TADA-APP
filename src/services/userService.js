import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
    endpoints: (builder) => ({
        putProfilePicture: builder.mutation({
            query: ({ image, localId }) => {
                // Verificar si la imagen es null o no es una cadena de texto
                if (image === null || typeof image !== 'string') {
                    console.log('imagen null o no es una cadena de texto');
                    throw new Error('La imagen debe ser una cadena de texto');
                } else {
                }
                return {
                    url: `profilePictures/${localId}.json`,
                    method: "PUT",
                    body: {
                        image
                    },
                };
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                } catch (error) {
                    console.error('Error subiendo imagen', error);
                }
            }
        }),
        getProfilePicture: builder.query({
            query: (localId) => {
                return {
                    url: `profilePictures/${localId}.json`,
                    method: "GET",
                };
            },
        }),
    }),
});

export const {
    usePutProfilePictureMutation,
    useLazyGetProfilePictureQuery,
    useGetProfilePictureQuery
} = userApi;