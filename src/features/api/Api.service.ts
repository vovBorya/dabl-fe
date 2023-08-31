import {Store} from "redux";
import {IFetchApiMethod, setAccessToken} from "../account";
import routes from "./routes";

const API_PATH = process.env.REACT_APP_API_PATH;

type THttpMethod = 'GET' | 'POST' | 'DELETE';

export const apiRequest = (url: string, data?: any, method?: THttpMethod) => {
    const token = localStorage.getItem('token');

    return fetch(`${API_PATH}${url}`, {
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

    initialize() {
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken) {
            this.store?.dispatch(setAccessToken(accessToken))
        }

        this.initialized = true;
    }

    fetchApi({url,headers,method, body,...rest}: IFetchApiMethod) {
        const accessToken = localStorage.getItem('accessToken')

        console.log({accessToken})

        return fetch(`${process.env.REACT_APP_API_PATH}${url}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
                ...headers
            },
            body: body ? JSON.stringify(body) : undefined,
            ...rest
        });
    }

    async fetchUser() {
        try {
            console.log({routes});

            const response = await this.fetchApi({
                url: routes.user,
                method: 'GET'
            });

            return response.json();
        } catch (err) {
            console.error(err);
            return Promise.reject(new Error('User fetching error'))
        }
    }
}

export let apiService: ApiService;

export const apiServiceCreator = (store: Store) => {
    if (!apiService && store) {
        apiService = new ApiService(store);
    }

    return apiService;
};
