import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setAccessToken } from './accountSlice';

export const useInitAccessToken = (): void => {
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            dispatch(setAccessToken(accessToken));
        }

    }, [ dispatch ]);
};
