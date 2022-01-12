import { DisplayId } from '../../domain/models/user/DisplayId';
import { IUserFactory } from '../../domain/models/user/IUserFactory';
import { User } from '../../domain/models/user/User';
import { UserId } from '../../domain/models/user/UserId';
import { UserName } from '../../domain/models/user/UserName';

export class UserFactory implements IUserFactory {
  // eslint-disable-next-line class-methods-use-this
  readonly create = (argsObj: {
    userIdValue: string;
    displayIdValue: string;
    userNameValue: string;
  }) => {
    const userId = new UserId(argsObj.userIdValue);
    const displayId = new DisplayId(argsObj.displayIdValue);
    const userName = new UserName(argsObj.userNameValue);

    const user = new User(userId, displayId, userName);

    return user;
  };
}
