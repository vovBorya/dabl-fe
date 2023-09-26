import React, { type FC } from 'react';
import { makeStyles } from '@mui/styles';
import { type Theme } from '@mui/material';

import { type IUser } from '../../account';
import { AvatarWithLetters, Text } from '../../base';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            padding: '8px 16px',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: theme.palette.action.hover
            }
        }
    };
});

type TProps = {
    user: IUser
}

const UserRow: FC<TProps> = ({ user }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AvatarWithLetters name={user.nickName} />
            <Text
                sx={{ marginLeft: '16px' }}
                variant='body1'>
                {user.nickName}
            </Text>
        </div>
    );
};

export default UserRow;
