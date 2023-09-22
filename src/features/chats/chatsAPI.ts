import { type IChat, type IMessage } from './types';

const apiRoutes = {
    chats: '/chats',
    sendMessage: '/sendMessage'
};

const fetchChats = async (): Promise<IChat[]> => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch(`${process.env.REACT_APP_API_PATH}${apiRoutes.chats}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return await response.json();
    } catch (err) {
        console.error(err);

        return await Promise.reject(new Error('Chats fetching error'));
    }
};

const fetchChat = async (chatId: string): Promise<IChat> => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch(`${process.env.REACT_APP_API_PATH}${apiRoutes.chats}/${chatId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return await response.json();
    } catch (err) {
        console.error(err);

        return await Promise.reject(new Error('Chat fetching error'));
    }
};

const sendMessage = async (text: string, authorId: string, chatId: string): Promise<IMessage> => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch(`${process.env.REACT_APP_API_PATH}${apiRoutes.sendMessage}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                text,
                authorId,
                chatId
            })
        });

        return await response.json();
    } catch (err) {
        console.error(err);

        return await Promise.reject(new Error('Message sending error'));
    }
};

export const chatsAPI = {
    fetchChat,
    fetchChats,
    sendMessage
};
