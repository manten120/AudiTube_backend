export class UserId {
  readonly value: string;

  constructor(value: string) {
    if (value.length !== 36) {
      throw new Error('UserIdの値は36文字です')
    }
    this.value = value;
  }
}