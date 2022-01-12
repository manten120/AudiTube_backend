import { IAuthUserFactory } from '../../domain/models/authUser/IAuthUserFactory';
import { Password } from '../../domain/models/authUser/Password';
import { DisplayId } from '../../domain/models/user/DisplayId';
import { UserName } from '../../domain/models/user/UserName';
import { AuthUser } from '../../domain/models/authUser/AuthUser';
import { UserId } from '../../domain/models/user/UserId';
import { createUUID } from '../../adapter/uuid';

export class AuthUserFactory implements IAuthUserFactory {
  // eslint-disable-next-line class-methods-use-this
  readonly createNew = (argsObj: {
    plainPassword: string;
    displayIdValue: string;
    userNameValue: string;
  }) => {
    const id = new UserId(createUUID());
    const password = Password.createFromPlain(argsObj.plainPassword);
    const displayId = new DisplayId(argsObj.displayIdValue);
    const name = new UserName(argsObj.userNameValue);

    const authUser = new AuthUser({
      id,
      password,
      displayId,
      name,
    });

    return authUser;
  };

  // eslint-disable-next-line class-methods-use-this
  readonly create = (argsObj: {
    userIdValue: string;
    hashedPassword: string;
    displayIdValue: string;
    userNameValue: string;
  }) => {
    const id = new UserId(argsObj.userIdValue);
    const password = Password.createFromHash(argsObj.hashedPassword);
    const displayId = new DisplayId(argsObj.displayIdValue);
    const name = new UserName(argsObj.userNameValue);

    const authUser = new AuthUser({
      id,
      password,
      displayId,
      name,
    });

    return authUser;
  };
}
