import { getConnection } from 'typeorm';
import { WatchingORMEntity } from '../../orm/entity/WatchingORMEntity';
import { IWatchingRepository } from '../../domain/models/watching/IWatchingRepository';
import { Watching } from '../../domain/models/watching/Watching';
import { VideoId } from '../../domain/models/video/VideoId';
import { UserId } from '../../domain/models/user/UserId';
import { IWatchingFactory } from '../../domain/models/watching/IWatchingFactory';
// import { IUserFactory } from '../../domain/models/user/IUserFactory';
// import { IVideoFactory } from '../../domain/models/video/IVideoFactory';
// import { IChannelFactory } from '../../domain/models/channel/IChannelFactory';

export class WatchingRepository implements IWatchingRepository {
  private readonly watchingFactory: IWatchingFactory;

  // private readonly userFactory: IUserFactory;

  // private readonly videoFactory: IVideoFactory;

  // private readonly channelFactory: IChannelFactory;

  constructor(
    watchingFactory: IWatchingFactory
    // userFactory: IUserFactory;
    // videoFactory: IVideoFactory;
    // channelFactory: IChannelFactory;
  ) {
    this.watchingFactory = watchingFactory;
    // this.userFactory = argsObj.userFactory;
    // this.videoFactory = argsObj.videoFactory;
    // this.channelFactory = argsObj.channelFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  readonly saveNew = async (watching: Watching) => {
    const watchingTable = getConnection().getRepository(WatchingORMEntity);

    const watchingData = new WatchingORMEntity();
    watchingData.user_id = watching.user.id.value;
    watchingData.video_id = watching.video.id.value;
    watchingData.priority = watching.priority.value;
    watchingData.registered_at = watching.registeredAt.value;

    await watchingTable.insert(watchingData);
  };

  readonly findOne = async (userId: UserId, videoId: VideoId) => {
    const watchingTable = getConnection().getRepository(WatchingORMEntity);

    const watchingData = await watchingTable.findOne({
      where: {
        user_id: userId.value,
        video_id: videoId.value,
      },
      relations: ['user', 'video', 'video.channel'],
    });

    if (!watchingData) {
      return null;
    }

    const userData = watchingData.user;
    const videoData = watchingData.video;
    const channelData = watchingData.video.channel;

    const watching = this.watchingFactory.restore({
      userIdValue: userData.id,
      displayIdValue: userData.display_id,
      userNameValue: userData.name,
      channelIdValue: channelData.id,
      channelTitleValue: channelData.title,
      channelUpdatedAtValue: channelData.updated_at,
      videoIdValue: videoData.id,
      videoTitleValue: videoData.title,
      videoDurationValue: videoData.duration,
      videoUpdatedAtValue: videoData.updated_at,
      watchingPriorityValue: watchingData.priority,
      watchingRegisteredAtValue: watchingData.registered_at,
    });

    return watching;
  };

  readonly findAllByUserId = async (userId: UserId) => {
    const watchingTable = getConnection().getRepository(WatchingORMEntity);

    const watchingsData = await watchingTable.find({
      where: {
        user_id: userId.value,
      },
      relations: ['user', 'video', 'video.channel'],
    });

    const watchings = watchingsData.map((watchingData) => {
      const userData = watchingData.user;
      const videoData = watchingData.video;
      const channelData = watchingData.video.channel;

      const watching = this.watchingFactory.restore({
        userIdValue: userData.id,
        displayIdValue: userData.display_id,
        userNameValue: userData.name,
        channelIdValue: channelData.id,
        channelTitleValue: channelData.title,
        channelUpdatedAtValue: channelData.updated_at,
        videoIdValue: videoData.id,
        videoTitleValue: videoData.title,
        videoDurationValue: videoData.duration,
        videoUpdatedAtValue: videoData.updated_at,
        watchingPriorityValue: watchingData.priority,
        watchingRegisteredAtValue: watchingData.registered_at,
      });

      return watching;
    });

    return watchings;
  };

  // eslint-disable-next-line class-methods-use-this
  readonly delete = async (watching: Watching) => {
    const watchingTable = getConnection().getRepository(WatchingORMEntity);
    const watchingData = await watchingTable.findOne({
      where: {
        user_id: watching.user.id.value,
        video_id: watching.video.id.value,
      },
    });
    if (!watchingData) {
      throw new Error('watchingは存在しないか削除済みです');
    }
    await watchingTable.delete(watchingData);
  };
}
