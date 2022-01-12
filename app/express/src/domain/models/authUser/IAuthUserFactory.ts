import { AuthUser } from './AuthUser';

export interface IAuthUserFactory {
  createNew: (argsObj: {
    plainPassword: string;
    displayIdValue: string;
    userNameValue: string;
  }) => AuthUser;

  create: (argsObj: {
    userIdValue: string;
    hashedPassword: string;
    displayIdValue: string;
    userNameValue: string;
  }) => AuthUser;
}
