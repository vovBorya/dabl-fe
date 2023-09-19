export interface IUser {
    id: string;
    nickName: string;
    lastName?: string;
    firstName?: string;
    email: string;
    birthDate?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IAccountState {
    user: IUser | null;
    userLoading: boolean;
    accessToken: string | null;
    hasErrorOnFetch: boolean;
}

export interface IFetchApiMethod {
    url: string;
    headers?: any;
    body?: any;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}
