import React, { type FC, useCallback, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Formik } from 'formik';
import { Button, TextField, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { type TUserUpdate } from '../types';
import { type TAppDispatch } from '../../store';
import { Modal, Text, type TModalProps, Loader } from '../../base';
import { accountSelector } from '../accountSlice';
import { updateUserThunk } from '../thunks';

const useStyles = makeStyles(() => {
    return {
        root: {
            padding: '0 16px 16px 16px'
        },
        header: {
            padding: '16px',
            width: '100%',
        }
    };
});

type TProps = TModalProps;

type TFormValues = Omit<TUserUpdate, 'onSuccess' | 'id'>;

const AccountModal: FC<TProps> = ({ ...props }) => {
    const classes = useStyles();
    const dispatch = useDispatch<TAppDispatch>();
    const { user, userLoading } = useSelector(accountSelector);

    const [ isEditMode, setIsEditMode ] = useState<boolean>(false);

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
                <Text
                    className={classes.header}
                    variant='h5'>
                    Account
                </Text>
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
                            </Stack>
                        )}
                    </Formik>
                ) : <Loader />}
            </div>
        </Modal>
    );
};

export default AccountModal;
