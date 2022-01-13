export class UserUpdateCommand {
  readonly userId: string;

  readonly displayId: string | null;

  readonly userName: string | null;

  constructor(
    userId: string,
    displayId: string | null = null,
    userName: string | null = null
  ) {
    this.userId = userId;
    this.displayId = displayId;
    this.userName = userName;
  }
}
