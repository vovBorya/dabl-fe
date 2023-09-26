import React, { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { type Theme } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleIcon from '@mui/icons-material/People';

import TabHeader from './TabHeader';
import Tab from './Tab';
import { routes } from '../routes';

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            height: '100vh',
            borderRight: `1px solid ${theme.palette.divider}`,
            display: 'grid',
            gridTemplateRows: '56px 1fr 56px'
        },
        tabContent: {
            overflowY: 'auto'
        },
        footer: {
            width: '100%',
            borderTop: `1px solid ${theme.palette.divider}`,
            display: 'flex'
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
                <Tab
                    icon={<ForumIcon color='secondary' />}
                    route={routes.chats}
                    title='Chats' />

                <Tab
                    icon={<PeopleIcon color='secondary' />}
                    route={routes.users}
                    title='Users' />
            </nav>
        </div>
    );
};

export default TabsWrapper;
