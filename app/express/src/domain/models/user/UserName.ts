export class UserName {
  readonly value: string;

  constructor(value: string) {
    if (value.length < 1 || value.length > 15) {
      throw new Error('UserNameの値は1文字以上15文字以下です')
    }
    this.value = value;
  }
}