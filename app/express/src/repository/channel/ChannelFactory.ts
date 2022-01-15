import { IChannelFactory } from '../../domain/models/channel/IChannelFactory';
import { Channel } from '../../domain/models/channel/Channel';
import { ChannelId } from '../../domain/models/channel/ChannelId';
import { ChannelTitle } from '../../domain/models/channel/ChannelTitle';
import { DateTime } from '../../domain/models/common/DateTime';

export class ChannelFactory implements IChannelFactory {
  // eslint-disable-next-line class-methods-use-this
  readonly createNew = (channelIdValue: string, channelTitleValue: string) => {
    const channelId = new ChannelId(channelIdValue);
    const channelTitle = new ChannelTitle(channelTitleValue);
    const updatedAt = DateTime.now();

    const channel = new Channel(channelId, channelTitle, updatedAt);

    return channel;
  };

  // eslint-disable-next-line class-methods-use-this
  readonly restore = (argsObj: {
    channelIdValue: string;
    channelTitleValue: string;
    channelUpdatedAtValue: string;
  }) => {
    const channelId = new ChannelId(argsObj.channelIdValue);
    const channelTitle = new ChannelTitle(argsObj.channelTitleValue);
    const updatedAt = DateTime.restore(argsObj.channelUpdatedAtValue);

    const channel = new Channel(channelId, channelTitle, updatedAt);

    return channel;
  };
}
