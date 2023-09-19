import { type Store } from 'redux';

import { type IFetchApiMethod, type IUser, setAccessToken } from '../account';
import routes from './routes';

const API_PATH = process.env.REACT_APP_API_PATH;

type THttpMethod = 'GET' | 'POST' | 'DELETE';

export const apiRequest = async (url: string, data?: any, method?: THttpMethod): Promise<unknown> => {
    const token = localStorage.getItem('token');

    return await fetch(`${API_PATH}${url}`, {
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

export class ApiService {
    initialized = false;
    store: Store | null = null;

    constructor(store: Store) {
        this.store = store;
    }

    initialize(): void {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            this.store?.dispatch(setAccessToken(accessToken));
        }

        this.initialized = true;
    }

    async fetchApi({ url,headers,method, body,...rest }: IFetchApiMethod): Promise<any> {
        const accessToken = localStorage.getItem('accessToken');

        return await fetch(`${process.env.REACT_APP_API_PATH}${url}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
                ...headers
            },
            body: body ? JSON.stringify(body) : undefined,
            ...rest
        });
    }

    async fetchUser(): Promise<IUser> {
        const response = await this.fetchApi({
            url: routes.user,
            method: 'GET'
        });

        if (response.status === 401) {
            this.store?.dispatch(setAccessToken(null));

            throw new Error('Unauthorized');
        }

        return response.json();
    }
}

export let apiService: ApiService;

export const apiServiceCreator = (store: Store): ApiService => {
    if (!apiService && store) {
        apiService = new ApiService(store);
    }

    return apiService;
};
