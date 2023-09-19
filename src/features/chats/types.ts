import { type IUser } from '../account';

export interface IMessage {
    id: string;
    text: string;
    authorId: string;
    chatId: string;
}

export interface IChat {
    id: string;
    name: string | null;
    isGroup: 0 | 1;
    messages: IMessage[];
    participants: IUser[];
}

export interface IChatsState {
    chats: IChat[];
    chatsLoading: boolean;
    chatLoading: boolean;
}
