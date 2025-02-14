// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { BASE_URL } from '../components/constants/baseurl';

// export const apiSlice = createApi({
//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }), // عنوان الباك اند
//     tagTypes: ['Clients'], // تعريف العلامة
//     endpoints: (builder) => ({
//         getAllClients: builder.query({
//             query: () => '/clients/', // Endpoint لجلب الـ clients
//             providesTags: ['Clients'], // ربط البيانات بالعلامة
//         }),
//         getAllUsers: builder.query({
//             query: () => '/users/', // Endpoint لجلب الـ users
//         }),
//         getNewLeads: builder.query({
//             query: () => '/clients?status=New Lead', // Endpoint لجلب العملاء بحالة "new leads"
//         }),
//     }),
// });

// // Export الـ hooks لكل endpoint
// export const { useGetAllClientsQuery, useGetAllUsersQuery, useGetNewLeadsQuery } = apiSlice;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../components/constants/baseurl';

export const apiSlice = createApi({
    reducerPath: 'api',
    // baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),

    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api`,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem("token") // جلب التوكن من حالة Redux
            if (token) {
                headers.set('Authorization', `Bearer ${token}`); // إرسال التوكن
            }
            return headers;
        },
    }),
    tagTypes: ['Clients'], // تعريف العلامة
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => '/users/', // Endpoint لجلب الـ users
        }),
        getNewLeads: builder.query({
            query: () => '/clients?status=New Lead', // Endpoint لجلب العملاء بحالة "new leads"
        }),
        getAllClients: builder.query({
            query: () => '/clients/',
            providesTags: ['Clients'], // ربط البيانات بالعلامة
        }),
        createClient: builder.mutation({
            query: (newClient) => ({
                url: '/clients/',
                method: 'POST',
                body: newClient,
            }),
            invalidatesTags: ['Clients'], // تحديث البيانات بعد الإضافة
        }),
        assignClientToSeller: builder.mutation({
            query: ({ clientId, sellerId }) => ({
                url: `/clients/${clientId}/assign`,
                method: 'PUT',
                body: { assignedTo: sellerId },
            }),
            invalidatesTags: ['Clients'], // تحديث البيانات بعد التعيين
        }),
        addFeedbackToClient: builder.mutation({
            query: ({ clientId, feedback }) => ({
                url: `/clients/${clientId}/feedback`,
                method: 'PUT',
                body: { feedback },
            }),
            invalidatesTags: ['Clients'], // تحديث البيانات بعد إضافة الفيدباك
        }),
        updateClient: builder.mutation({
            query: ({ id, updates }) => ({
                url: `/clients/${id}`,
                method: 'PUT',
                body: updates,
            }),
            invalidatesTags: ['Clients'], // تحديث البيانات بعد التعديل
        }),
        deleteClient: builder.mutation({
            query: (id) => ({
                url: `/clients/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Clients'], // تحديث البيانات بعد الحذف
        }),
    }),
});

// Export الـ hooks لكل endpoint
export const {
    useGetAllClientsQuery,
    useCreateClientMutation,
    useAssignClientToSellerMutation,
    useAddFeedbackToClientMutation,
    useUpdateClientMutation,
    useDeleteClientMutation,
    useGetAllUsersQuery,
    useGetNewLeadsQuery
} = apiSlice;
