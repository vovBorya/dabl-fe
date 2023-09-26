import React, { type ChangeEvent, type FC, useCallback, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Box, Button, Container, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginAPI } from '../loginAPI';
import { onAccountFetchedSuccessfully, setIsAuthenticated } from '../../account';
import { type ISignInResponse } from '../types';
import { Text } from '../../base';
import { routes } from '../../routes';
import { showSnackbar } from '../../snackbars';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ login, setLogin ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const handleLoginChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    },[]);

    const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    },[]);

    const onSignUpClick = useCallback(() => {
        navigate(routes.signUp);
    }, [ navigate ]);

    const onSubmit = useCallback(async () => {
        try {
            const { accessToken, message, ...account }: ISignInResponse = await loginAPI.signIn(login, password);

            if (message) {
                dispatch(showSnackbar({
                    message,
                    variant: 'error'
                }));

                return;
            }

            dispatch(onAccountFetchedSuccessfully(account));
            dispatch(setIsAuthenticated(true));

            navigate(routes.chats);

            localStorage.setItem('accessToken', accessToken);
        } catch (e) {
            console.error(e);
        }
    }, [ dispatch, login, navigate, password ]);

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
                    size={'large'}
                    variant='contained'>
                    Sign in
                </Button>

                <Button
                    fullWidth
                    onClick={onSignUpClick}
                    size={'large'}
                    sx={{
                        marginTop: '8px'
                    }}
                    variant='outlined'>
                    Sign up
                </Button>
            </Box>
        </Container>
    );
};
