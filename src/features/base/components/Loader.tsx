import React, { type FC } from 'react';
import { CircularProgress } from '@mui/material';

const Loader: FC = () => {
    return (
        <CircularProgress color='success' />
    );
};

export default Loader;
