import React, { type FC, useCallback, useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { type Theme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetUsersQuery } from '../usersAPI';
import UserRow from './UserRow';
import UserDetailsModal from './UserDetailsModal';
import { routes } from '../../routes';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            overflowY: 'auto'
        }
    };
});

const UsersTab: FC = () => {
    const classes = useStyles();
    const params = useParams();
    const navigate = useNavigate();
    const { data: users } = useGetUsersQuery();

    const [ isUserModalOpened, setIsUserModalOpened ] = useState<boolean>(false);

    useEffect(() => {
        if (params.userId) {
            setIsUserModalOpened(true);
        }
    }, [ params.userId ]);

    const memoizedUsers = useMemo(() => (users || []).map(user => (
        <UserRow
            key={user.id}
            user={user} />
    )),[ users ]);

    const onUserModalClose = useCallback(() => {
        navigate(routes.users);
        setIsUserModalOpened(false);
    }, [ navigate ]);

    return (
        <>
            <div className={classes.root}>
                {memoizedUsers}
            </div>

            <UserDetailsModal
                onRequestClose={onUserModalClose}
                visible={isUserModalOpened}/>
        </>
    );
};

export default UsersTab;
