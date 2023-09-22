import { type IUser } from './types';

const apiRoutes = {
    user: '/user'
};

const fetchUser = async (): Promise<IUser> => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch(`${process.env.REACT_APP_API_PATH}${apiRoutes.user}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return await response.json();
    } catch (err) {
        console.error(err);

        return await Promise.reject(new Error('User fetching error'));
    }
};

export const accountAPI = {
    fetchUser
};
