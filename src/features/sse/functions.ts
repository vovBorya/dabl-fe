import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { accountSelector } from '../account';
import { onNewMessageReceived } from '../chats';
import { ISSeTypes } from './types';

export const useSubscribeSSE = (): void => {
    const { accessToken } = useSelector(accountSelector);
    const dispatch = useDispatch();

    // @ts-ignore
    const handleSSE = useCallback((data) => {
        switch (data.type) {
            case ISSeTypes.MESSAGE_SENT: {
                dispatch(onNewMessageReceived(data));
                break;
            }
        }
    }, []);

    useEffect(() => {
        if (!process.env.REACT_APP_SSE_PATH || !accessToken) return;

        const eventSource = new EventSource(`${process.env.REACT_APP_SSE_PATH}/${accessToken}`);

        eventSource.addEventListener('open', (event) => {
            console.log('EventSource connected!');
        });

        eventSource.addEventListener('message', (event) => {
            handleSSE(event.data);

            try {
                const parsedData = JSON.parse(event.data);

                handleSSE(parsedData);
            } catch (err) {
                console.error('Error on sse data parsing');
            }
        });

        eventSource.addEventListener('error', (event) => {
            console.error('ON ERROR > ', event);
        });

    }, [ accessToken, handleSSE ]);
};
