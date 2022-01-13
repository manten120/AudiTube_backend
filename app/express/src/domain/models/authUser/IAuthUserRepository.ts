import { DisplayId } from '../user/DisplayId';
import { UserId } from '../user/UserId';
import { AuthUser } from './AuthUser';

export interface IAuthUserRepository {
  saveNew: (authUser: AuthUser) => Promise<void>;

  update: (authUser: AuthUser) => Promise<void>;

  findOneById: (userId: UserId) => Promise<AuthUser | null>;

  findOneByDisplayId: (displayId: DisplayId) => Promise<AuthUser | null>;
}
