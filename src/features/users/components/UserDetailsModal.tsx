import React, { type FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Box, Button } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';

import { AvatarWithLetters, Modal, Text, type TModalProps } from '../../base';
import { useLazyGetUserByIdQuery } from '../usersAPI';

const useStyles = makeStyles(() => {
    return {
        root: {
            padding: '32px',
        },
        row: {
            display: 'flex',
            width: '100%',
            gap: '16px',
            alignItems: 'center',
        }
    };
});

type TProps = Omit<TModalProps, 'children'>;

const UserDetailsModal: FC<TProps> = ({ ...props }) => {
    const classes = useStyles();
    const params = useParams();
    const [ triggerFetchUser, { data: user } ] = useLazyGetUserByIdQuery();

    useEffect(() => {
        void (async () => {
            if (params.userId) {
                await triggerFetchUser(params.userId);
            }
        })();
    }, [ params.userId, triggerFetchUser ]);

    return (
        <Modal {...props}>
            <div className={classes.root}>
                {user && (
                    <>
                        <div className={classes.row}>
                            <AvatarWithLetters
                                name={user.nickName}
                                sx={{ width: 56, height: 56 }} />
                            <Text
                                variant='h5'>
                                {user.nickName}
                            </Text>
                        </div>

                        <Box
                            className={classes.row}
                            sx={{ marginTop: '16px' }}>
                            <Button endIcon={<ForumIcon />}>
                                Start chat
                            </Button>
                        </Box>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default UserDetailsModal;
