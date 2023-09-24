import { type IUser } from '../account';

export interface ISignInResponse extends IUser {
    accessToken: string;
    message?: string;
}
