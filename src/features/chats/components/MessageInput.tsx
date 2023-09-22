import React, { type ChangeEvent, type FC, useCallback, type Dispatch, type SetStateAction } from 'react';
import { makeStyles } from '@mui/styles';
import { type Theme, IconButton, TextareaAutosize } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            width: '100%',
            padding: '8px'
        },
        inputContainer: {
            width: '100%',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            padding: '8px 8px 8px 16px',
            backgroundColor: theme.palette.divider
        },
        input: {
            ...theme.typography.body1,
            backgroundColor: 'transparent',
            width: '100%',
            flex: 1,
            color: theme.palette.text.primary,
            resize: 'none'
        }
    };
});

type TProps = {
    text: string;
    setText: Dispatch<SetStateAction<string>>
    sendMessage: (text: string) => Promise<void>
}

const MessageInput: FC<TProps> = ({ text, setText, sendMessage }) => {
    const classes = useStyles();

    const onSendClick = useCallback(async () => {
        await sendMessage(text);
    },[ sendMessage, text ]);

    const onInputChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }, [ setText ]);

    return (
        <div className={classes.root}>
            <div className={classes.inputContainer}>
                <TextareaAutosize
                    className={classes.input}
                    onChange={onInputChange}
                    placeholder='Write a message...'
                    value={text}/>

                <IconButton
                    onClick={onSendClick}
                    size='small'>
                    <SendIcon fontSize='small' />
                </IconButton>
            </div>
        </div>
    );
};

export default MessageInput;
