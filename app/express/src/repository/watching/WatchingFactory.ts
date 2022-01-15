import { IUserRepository } from '../../domain/models/user/IUserRepository';
import { UserId } from '../../domain/models/user/UserId';
import { IVideoRepository } from '../../domain/models/video/IVideoRepository';
import { VideoId } from '../../domain/models/video/VideoId';
import { IWatchingFactory } from '../../domain/models/watching/IWatchingFactory';
import { Priority } from '../../domain/models/wish/Priority';
import { Watching } from '../../domain/models/watching/Watching';
import { IUserFactory } from '../../domain/models/user/IUserFactory';
import { IVideoFactory } from '../../domain/models/video/IVideoFactory';
import { IChannelFactory } from '../../domain/models/channel/IChannelFactory';
import { DateTime } from '../../domain/models/common/DateTime';
import type { PriorityValue } from '../../types';

export class WatchingFactory implements IWatchingFactory {
  private readonly userRepository: IUserRepository;

  private readonly videoRepository: IVideoRepository;

  private readonly userFactory: IUserFactory;

  private readonly videoFactory: IVideoFactory;

  private readonly channelFactory: IChannelFactory;

  constructor(argsObj: {
    userRepository: IUserRepository;
    videoRepository: IVideoRepository;
    userFactory: IUserFactory;
    videoFactory: IVideoFactory;
    channelFactory: IChannelFactory;
  }) {
    this.userRepository = argsObj.userRepository;
    this.videoRepository = argsObj.videoRepository;
    this.userFactory = argsObj.userFactory;
    this.videoFactory = argsObj.videoFactory;
    this.channelFactory = argsObj.channelFactory;
  }

  createNew = async (userIdValue: string, videoIdValue: string) => {
    const userId = new UserId(userIdValue);
    const userPromise = this.userRepository.findOneById(userId);

    const videoId = new VideoId(videoIdValue);
    const videoPromise = this.videoRepository.findOneById(videoId);

    const [user, video] = await Promise.all([userPromise, videoPromise]);

    if (!user) {
      throw new Error('userが存在しません');
    }

    if (!video) {
      throw new Error('videoが存在しません');
    }

    const registeredAt = DateTime.now();
    const priority = new Priority();

    const watching = new Watching({
      user,
      video,
      registeredAt,
      priority,
    });

    return watching;
  };

  restore = (argsObj: {
    userIdValue: string;
    displayIdValue: string;
    userNameValue: string;
    channelIdValue: string;
    channelTitleValue: string;
    channelUpdatedAtValue: string
    videoIdValue: string;
    videoTitleValue: string;
    videoDurationValue: string;
    videoUpdatedAtValue: string;
    watchingPriorityValue: PriorityValue;
    watchingRegisteredAtValue: string;
  }) => {
    const user = this.userFactory.create({
      userIdValue: argsObj.userIdValue,
      displayIdValue: argsObj.displayIdValue,
      userNameValue: argsObj.userNameValue,
    });

    const channel = this.channelFactory.restore({
      channelIdValue: argsObj.channelIdValue,
      channelTitleValue: argsObj.channelTitleValue,
      channelUpdatedAtValue: argsObj.channelUpdatedAtValue,
    });

    const video = this.videoFactory.restore({
      videoIdValue: argsObj.videoIdValue,
      videoTitleValue: argsObj.videoTitleValue,
      videoDurationValue: argsObj.videoDurationValue,
      videoUpdatedAtValue: argsObj.videoUpdatedAtValue,
      channel,
    });

    const registeredAt = DateTime.restore(argsObj.watchingRegisteredAtValue);
    const priority = new Priority(argsObj.watchingPriorityValue);

    const watching = new Watching({
      user,
      video,
      registeredAt,
      priority,
    });

    return watching;
  };
}
