import { type ISignInResponse } from './types';

type THttpMethod = 'GET' | 'POST' | 'DELETE';

export const apiRequest = async (url: string, data?: any, method?: THttpMethod): Promise<unknown> => {
    const token = localStorage.getItem('token');

    return await fetch(`${process.env.REACT_APP_API_PATH}${url}`, {
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            'Content-Type': 'application/json',
            ...token
                ? { Authorization: `Bearer ${token}` }
                : {}
        },
        method
    });
};

export const loginAPI = {
    signUp: async (nickName: string, firstName: string, lastName: string, email: string, password: string): Promise<ISignInResponse> => {

        return await apiRequest(
            '/sign-up',
            {
                nickName,
                firstName,
                lastName,
                email,
                password
            },
            'POST' // @ts-ignore
        ).then(res => res.json());
    },
    signIn: async (login: string, password: string): Promise<ISignInResponse> => {
        const data = { login, password };

        return await apiRequest('/sign-in', data, 'POST') // @ts-ignore
            .then(res => res.json());
    }
};
