import React, { type FC } from 'react';
import { type Theme, Typography, type TypographyProps } from '@mui/material';
import { useTheme } from '@mui/styles';

const Text: FC<TypographyProps> = ({ sx, className, classes, ...props }) => {
    const theme = useTheme<Theme>();

    return (
        <Typography
            classes={{
                ...classes,
                root: className
            }}
            sx={{
                ...sx,
                color: theme.palette.text.primary
            }}
            {...props} />
    );
};

export default Text;
