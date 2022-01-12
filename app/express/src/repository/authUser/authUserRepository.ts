import { getConnection } from 'typeorm';
import { UserORMEntity } from '../../orm';
import { IAuthUserRepository } from '../../domain/models/authUser/IAuthUserRepository';
import { AuthUser } from '../../domain/models/authUser/AuthUser';
import { DisplayId } from '../../domain/models/user/DisplayId';
import { IAuthUserFactory } from '../../domain/models/authUser/IAuthUserFactory';

export class AuthUserRepository implements IAuthUserRepository {
  private readonly authUserFactory: IAuthUserFactory;

  constructor(authUserFactory: IAuthUserFactory) {
    this.authUserFactory = authUserFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  readonly saveNew = async (authUser: AuthUser) => {
    const usersTable = getConnection().getRepository(UserORMEntity);

    const userData = new UserORMEntity();
    userData.id = authUser.id.value;
    userData.display_id = authUser.displayId.value;
    userData.name = authUser.name.value;
    userData.password = authUser.password.value;

    await usersTable.insert(userData);
  };

  // eslint-disable-next-line class-methods-use-this
  readonly update = async (authUser: AuthUser) => {
    const usersTable = getConnection().getRepository(UserORMEntity);

    const userData = new UserORMEntity();
    userData.id = authUser.id.value;
    userData.display_id = authUser.displayId.value;
    userData.name = authUser.name.value;
    userData.password = authUser.password.value;

    await usersTable.update(userData.id, userData);
  };

  readonly findOneByDisplayId = async (displayId: DisplayId) => {
    const usersTable = getConnection().getRepository(UserORMEntity);

    const userData = await usersTable.findOne({
      where: {
        display_id: displayId.value,
      },
    });

    if (!userData) {
      return null;
    }

    const authUser = this.authUserFactory.create({
      userIdValue: userData.id,
      hashedPassword: userData.password,
      displayIdValue: userData.display_id,
      userNameValue: userData.name,
    });

    return authUser;
  };
}
