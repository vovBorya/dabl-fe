import {ISignInResponse, apiRequest } from "../api";

export default {
    signUp: (login: string, password: string) => {
        const data = { login, password };
        return apiRequest('/sign-up', data, 'POST').then(res => res.json());
    },
    signIn: (login: string, password: string): Promise<ISignInResponse> => {
        const data = { login, password };
        return apiRequest('/sign-in', data, 'POST').then(res => res.json());
    }
}
