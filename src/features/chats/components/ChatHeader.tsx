import React, { type FC } from 'react';
import { Box, type Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { AvatarWithLetters, Text } from '../../base';
import { type IUser } from '../../account';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            padding: '4px',
            height: '56px',
            display: 'flex',
            paddingLeft: '8px',
            alignItems: 'center',
            width: '100%',
            borderBottom: `1px solid ${theme.palette.divider}`
        }
    };
});

type TProps = {
    participants: IUser[]
}

const ChatHeader: FC<TProps> = ({ participants }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AvatarWithLetters name={participants[0].nickName} />
            <Text
                sx={{ marginLeft: '16px' }}
                variant='body1'>
                {participants[0].nickName}
            </Text>
        </div>
    );
};

export default ChatHeader;
