import routes from '../api/routes';
import { type IChat } from './types';

const fetchChats = async (): Promise<IChat[]> => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch(`${process.env.REACT_APP_API_PATH}${routes.chats}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return await response.json();
    } catch (err) {
        console.error(err);

        return await Promise.reject(new Error('User fetching error'));
    }
};

export default {
    fetchChats
};
