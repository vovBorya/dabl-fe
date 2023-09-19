import { type ISignInResponse, apiRequest } from '../api';

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
