import React, { type FC, useEffect, useMemo, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { type Theme } from '@mui/material'; // @ts-ignore
import dateFormat from 'dateformat';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { type IMessage } from '../types';
import { accountSelector, type IUser } from '../../account';
import { Text } from '../../base';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            padding: '16px',
            gap: '16px',
            overflow: 'auto',
            '& :first-child': {
                marginTop: 'auto'
            }
        },
        message: {
            display: 'flex',
            flexDirection: 'column',
            width: 'fit-content',
            maxWidth: '400px',
            minWidth: '100px',
        },
        bubble: {
            borderRadius: '8px',
            backgroundColor: theme.palette.divider,
            padding: '8px'
        },
        time: {
            marginLeft: 'auto'
        },
        outgoingMessage: {
            marginLeft: 'auto'
        }
    };
});

type TProps = {
    messages: IMessage[];
    chatParticipants: IUser[];
}

const ChatMessagesList: FC<TProps> = ({ messages, chatParticipants }) => {
    const classes = useStyles();
    const { user } = useSelector(accountSelector);
    const messagesListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!messagesListRef.current) return;

        messagesListRef.current.scrollTo(0, messagesListRef.current.scrollHeight);
    }, [ messages.length ]);

    const memoizedMessages = useMemo(() => {
        return messages.map(message => {
            const date = new Date(message.createdAt);

            const isOutgoing = user?.id === message.authorId;

            return (
                <div
                    className={clsx(
                        classes.message,
                        { [classes.outgoingMessage]: isOutgoing }
                    )}
                    key={message.id}>
                    <Text
                        sx={isOutgoing ? { marginLeft: 'auto' } : undefined}
                        variant='caption'>
                        {
                            isOutgoing
                                ? 'me'
                                : chatParticipants[0].nickName
                        }
                    </Text>

                    <div className={classes.bubble}>
                        <Text variant='body2'>
                            {message.text}
                        </Text>
                    </div>

                    <Text
                        sx={{ marginLeft: 'auto' }}
                        variant='caption'>
                        {dateFormat(date, 'HH:MM')}
                    </Text>
                </div>
            );
        });
    }, [ chatParticipants, classes.bubble, classes.message, classes.outgoingMessage, classes.time, messages, user?.id ]);

    return (
        <div
            className={classes.root}
            ref={messagesListRef}>
            {memoizedMessages }
        </div>
    );
};

export default ChatMessagesList;
