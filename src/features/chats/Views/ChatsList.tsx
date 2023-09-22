import React, { type FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { type Theme } from '@mui/material';

import { Text } from '../../base';
import { type TAppDispatch } from '../../store';
import { fetchChatsThunk } from '../thunks';
import { chatsSelector } from '../chatsSlice';
import { ChatRow } from '../components';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            height: '100vh',
            borderRight: `1px solid ${theme.palette.divider}`
        },
        header: {
            padding: '8px 16px',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            borderBottom: `1px solid ${theme.palette.divider}`
        },
        list: {
            padding: '8px'
        }
    };
});

const ChatsList: FC = () => {
    const classes = useStyles();
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
        <div className={classes.root}>
            <div className={classes.header}>
                <Text variant='h6'>
                    Chats
                </Text>
            </div>
            <div className={classes.list}>
                {memoizedChats}
            </div>
        </div>
    );
};

export default ChatsList;
