import React, { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { type Theme } from '@mui/material';

import TabHeader from './TabHeader';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            height: '100vh',
            borderRight: `1px solid ${theme.palette.divider}`,
            display: 'grid',
            gridTemplateRows: '56px 1fr 56px'
        },
        tabContent: {
            padding: '8px',
            overflowY: 'auto'
        },
        footer: {
            width: '100%',
            borderTop: `1px solid ${theme.palette.divider}`
        }
    };
});

const TabsWrapper: FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TabHeader />

            <div className={classes.tabContent}>
                <Outlet />
            </div>

            <nav className={classes.footer}>

            </nav>
        </div>
    );
};

export default TabsWrapper;
