import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './clientSlice';
import sellerClientReducer from './sellerClientSlice';
import { apiSlice } from './apiSlice';

const store = configureStore({
    reducer: {
        clients: clientReducer,
        sellerClients: sellerClientReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;