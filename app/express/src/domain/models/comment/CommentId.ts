import { createUUID } from '../../../adapter/uuid';

export class CommentId {
  readonly value: string;

  private constructor(value: string) {
    const iscHyphenUUID = /^c-[0-9a-f]{32}$/.test(value);
    if (!iscHyphenUUID) {
      throw new Error(
        'finishIdの値はc-にハイフンを取り除いたuuidを結合した文字列です'
      );
    }
    this.value = value;
  }

  static readonly createNew = () => {
    const uuid = createUUID();
    return new this(`c-${uuid}`);
  };

  static readonly restore = (value: string) => new this(value);
}
