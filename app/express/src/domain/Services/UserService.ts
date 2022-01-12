import { IUserRepository } from '../models/user/IUserRepository';
import { User } from '../models/user/User';
import { AuthUser } from '../models/authUser/AuthUser';

export class UserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  readonly exists = async (user: User | AuthUser) => {
    const result = await this.userRepository.findOneByDisplayId(user.displayId);
    if (!result) {
      return false;
    }
    return true;
  };
}
