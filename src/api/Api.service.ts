const API_PATH = process.env.REACT_API_PATH;

type THttpMethod = 'GET' | 'POST' | 'DELETE';

const apiRequest = (url: string, data?: any, method?: THttpMethod) => {
    const token = localStorage.getItem('token');

    return fetch(`${API_PATH}${url}`, {
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            ...token
                ? { Authorization: `Bearer ${token}` }
                : null
        },
        method
    });
};

//
export default {
    signUp: (login: string, password: string) => {
        const data = { login, password };
        return apiRequest('sign-up', data, 'POST').then(res => res.json());
    },
    signIn: (login: string, password: string) => {
        const data = { login, password };
        return apiRequest('sign-in', data, 'POST').then(res => res.json());
    }
}