import { getConnection } from 'typeorm';
import { UserORMEntity } from '../../orm';
import { IAuthUserRepository } from '../../domain/models/authUser/IAuthUserRepository';
import { AuthUser } from '../../domain/models/authUser/AuthUser';

export class AuthUserRepository implements IAuthUserRepository {
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
}
