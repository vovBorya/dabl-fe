import { type IUser, type TUserUpdate } from './types';
import { logout } from './functions';

const apiRoutes = {
    user: '/user'
};

const fetchUser = async (): Promise<IUser> => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch(`${process.env.REACT_APP_API_PATH}${apiRoutes.user}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.status === 401) {
            logout();
        }

        return await response.json();
    } catch (err) {
        console.error(err);

        return await Promise.reject(new Error('User fetching error'));
    }
};

const updateUser = async (user: Omit<TUserUpdate, 'onSuccess'>): Promise<IUser> => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch(`${process.env.REACT_APP_API_PATH}${apiRoutes.user}`, {
            method: 'PUT',
            body: JSON.stringify({
                nickName: user.nickName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    } catch (err) {
        console.error(err);

        return await Promise.reject(new Error('User fetching error'));
    }
};

export const accountAPI = {
    fetchUser,
    updateUser
};
