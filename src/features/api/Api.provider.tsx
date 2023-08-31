import React, { FC } from 'react';
import {Store} from "redux";

import { ApiContext } from './Api.context';
import {apiService, apiServiceCreator} from './Api.service';

type TApiProviderProps = {
    children: JSX.Element;
    store: Store;
};

const ApiProvider: FC<TApiProviderProps> = ({ children, store }) => (
    <ApiContext.Provider value = { apiServiceCreator(store) }>
        {children}
    </ApiContext.Provider>
);

export default ApiProvider;
