export class UserId {
  readonly value: string;

  constructor(value: string) {
    const isUUIDWithoutHyphens = /^[0-9a-f]{32}$/.test(value);
    if (!isUUIDWithoutHyphens) {
      throw new Error('UserIdの値はハイフンを除いたUUIDです');
    }
    this.value = value;
  }

  readonly equals = (userId: UserId) => this.value === userId.value;
}
