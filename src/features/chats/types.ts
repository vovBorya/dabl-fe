import { type IUser } from '../account';

export interface IMessage {
    id: string;
    text: string;
    authorId: string;
    chatId: string;
    createdAt: string;
}

export interface IChat {
    id: string;
    name: string;
    isGroup: 0 | 1;
    messages: IMessage[];
    participants: IUser[];
}

export interface IChatsState {
    chats: IChat[];
    chat: IChat | null;
    chatsLoading: boolean;
    chatLoading: boolean;
}

export type IMessageSend = Omit<IMessage, 'id' | 'createdAt'>
