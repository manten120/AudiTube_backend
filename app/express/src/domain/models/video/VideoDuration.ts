export class VideoDuration {
  readonly value: string;

  constructor(value: string) {
    // TODO: フォーマットに関するルールを追加する
    // YouTube API から得られるフォーマットは"duration": "PT20M8S"

    // 動画の長さ
    this.value = value;
  }
}
