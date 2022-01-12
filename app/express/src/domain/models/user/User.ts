import { UserId } from './UserId';
import { UserName } from './UserName';
import { DisplayId } from './DisplayId';

export class User {
  readonly id: UserId; // 重複不可, 変更不可, プライベートなページのurl? JWTに持たせる?

  displayId: DisplayId; // 重複不可, 変更可, 公開ページのurl

  name: UserName; // 重複可

  constructor(id: UserId, displayId: DisplayId, name: UserName) {
    this.id = id;
    this.displayId = displayId;
    this.name = name;
  }
}
