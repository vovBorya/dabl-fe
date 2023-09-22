import React, { type ChangeEvent, type FC, useCallback, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Box, Button, Container, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';

import loginAPI from '../loginAPI';
import { onAccountFetchedSuccessfully, setAccessToken } from '../../account';
import { type ISignInResponse } from '../types';
import { Text } from '../../base';

const useStyles = makeStyles( { name: 'LoginScreen' })(() => {
    return {
        root: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8
        },
        box: {
            display: 'flex',
            flexDirection: 'column'
        },
        input: {
            marginBottom: 8
        },
        title: {
            textAlign: 'center',
            marginBottom: 8
        }
    };
});

export const LoginScreen: FC = () => {
    const { classes } = useStyles();
    const dispatch=useDispatch();

    const [ login, setLogin ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const handleLoginChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    },[]);

    const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    },[]);

    const onSubmit = useCallback(async () => {
        try {
            const { accessToken, ...account }: ISignInResponse = await loginAPI.signIn(login, password);

            dispatch(onAccountFetchedSuccessfully(account));
            dispatch(setAccessToken(accessToken));

            localStorage.setItem('accessToken', accessToken);
        } catch (e) {
            console.error(e);
        }
    }, [ dispatch, login, password ]);

    return (
        <Container
            className={classes.root}
            maxWidth={'xs'}>
            <Box className={classes.box}>
                <Text
                    className={classes.title}
                    variant='h5'>
                    Dabl
                </Text>
                <TextField
                    className={classes.input}
                    id="outlined-basic"
                    label="Login"
                    onChange={handleLoginChange}
                    variant="outlined"
                />
                <TextField
                    autoComplete="current-password"
                    className={classes.input}
                    id="outlined-password-input"
                    label="Password"
                    onChange={handlePasswordChange}
                    type="password"
                />

                <Button
                    fullWidth
                    onClick={onSubmit}
                    size={'large'}>
                    Sign in
                </Button>
            </Box>
        </Container>
    );
};
