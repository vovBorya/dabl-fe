import React from 'react';

import { type ApiService, apiService } from './Api.service';

export const ApiContext = React.createContext<ApiService>(apiService);
