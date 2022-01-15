import { DateTime } from '../common/DateTime';
import { ChannelId } from './ChannelId';
import { ChannelTitle } from './ChannelTitle';

export class Channel {
  readonly id: ChannelId;

  title: ChannelTitle;

  updatedAt: DateTime;

  constructor(
    channelId: ChannelId,
    channelTitle: ChannelTitle,
    updatedAt: DateTime
  ) {
    this.id = channelId;
    this.title = channelTitle;
    this.updatedAt = updatedAt;
  }

  readonly changeTitle = (newChannelTitle: ChannelTitle) => {
    this.title = newChannelTitle;
    this.updatedAt = DateTime.now();
  };
}
