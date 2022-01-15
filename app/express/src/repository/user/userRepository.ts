import { getConnection } from 'typeorm';
import { UserORMEntity } from '../../orm';
import { IUserRepository } from '../../domain/models/user/IUserRepository';
import { DisplayId } from '../../domain/models/user/DisplayId';
import { IUserFactory } from '../../domain/models/user/IUserFactory';
import { UserId } from '../../domain/models/user/UserId';

export class UserRepository implements IUserRepository {
  private readonly userFactory: IUserFactory;

  constructor(userFactory: IUserFactory) {
    this.userFactory = userFactory;
  }

  readonly findOneByDisplayId = async (displayId: DisplayId) => {
    const usersTable = getConnection().getRepository(UserORMEntity);
    const userData = await usersTable.findOne({
      where: { display_id: displayId.value },
    });

    if (!userData) {
      return null;
    }

    const user = this.userFactory.create({
      userIdValue: userData.id,
      displayIdValue: userData.display_id,
      userNameValue: userData.name,
    });

    return user;
  };

  readonly findOneById = async (userId: UserId) => {
    const usersTable = getConnection().getRepository(UserORMEntity);
    const userData = await usersTable.findOne({
      where: { id: userId.value },
    });

    if (!userData) {
      return null;
    }

    const user = this.userFactory.create({
      userIdValue: userData.id,
      displayIdValue: userData.display_id,
      userNameValue: userData.name,
    });

    return user;
  }
}
