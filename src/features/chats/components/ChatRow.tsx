import React, { type FC, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import { type Theme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { type IChat } from '../types';
import { AvatarWithLetters, Text } from '../../base';
import { routes } from '../../routes';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '8px',
            '&:hover': {
                backgroundColor: theme.palette.action.hover
            }
        }
    };
});

type TProps = {
    chat: IChat
}

const ChatRow: FC<TProps> = ({ chat }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const onChatClick = useCallback(() => {
        navigate(routes.chat.replace(':chatId', chat.id));
    }, [ chat.id, navigate ]);

    return (
        <div
            className={classes.root}
            onClick={onChatClick}>
            <AvatarWithLetters name={chat.name} />
            <Text
                sx={{ marginLeft: '16px' }}
                variant='body1'>
                {chat.name}
            </Text>
        </div>
    );
};

export default ChatRow;
