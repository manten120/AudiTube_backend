import { UserService } from '../../domain/Services/UserService';
import { IUserRepository } from '../../domain/models/user/IUserRepository';
import { IUserFactory } from '../../domain/models/user/IUserFactory';
import { IAuthUserRepository } from '../../domain/models/authUser/IAuthUserRepository';
import { IAuthUserFactory } from '../../domain/models/authUser/IAuthUserFactory';

export class UserApplicationService {
  private readonly userService: UserService;

  private readonly userRepository: IUserRepository;

  private readonly userFactory: IUserFactory;

  private readonly authUserRepository: IAuthUserRepository;

  private readonly authUserFactory: IAuthUserFactory;

  constructor(argsObj: {
    userService: UserService;
    userRepository: IUserRepository;
    userFactory: IUserFactory;
    authUserRepository: IAuthUserRepository;
    authUserFactory: IAuthUserFactory;
  }) {
    this.userService = argsObj.userService;
    this.userRepository = argsObj.userRepository;
    this.userFactory = argsObj.userFactory;
    this.authUserRepository = argsObj.authUserRepository;
    this.authUserFactory = argsObj.authUserFactory;
  }

  readonly register = async (
    plainPassword: string,
    displayIdValue: string,
    userNameValue: string
  ) => {
    try {
      const authUser = this.authUserFactory.createNew({
        plainPassword,
        displayIdValue,
        userNameValue,
      });

      const sameDisplayIdUserAlreadyExists = await this.userService.exists(
        authUser
      );

      if (sameDisplayIdUserAlreadyExists) {
        return { ok: false, error: Error('displayIdが重複しています') };
      }

      await this.authUserRepository.saveNew(authUser);

      return { ok: true, error: null };
    } catch (e) {
      return { ok: false, error: e };
    }
  };
}
