import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../components/constants/baseurl';
// import { logout } from '../redux/authSlice'; // استيراد الأكشن الخاص بتسجيل الخروج

const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

// دالة `baseQuery` مخصصة لإدارة الأخطاء
const baseQueryWithAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    // console.log(result)

    // في حالة انتهاء صلاحية التوكن، تسجيل خروج المستخدم
    if (result.error && result.error.status === 403) {
        console.error('Token expired, logging out...');

        // إزالة التوكن من localStorage
        // localStorage.removeItem("token");

        localStorage.clear()

        // إعادة التوجيه لصفحة تسجيل الدخول
        window.location.href = '/login'; // يمكنك تعديلها حسب مسار تسجيل الدخول لديك
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuth, // استخدام `baseQueryWithAuth` بدلاً من `baseQuery`
    tagTypes: ['Clients'],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => '/users/',
        }),
        getUserById: builder.query({
            query: (id) => `/users/${id}`,
        }),
        getNewLeads: builder.query({
            query: () => '/clients?status=New Lead',
        }),
        getAllClients: builder.query({
            query: () => '/clients/',
            providesTags: ['Clients'],
        }),
        getClientById: builder.query({
            query: (id) => `/clients/${id}`,
        }),
        createClient: builder.mutation({
            query: (newClient) => ({
                url: '/clients/',
                method: 'POST',
                body: newClient,
            }),
            invalidatesTags: ['Clients'],
        }),
        assignClientToSeller: builder.mutation({
            query: ({ clientId, sellerId }) => ({
                url: `/clients/${clientId}/assign`,
                method: 'PUT',
                body: { assignedTo: sellerId },
            }),
            invalidatesTags: ['Clients'],
        }),
        addFeedbackToClient: builder.mutation({
            query: ({ clientId, feedback }) => ({
                url: `/clients/${clientId}/feedback`,
                method: 'PUT',
                body: { feedback },
            }),
            invalidatesTags: ['Clients'],
        }),
        updateClient: builder.mutation({
            query: ({ id, updates }) => ({
                url: `/clients/${id}`,
                method: 'PUT',
                body: updates,
            }),
            invalidatesTags: ['Clients'],
        }),
        deleteClient: builder.mutation({
            query: (id) => ({
                url: `/clients/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Clients'],
        }),
    }),
});

export const {
    useGetAllClientsQuery,
    useCreateClientMutation,
    useAssignClientToSellerMutation,
    useGetClientByIdQuery,
    useAddFeedbackToClientMutation,
    useUpdateClientMutation,
    useDeleteClientMutation,
    useGetAllUsersQuery,
    useGetNewLeadsQuery,
    useGetUserByIdQuery
} = apiSlice;

