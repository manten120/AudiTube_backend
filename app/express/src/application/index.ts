import { UserApplicationService } from './user/UserApplicationService';
import { UserRepository } from '../repository/user/userRepository';
import { UserFactory } from '../repository/user/userFactory';
import { AuthUserRepository } from '../repository/authUser/authUserRepository';
import { AuthUserFactory } from '../repository/authUser/authUserFactory';
import { UserService } from '../domain/Services/UserService';

const userFactory = new UserFactory();
const userRepository = new UserRepository(userFactory);
const authUserFactory = new AuthUserFactory();
const authUserRepository = new AuthUserRepository();
const userService = new UserService(userRepository);

export const userApplicationService = new UserApplicationService({
  userService,
  userRepository,
  userFactory,
  authUserRepository,
  authUserFactory,
});
