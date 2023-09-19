import React, { type FC } from 'react';
import { makeStyles } from '@mui/styles';

import ChatsList from './ChatsList';
import Chat from './Chat';

const useStyles = makeStyles(() => {
    return {
        appContainer: {
            display: 'grid',
            gridTemplateColumns: '224px 1fr',
            height: '100%'
        }
    };
});

const ChatsPage: FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.appContainer}>
            <ChatsList />

            <Chat />
        </div>
    );
};

export default ChatsPage;
