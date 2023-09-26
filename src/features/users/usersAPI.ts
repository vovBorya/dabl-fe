import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { type IUser } from '../account';

const apiRoutes = {
    users: '/users'
};

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_PATH }),
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({
            query: () => ({
                url: apiRoutes.users,
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            })
        })
    })
});

export const { useGetUsersQuery } = usersAPI;
