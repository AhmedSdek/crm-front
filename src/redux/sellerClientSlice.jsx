import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../components/constants/baseurl';
// جلب العملاء الخاصين ببائع معين
export const fetchClientsForSeller = createAsyncThunk(
    'sellerClients/fetchClientsForSeller',
    async (sellerId, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/clients/${sellerId}`);
            // console.log(response.data)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || error.message);
        }
    }
);

// Slice
const sellerClientSlice = createSlice({
    name: 'sellerClients',
    initialState: {
        clients: [],
        loading: false,
        error: null,
    },
    reducers: {
        // يمكن إضافة أي أكشنات إضافية إذا لزم الأمر
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClientsForSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClientsForSeller.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload;
            })
            .addCase(fetchClientsForSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default sellerClientSlice.reducer;