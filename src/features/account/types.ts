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
    isAuthenticated: boolean;
    hasErrorOnFetch: boolean;
}

export type TUserUpdate = Omit<IUser, 'birthDate' | 'createdAt' | 'updatedAt'> & {
    onSuccess?: () => void;
};
