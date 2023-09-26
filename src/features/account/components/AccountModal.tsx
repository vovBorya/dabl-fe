import React, { type FC, useCallback, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Formik } from 'formik';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, TextField, Stack, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { type TUserUpdate } from '../types';
import { type TAppDispatch } from '../../store';
import { Modal, Text, type TModalProps, Loader, DialogModal } from '../../base';
import { accountSelector } from '../accountSlice';
import { updateUserThunk } from '../thunks';
import { useLogout } from '../functions';

const useStyles = makeStyles(() => {
    return {
        root: {
            padding: '0 16px 16px 16px',
            minWidth: '400px'
        },
        header: {
            padding: '16px 0',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    };
});

type TProps = TModalProps;

type TFormValues = Omit<TUserUpdate, 'onSuccess' | 'id'>;

const AccountModal: FC<TProps> = ({ ...props }) => {
    const classes = useStyles();
    const dispatch = useDispatch<TAppDispatch>();
    const logout = useLogout();
    const { user, userLoading } = useSelector(accountSelector);

    const [ isEditMode, setIsEditMode ] = useState<boolean>(false);
    const [ isSignOutModalOpened, setIsSignOutModalOpened ] = useState<boolean>(false);

    const onSaveSubmit = useCallback((values: TFormValues) => {

        if (user) {
            void dispatch(updateUserThunk({
                id: user.id,
                ...values,
                onSuccess: () => setIsEditMode(false)
            }));
        }
    }, [ dispatch, user ]);

    return (
        <Modal {...props}>
            <div className={classes.root}>
                <div className={classes.header}>
                    <Text
                        variant='h5'>
                        Account
                    </Text>

                    <IconButton
                        onClick={() => setIsSignOutModalOpened(true)}>
                        <LogoutIcon />
                    </IconButton>
                </div>
                {(user && !userLoading) ? (
                    <Formik
                        initialValues={{
                            nickName: user.nickName,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email
                        }}
                        onSubmit={onSaveSubmit}>
                        {({
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        }) => (
                            <Stack>
                                <TextField
                                    disabled={!isEditMode}
                                    id="outlined-basic"
                                    label="Nick name"
                                    name='nickName'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ marginBottom: '8px' }}
                                    type='text'
                                    value={values.nickName}
                                    variant="outlined"
                                />

                                <TextField
                                    disabled={!isEditMode}
                                    id="outlined-basic"
                                    label="First name"
                                    name='firstName'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ marginBottom: '8px' }}
                                    type='text'
                                    value={values.firstName}
                                    variant="outlined"
                                />

                                <TextField
                                    disabled={!isEditMode}
                                    id="outlined-basic"
                                    label="Last name"
                                    name='lastName'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ marginBottom: '8px' }}
                                    type='text'
                                    value={values.lastName}
                                    variant="outlined"
                                />

                                <TextField
                                    disabled={!isEditMode}
                                    id="outlined-basic"
                                    label="Email"
                                    name='email'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ marginBottom: '8px' }}
                                    type='email'
                                    value={values.email}
                                    variant="outlined"
                                />

                                <Button
                                    onClick={
                                        isEditMode
                                            ? () => handleSubmit()
                                            : () => setIsEditMode(true)
                                    }
                                    sx={{ marginTop: '8px' }}
                                    variant={isEditMode ? 'contained' : 'outlined'}>
                                    {isEditMode ? 'Save' : 'Edit'}
                                </Button>

                                {isEditMode && (
                                    <Button
                                        onClick={() => setIsEditMode(false)}
                                        sx={{ marginTop: '8px' }}
                                        variant={'outlined'}>
                                        Cancel
                                    </Button>
                                )}
                            </Stack>
                        )}
                    </Formik>
                ) : <Loader />}
            </div>

            <DialogModal
                onRequestClose={() => setIsSignOutModalOpened(false)}
                primaryButton={{
                    label: 'Yes, sign out',
                    onClick: logout
                }}
                secondaryButton={{
                    label: 'No',
                    onClick: () => setIsSignOutModalOpened(false)
                }}
                title='Do you want to sign out?'
                visible={isSignOutModalOpened} />
        </Modal>
    );
};

export default AccountModal;
