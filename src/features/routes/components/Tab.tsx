import React, { type FC, type ReactNode, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import { type Theme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Text } from '../../base';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'rgba(256, 256, 256, 0.2)'
            }
        }
    };
});

type TProps = {
    title: string,
    icon: ReactNode;
    route: string;
}

const Tab: FC<TProps> = ({ title, icon, route }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const onClick = useCallback(() => {
        navigate(route);
    }, [ route ]);

    return (
        <div
            className={classes.root}
            onClick={onClick}>
            {icon}

            <Text variant='caption'>
                {title}
            </Text>
        </div>
    );
};

export default Tab;
