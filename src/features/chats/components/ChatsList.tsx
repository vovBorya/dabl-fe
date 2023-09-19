import React, { type FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { type TAppDispatch } from '../../store';
import { fetchChatsThunk } from '../thunks';
import { chatsSelector } from '../chatsSlice';
import ChatRow from './ChatRow';

const ChatsList: FC = () => {
    const dispatch = useDispatch<TAppDispatch>();
    const { chats } = useSelector(chatsSelector);

    useEffect(() => {
        void dispatch(fetchChatsThunk());
    }, [ dispatch ]);

    const memoizedChats = useMemo(() => chats.map(chat => {
        return (
            <ChatRow
                chat={chat}
                key={chat.id}/>
        );
    }), [ chats ]);

    return (
        <div>
            {memoizedChats}
        </div>
    );
};

export default ChatsList;
