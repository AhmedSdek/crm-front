// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { BASE_URL } from '../components/constants/baseurl';

// // جلب جميع العملاء
// export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
//     const response = await axios.get(`${BASE_URL}/api/clients`);
//     return response.data;
// });

// // إنشاء عميل جديد باستخدام createAsyncThunk
// export const createClient = createAsyncThunk('clients/createClient', async (newClient) => {
//     const response = await axios.post(`${BASE_URL}/api/clients`, newClient);
//     return response.data;
// });

// // تعيين العميل لبائع باستخدام createAsyncThunk
// export const assignClientToSeller = createAsyncThunk(
//     'clients/assignClientToSeller',
//     async ({ clientId, sellerId }) => {
//         const response = await axios.put(`${BASE_URL}/api/clients/${clientId}/assign`, { assignedTo: sellerId });
//         return response.data;
//     }
// );

// // إضافة فيدباك للعميل باستخدام createAsyncThunk
// export const addFeedbackToClient = createAsyncThunk(
//     'clients/addFeedbackToClient',
//     async ({ clientId, feedback }) => {
//         const response = await axios.put(`${BASE_URL}/api/clients/${clientId}/feedback`, { feedback });
//         return response.data;
//     }
// );

// // تحديث عميل باستخدام createAsyncThunk
// export const updateClient = createAsyncThunk('clients/updateClient', async ({ id, updates }) => {
//     const response = await axios.put(`${BASE_URL}/api/clients/${id}`, updates);
//     return response.data;
// });

// // حذف عميل باستخدام createAsyncThunk
// export const deleteClient = createAsyncThunk('clients/deleteClient', async (id) => {
//     await axios.delete(`${BASE_URL}/api/clients/${id}`);
//     return id;
// });

// // Slice
// const clientSlice = createSlice({
//     name: 'clients',
//     initialState: {
//         clients: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchClients.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchClients.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.clients = action.payload;
//             })
//             .addCase(fetchClients.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(createClient.fulfilled, (state, action) => {
//                 state.clients.push(action.payload);
//             })
//             .addCase(assignClientToSeller.fulfilled, (state, action) => {
//                 const index = state.clients.findIndex((c) => c._id === action.payload._id);
//                 if (index !== -1) {
//                     state.clients[index] = action.payload;
//                 }
//             })
//             .addCase(addFeedbackToClient.fulfilled, (state, action) => {
//                 const index = state.clients.findIndex((c) => c._id === action.payload._id);
//                 if (index !== -1) {
//                     state.clients[index] = action.payload;
//                 }
//             })
//             .addCase(updateClient.fulfilled, (state, action) => {
//                 const index = state.clients.findIndex((c) => c._id === action.payload._id);
//                 if (index !== -1) {
//                     state.clients[index] = action.payload;
//                 }
//             })
//             .addCase(deleteClient.fulfilled, (state, action) => {
//                 state.clients = state.clients.filter((c) => c._id !== action.payload);
//             });
//     },
// });

// export default clientSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../components/constants/baseurl';

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    const response = await axios.get(`${BASE_URL}/api/clients`);
    return response.data;
});

const clientSlice = createSlice({
    name: 'clients',
    initialState: {
        clients: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload;
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default clientSlice.reducer;
