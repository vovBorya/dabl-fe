import React, { type FC, useCallback, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { IconButton, type Theme } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import { Modal, Text } from '../../base';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            padding: '8px 16px',
            display: 'grid',
            gridTemplateColumns: '40px 1fr 40px',
            justifyContent: 'center',
            width: '100%',
            borderBottom: `1px solid ${theme.palette.divider}`,
            alignItems: 'center'
        },
        title: {
            textAlign: 'center'
        }
    };
});

const TabHeader: FC = () => {
    const classes = useStyles();

    const [ isAccountOpened, setIsAccountOpened ] = useState<boolean>(false);

    const openAccountModal = useCallback(() => setIsAccountOpened(true), []);
    const closeAccountModal = useCallback(() => setIsAccountOpened(false), []);

    return (
        <div className={classes.root}>
            <IconButton onClick={openAccountModal}>
                <PersonOutlineIcon />
            </IconButton>
            <Text
                className={classes.title}
                variant='h6'>
                Chats
            </Text>

            <div>

            </div>

            <Modal
                onRequestClose={closeAccountModal}
                visible={isAccountOpened}>
                <div>
                    <Text sx={{ padding: '32px' }}>
                        Account
                    </Text>
                </div>
            </Modal>
        </div>
    );
};

export default TabHeader;
