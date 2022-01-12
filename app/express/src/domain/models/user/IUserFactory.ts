import { User } from './User';

export interface IUserFactory {
  create: (argsObj: {
    userIdValue: string;
    displayIdValue: string;
    userNameValue: string;
  }) => User;
}
