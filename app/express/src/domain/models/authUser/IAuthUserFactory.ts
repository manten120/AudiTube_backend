import { AuthUser } from './AuthUser';

export interface IAuthUserFactory {
  createNew: (argsObj: {
    plainPassword: string;
    displayIdValue: string;
    userNameValue: string;
  }) => AuthUser;

  create: (argsObj: { // メソッド名restoreに変更する?
    userIdValue: string;
    hashedPassword: string;
    displayIdValue: string;
    userNameValue: string;
    registeredAtValue: string;
  }) => AuthUser;
}
