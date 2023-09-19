import React, { type FC } from 'react';
import { type Store } from 'redux';

import { ApiContext } from './Api.context';
import { apiServiceCreator } from './Api.service';

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
