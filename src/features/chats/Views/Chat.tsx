import React, { type FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Box, type Theme } from '@mui/material';
import { Helmet } from 'react-helmet';

import { useFetchAndSaveChat } from '../functions';
import { ChatHeader, ChatMessagesList, MessageInput } from '../components';
import { Text } from '../../base';
import { accountSelector } from '../../account';
import { chatsSelector } from '../chatsSlice';
import { sendMessageThunk } from '../thunks';
import { type TAppDispatch } from '../../store';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            display: 'grid',
            height: '100vh',
            gridTemplateRows: '49px 1fr auto'
        }
    };
});

const Chat: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch<TAppDispatch>();
    const { user } = useSelector(accountSelector);
    const { chat, chatLoading } = useSelector(chatsSelector);

    const [ text, setText ] = useState<string>('');

    useFetchAndSaveChat();

    const onSendMessageClick = useCallback( async (messageText: string) => {
        if (!chat || !user) return;

        void dispatch(sendMessageThunk({
            text: messageText,
            authorId: user.id,
            chatId: chat.id
        }));
    }, [ chat, dispatch, user ]);

    if (chatLoading) {
        return (
            <Box>
                <Text>
                    Loading...
                </Text>
            </Box>
        );
    }

    if (!chat) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text variant='h5'>
                    No selected chat
                </Text>
            </Box>
        );
    }

    return (
        <div className={classes.root}>
            <Helmet>
                <title>{chat.participants[0].nickName} | Dabl</title>
            </Helmet>

            <ChatHeader participants={chat.participants} />

            <ChatMessagesList
                chatParticipants={chat.participants}
                messages={chat.messages} />

            <MessageInput
                sendMessage={onSendMessageClick}
                setText={setText}
                text={text} />
        </div>
    );
};

export default Chat;
