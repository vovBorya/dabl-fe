interface IUser {
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
}
