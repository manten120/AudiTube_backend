import { getConnection } from 'typeorm';
import { ChannelORMEntity } from '../../orm';
import { IChannelRepository } from '../../domain/models/channel/IChannelRepository';
import { IChannelFactory } from '../../domain/models/channel/IChannelFactory';
import { Channel } from '../../domain/models/channel/Channel';
import { ChannelId } from '../../domain/models/channel/ChannelId';

export class ChannelRepository implements IChannelRepository {
  private readonly channelFactory: IChannelFactory;

  constructor(channelFactory: IChannelFactory) {
    this.channelFactory = channelFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  readonly saveNew = async (channel: Channel) => {
    const channelsTable = getConnection().getRepository(ChannelORMEntity);

    const channelData = new ChannelORMEntity();
    channelData.id = channel.id.value;
    channelData.title = channel.title.value;
    channelData.updated_at = channel.updatedAt.value

    await channelsTable.insert(channelData);
  };

  readonly findOneById = async (channelId: ChannelId) => {
    const channelsTable = getConnection().getRepository(ChannelORMEntity);

    const channelData = await channelsTable.findOne({
      where: {
        id: channelId.value,
      },
    });

    if (!channelData) {
      return null;
    }

    const channel = this.channelFactory.restore({
      channelIdValue: channelData.id,
      channelTitleValue: channelData.title,
      channelUpdatedAtValue: channelData.updated_at,
    });

    return channel;
  };
}
