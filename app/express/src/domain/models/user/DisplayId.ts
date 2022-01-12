export class DisplayId {
  readonly value: string;

  constructor(value: string) {
    if (value.length < 1 || value.length > 15) {
      throw new Error('DisplayIdの値は1文字以上15文字以下です')
    }

    if (!(/^[0-9a-zA-Z_]*$/).test(value)) {
      throw new Error('DisplayIdの値に使える文字は半角英数とアンダースコアのみです')
    }

    this.value = value;
  }
}