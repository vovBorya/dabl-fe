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
                : null
        },
        method
    });
};

export default {
    signUp: async (login: string, password: string) => {
        const data = { login, password };

        // @ts-ignore
        return await apiRequest('/sign-up', data, 'POST').then(res => res.json());
    },
    signIn: async (login: string, password: string): Promise<ISignInResponse> => {
        const data = { login, password };

        // @ts-ignore
        return await apiRequest('/sign-in', data, 'POST').then(res => res.json());
    }
};
