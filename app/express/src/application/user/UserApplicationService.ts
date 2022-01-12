import { UserService } from '../../domain/Services/UserService';
import { IUserRepository } from '../../domain/models/user/IUserRepository';
import { IUserFactory } from '../../domain/models/user/IUserFactory';
import { IAuthUserRepository } from '../../domain/models/authUser/IAuthUserRepository';
import { IAuthUserFactory } from '../../domain/models/authUser/IAuthUserFactory';
import { Password } from '../../domain/models/authUser/Password';
import { DisplayId } from '../../domain/models/user/DisplayId';

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

  // readonly login = async (plainPassword: string, displayIdValue: string) => {};

  readonly changePassword = async (argsObj: {
    oldPlainPassword: string;
    newPlainPassword: string;
    newPlainPasswordForCheck: string;
    displayIdValue: string;
  }) => {
    try {
      const oldPassword = Password.createFromPlain(argsObj.oldPlainPassword);
      const newPassword = Password.createFromPlain(argsObj.newPlainPassword);
      const newPasswordForCheck = Password.createFromPlain(
        argsObj.newPlainPasswordForCheck
      );
      const displayId = new DisplayId(argsObj.displayIdValue);

      const authUser = await this.authUserRepository.findOneByDisplayId(
        displayId
      );

      if (!authUser) {
        throw new Error('displayIdをもつauthUserは存在しません');
      }

      authUser.changePassword({
        oldPassword,
        newPassword,
        newPasswordForCheck,
      });

      await this.authUserRepository.update(authUser);

      return { ok: true, error: null };
    } catch (e) {
      return { ok: false, error: e };
    }
  };
}
