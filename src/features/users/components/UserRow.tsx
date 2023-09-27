import React, { type FC, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import { type Theme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { type IUser } from '../../account';
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
    const navigate = useNavigate();

    const onUserClick = useCallback(() => {
        navigate(routes.user.replace(':userId', user.id));
    }, [ navigate, user.id ]);

    return (
        <div
            className={classes.root}
            onClick={onUserClick}>
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
