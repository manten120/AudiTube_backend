import { createUUID } from '../../../adapter/uuid';

export class FinishId {
  readonly value: string;

  private constructor(value: string) {
    const isfHyphenUUID = /^f-[0-9a-f]{32}$/.test(value);
    if (!isfHyphenUUID) {
      throw new Error(
        'finishIdの値はf-にハイフンを取り除いたuuidを結合した文字列です'
      );
    }
    this.value = value;
  }

  static readonly createNew = () => {
    const uuid = createUUID();
    return new this(`f-${uuid}`);
  };

  static readonly restore = (value: string) => new this(value);
}
