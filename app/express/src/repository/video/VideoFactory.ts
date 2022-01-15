import { IVideoFactory } from '../../domain/models/video/IVideoFactory';
import { Video } from '../../domain/models/video/Video';
import { VideoId } from '../../domain/models/video/VideoId';
import { VideoTitle } from '../../domain/models/video/VideoTitle';
import { Channel } from '../../domain/models/channel/Channel';
import { ChannelId } from '../../domain/models/channel/ChannelId';
import { DateTime } from '../../domain/models/common/DateTime';
import { IChannelRepository } from '../../domain/models/channel/IChannelRepository';
import { VideoDuration } from '../../domain/models/video/VideoDuration';

export class VideoFactory implements IVideoFactory {
  private readonly channelRepository: IChannelRepository;

  constructor(channelRepository: IChannelRepository) {
    this.channelRepository = channelRepository;
  }

  readonly createNew = async (argsObj: {
    videoIdValue: string;
    videoTitleValue: string;
    videoDurationValue: string;
    channelIdValue: string;
  }) => {
    const videoId = new VideoId(argsObj.videoIdValue);
    const videoTitle = new VideoTitle(argsObj.videoTitleValue);
    const videoDuration = new VideoDuration(argsObj.videoDurationValue);
    const updatedAt = DateTime.now();

    const channelId = new ChannelId(argsObj.channelIdValue);
    const channel = await this.channelRepository.findOneById(channelId);
    if (!channel) {
      throw new Error('channelが見つかりませんでした');
    }

    const video = new Video(
      videoId,
      videoDuration,
      videoTitle,
      updatedAt,
      channel
    );

    return video;
  };

  // eslint-disable-next-line class-methods-use-this
  readonly restore = (argsObj: {
    videoIdValue: string;
    videoTitleValue: string;
    videoDurationValue: string;
    videoUpdatedAtValue: string;
    channel: Channel;
  }) => {
    const videoId = new VideoId(argsObj.videoIdValue);
    const videoTitle = new VideoTitle(argsObj.videoTitleValue);
    const videoDuration = new VideoDuration(argsObj.videoDurationValue);
    const videoUpdatedAt = DateTime.restore(argsObj.videoUpdatedAtValue);

    const video = new Video(
      videoId,
      videoDuration,
      videoTitle,
      videoUpdatedAt,
      argsObj.channel
    );

    return video;
  };
}
