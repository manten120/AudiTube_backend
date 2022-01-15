export class ChannelId {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  // readonly equals = (channelId: ChannelId) => {
  //   if (this.value === channelId.value) {
  //     return true;
  //   }
  //   return false;
  // };
}
