import React, { type FC, useCallback, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import {
    Box,
    Button,
    Container,
    TextField,
    InputAdornment,
    IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

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

type TFormValues = {
    nickName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export const SignUpScreen: FC = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();

    const [ showPassword, setShowPassword ] = useState<boolean>(false);

    const onSubmit = useCallback(async (values: TFormValues, { setSubmitting }: { setSubmitting: (val: boolean) => void }) => {
        try {
            const { accessToken, ...account }: ISignInResponse = await loginAPI.signUp(
                values.nickName,
                values.firstName,
                values.lastName,
                values.email,
                values.password,
            );

            dispatch(onAccountFetchedSuccessfully(account));
            dispatch(setAccessToken(accessToken));

            localStorage.setItem('accessToken', accessToken);

            setSubmitting(false);
        } catch (e) {
            console.error(e);
        }
    }, [ dispatch ]);

    const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);

    const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }, []);

    return (
        <Container
            className={classes.root}
            maxWidth={'xs'}>
            <Box className={classes.box}>
                <Text
                    className={classes.title}
                    variant='h5'>
                    Sign up
                </Text>
                <Formik
                    initialValues={{
                        nickName: '',
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: ''
                    }}
                    onSubmit={onSubmit}>
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                        <>
                            <TextField
                                className={classes.input}
                                id="outlined-basic"
                                label="Nick name"
                                name='nickName'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type='text'
                                value={values.nickName}
                                variant="outlined"
                            />

                            <TextField
                                className={classes.input}
                                id="outlined-basic"
                                label="First name"
                                name='firstName'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type='text'
                                value={values.firstName}
                                variant="outlined"
                            />

                            <TextField
                                className={classes.input}
                                id="outlined-basic"
                                label="Last name"
                                name='lastName'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type='text'
                                value={values.lastName}
                                variant="outlined"
                            />

                            <TextField
                                className={classes.input}
                                id="outlined-basic"
                                label="Email"
                                name='email'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type='email'
                                value={values.email}
                                variant="outlined"
                            />

                            <TextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                className={classes.input}
                                id="outlined-basic"
                                label="Password"
                                name='password'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                variant="outlined"
                            />

                            <Button
                                fullWidth
                                onClick={() => handleSubmit()}
                                size={'large'}>
                                Sign up
                            </Button>
                        </>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};
