import React, { type FC } from 'react';
import { Avatar, type AvatarProps } from '@mui/material';

type TProps = {
    name: string;
    sx?: AvatarProps['sx'];
}

const AvatarWithLetters: FC<TProps> = ({ sx, name }) => {

    return (
        <Avatar {...stringAvatar(name, sx)} />
    );
};

function stringToColor(string: string): string {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name: string, defaultSx: AvatarProps['sx'] = {}): Pick<AvatarProps, 'sx' | 'children'> {
    return {
        sx: {
            bgcolor: stringToColor(name),
            color: theme => theme.palette.text.primary,
            ...defaultSx
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1]?.[0] ?? ''}`,
    };
}

export default AvatarWithLetters;
