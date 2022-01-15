import { getConnection } from 'typeorm';
import { WishORMEntity } from '../../orm/entity/WishORMEntity';
import { IWishRepository } from '../../domain/models/wish/IWishRepository';
import { Wish } from '../../domain/models/wish/Wish';
import { VideoId } from '../../domain/models/video/VideoId';
import { UserId } from '../../domain/models/user/UserId';
import { IWishFactory } from '../../domain/models/wish/IWishFactory';
// import { IUserFactory } from '../../domain/models/user/IUserFactory';
// import { IVideoFactory } from '../../domain/models/video/IVideoFactory';
// import { IChannelFactory } from '../../domain/models/channel/IChannelFactory';

export class WishRepository implements IWishRepository {
  private readonly wishFactory: IWishFactory;

  // private readonly userFactory: IUserFactory;

  // private readonly videoFactory: IVideoFactory;

  // private readonly channelFactory: IChannelFactory;

  constructor(
    wishFactory: IWishFactory
    // userFactory: IUserFactory;
    // videoFactory: IVideoFactory;
    // channelFactory: IChannelFactory;
  ) {
    this.wishFactory = wishFactory;
    // this.userFactory = argsObj.userFactory;
    // this.videoFactory = argsObj.videoFactory;
    // this.channelFactory = argsObj.channelFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  readonly saveNew = async (wish: Wish) => {
    const wishesTable = getConnection().getRepository(WishORMEntity);

    const wishData = new WishORMEntity();
    wishData.user_id = wish.user.id.value;
    wishData.video_id = wish.video.id.value;
    wishData.priority = wish.priority.value;
    wishData.registered_at = wish.registeredAt.value;

    await wishesTable.insert(wishData);
  };

  readonly findOne = async (userId: UserId, videoId: VideoId) => {
    const wishesTable = getConnection().getRepository(WishORMEntity);

    const wishData = await wishesTable.findOne({
      where: {
        user_id: userId.value,
        video_id: videoId.value,
      },
      relations: ['user', 'video', 'video.channel'],
    });

    if (!wishData) {
      return null;
    }

    const userData = wishData.user;
    const videoData = wishData.video;
    const channelData = wishData.video.channel;

    const wish = this.wishFactory.restore({
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
      wishPriorityValue: wishData.priority,
      wishRegisteredAtValue: wishData.registered_at,
    });

    return wish;
  };

  readonly findAllByUserId = async (userId: UserId) => {
    const wishesTable = getConnection().getRepository(WishORMEntity);

    const wishesData = await wishesTable.find({
      where: {
        user_id: userId.value,
      },
      relations: ['user', 'video', 'video.channel'],
    });

    const wishes = wishesData.map((wishData) => {
      const userData = wishData.user;
      const videoData = wishData.video;
      const channelData = wishData.video.channel;

      const wish = this.wishFactory.restore({
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
        wishPriorityValue: wishData.priority,
        wishRegisteredAtValue: wishData.registered_at,
      });

      return wish;
    });

    return wishes;
  };

  // eslint-disable-next-line class-methods-use-this
  readonly delete = async (wish: Wish) => {
    const wishesTable = getConnection().getRepository(WishORMEntity);
    const wishData = await wishesTable.findOne({
      where: {
        user_id: wish.user.id.value,
        video_id: wish.video.id.value,
      },
    });
    if (!wishData) {
      throw new Error('wishは存在しないか削除済みです');
    }
    await wishesTable.delete(wishData);
  };
}
