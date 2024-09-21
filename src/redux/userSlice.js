import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null; // Clear previous errors
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.isAuthenticated = true;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload; // Set error message
            state.isAuthenticated = false; // Ensure isAuthenticated is false on failure
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null; // Clear any errors
            state.isAuthenticated = false; // Set to false on logout
        },
        subscription: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex(
                        (id) => id === action.payload
                    ),
                    1
                );
            } else {
                state.currentUser.subscribedUsers.push(action.payload);
            }
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } = userSlice.actions;

export default userSlice.reducer;
