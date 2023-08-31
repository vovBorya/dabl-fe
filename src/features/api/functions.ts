import {useContext} from "react";
import {ApiContext} from "./Api.context";

export const useApiService = () => useContext(ApiContext)