import { getCurrentUTC } from "../../../adapter/time";

export class DateTime {
  readonly value: string;

  private constructor(value: string) {
    const isCorrectFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value);
    if (!isCorrectFormat) {
      throw new Error('日時はUTCでフォーマットは 2022-01-15T19:26:03Z です');
    }
    this.value = value;
  }

  static readonly now = () => {
    const now = getCurrentUTC();
    return new this(now);
  };

  static readonly restore = (value: string) => new this(value);
}
