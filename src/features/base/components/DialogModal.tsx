import React, { type FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, type ButtonProps } from '@mui/material';

import Modal, { type TModalProps } from './Modal';
import Text from './Text';

const useStyles = makeStyles(() => {
    return {
        root: {
            padding: '16px'
        },
        footer: {
            marginTop: '16px',
            justifyContent: 'flex-end',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
        }
    };
});

type TDialogButton = {
    label: string;
    onClick: ButtonProps['onClick']
}

type TProps = TModalProps & {
    title: string,
    primaryButton: TDialogButton;
    secondaryButton: TDialogButton;
}

const DialogModal: FC<TProps> = ({ title, primaryButton, secondaryButton, ...props }) => {
    const classes = useStyles();

    return (
        <Modal
            {...props}>
            <div className={classes.root}>
                <Text variant='h6'>
                    {title}
                </Text>

                <div className={classes.footer}>
                    <Button
                        onClick={primaryButton.onClick}
                        variant={'contained'}>
                        {primaryButton.label}
                    </Button>

                    <Button
                        onClick={secondaryButton.onClick}
                        variant={'outlined'}>
                        {secondaryButton.label}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DialogModal;
