export class VideoId {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  readonly equals = (videId: VideoId) => {
    if (this.value === videId.value) {
      return true;
    }
    return false;
  };
}
