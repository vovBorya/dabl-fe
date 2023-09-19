import { useContext } from 'react';

import { ApiContext } from './Api.context';
import { type ApiService } from './Api.service';

export const useApiService = (): ApiService => useContext(ApiContext);
