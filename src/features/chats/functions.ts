import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchChatThunk } from './thunks';
import { type TAppDispatch } from '../store';

export const useFetchAndSaveChat = (): void => {
    const params = useParams();
    const dispatch = useDispatch<TAppDispatch>();

    useEffect(() => {
        if (!params.chatId) return;

        void dispatch(fetchChatThunk(params.chatId));
    }, [ dispatch, params.chatId ]);
};
