import React from "react";
import {ApiService, apiService} from "./Api.service";

export const ApiContext = React.createContext<ApiService>(apiService);
