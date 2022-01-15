import { UserId } from '../user/UserId';
import { Password } from './Password';
import { DisplayId } from '../user/DisplayId';
import { UserName } from '../user/UserName';
import { DateTime } from '../common/DateTime';

export class AuthUser {
  readonly id: UserId; // 重複不可, 変更不可, プライベートなページのurl? JWTに持たせる?

  password: Password;

  displayId: DisplayId; // 重複不可, 変更可, 公開ページのurlのパスになるかも

  name: UserName; // 重複可

  readonly registeredAt: DateTime;

  constructor(argsObj: {
    id: UserId;
    password: Password;
    displayId: DisplayId;
    name: UserName;
    registeredAt: DateTime
  }) {
    this.id = argsObj.id;
    this.password = argsObj.password;
    this.displayId = argsObj.displayId;
    this.name = argsObj.name;
    this.registeredAt = argsObj.registeredAt;
  }

  readonly matchesCredentials = (displayId: DisplayId, password: Password) => {
    const isMatched = this.password.equals(password) && this.displayId.equals(displayId)
    return isMatched;
  }

  readonly changePassword = (argsObj: {
    oldPassword: Password;
    newPassword: Password;
    newPasswordForCheck: Password;
  }) => {
    const { oldPassword, newPassword, newPasswordForCheck } = argsObj;

    if (!this.password.equals(oldPassword)) {
      throw new Error('変更前のパスワードが間違っています');
    }

    if (!newPassword.equals(newPasswordForCheck)) {
      throw new Error('新しいパスワードと確認用の新しいパスワードが異なります');
    }

    if (newPassword.equals(this.password)) {
      throw new Error('変更前後のパスワードが同じです');
    }

    this.password = newPassword;
  };

  readonly changeDisplayId = (newDisplayId: DisplayId) => {
    this.displayId = newDisplayId;
  };

  readonly changeName = (newName: UserName) => {
    this.name = newName;
  };
}
