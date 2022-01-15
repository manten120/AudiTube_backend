import { User } from './User';
import { DisplayId } from './DisplayId';
import { UserId } from './UserId';

export interface IUserRepository {
  findOneByDisplayId: (displayId: DisplayId) => Promise<User | null>;

  findOneById: (userId: UserId) => Promise<User | null>;
}
