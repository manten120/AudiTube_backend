import { DisplayId } from '../user/DisplayId';
import { AuthUser } from './AuthUser';

export interface IAuthUserRepository {
  saveNew: (authUser: AuthUser) => Promise<void>;

  update: (authUser: AuthUser) => Promise<void>;

  findOneByDisplayId: (displayId: DisplayId) => Promise<AuthUser | null>;
}
