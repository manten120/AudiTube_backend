import { User } from './User';
import { DisplayId } from './DisplayId';

export interface IUserRepository {
  findOneByDisplayId: (displayId: DisplayId) => Promise<User | null>;
}
