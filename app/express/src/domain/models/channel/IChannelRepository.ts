import { Channel } from './Channel';
import { ChannelId } from './ChannelId';

export interface IChannelRepository {
  saveNew: (channel: Channel) => Promise<void>;

  findOneById: (channelId: ChannelId) => Promise<Channel | null>;
}
