import React, { type FC, type ReactElement } from 'react';
import {
    IconButton,
    Modal as MuiModal,
    Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%',
            height: '100%',
            position :'relative'
        },
    };
});

const boxStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'background.paper',
    boxShadow: 24,
    maxHeight: '80vh'
};

export type TModalProps = {
    visible: boolean;
    children?: ReactElement | ReactElement[];
    onRequestClose: () => void;
    withCloseIcon?: boolean
}

const Modal: FC<TModalProps> = ({
    children,
    visible,
    onRequestClose,
    withCloseIcon = false
}) => {
    const classes = useStyles();

    return (
        <MuiModal
            onClose={onRequestClose}
            open={visible}>
            <Box sx={boxStyle}>
                <div className={classes.root}>
                    {withCloseIcon && (
                        <IconButton
                            onClick={onRequestClose}
                            size='small'
                            sx={{
                                position: 'absolute',
                                top: 24,
                                right: 24
                            }}>
                            <CloseIcon />
                        </IconButton>
                    )}
                    {children}
                </div>
            </Box>
        </MuiModal>
    );
};

export default Modal;
