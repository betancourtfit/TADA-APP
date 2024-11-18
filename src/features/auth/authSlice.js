import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        isAuth: false,
        localId: null,
        image: null,
    },
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.email;
            state.token = action.payload.idToken;
            state.isAuth = true;
            state.localId = action.payload.localId;
            state.image = action.payload.image;
        },
        setLogout: (state) => {
            state.user = null;
            state.isAuth = false;
        },
        setImage: (state, action) => {
            state.image = action.payload
        }
    },
});

export const { 
    setLogin, 
    setLogout,
    setImage
} = authSlice.actions;

export default authSlice.reducer;