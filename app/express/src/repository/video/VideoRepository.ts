import { getConnection } from 'typeorm';
import { VideoORMEntity } from '../../orm';
import { IVideoRepository } from '../../domain/models/video/IVideoRepository';
import { IVideoFactory } from '../../domain/models/video/IVideoFactory';
import { Video } from '../../domain/models/video/Video';
import { VideoId } from '../../domain/models/video/VideoId';
import { IChannelFactory } from '../../domain/models/channel/IChannelFactory';

export class VideoRepository implements IVideoRepository {
  private readonly videoFactory: IVideoFactory;

  private readonly channelFactory: IChannelFactory;

  constructor(videoFactory: IVideoFactory, channelFactory: IChannelFactory) {
    this.videoFactory = videoFactory;
    this.channelFactory = channelFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  readonly saveNew = async (video: Video) => {
    const videosTable = getConnection().getRepository(VideoORMEntity);

    const videoData = new VideoORMEntity();
    videoData.id = video.id.value;
    videoData.title = video.title.value;
    videoData.duration = video.duration.value;
    videoData.updated_at = video.updatedAt.value;
    videoData.channel_id = video.channel.id.value;

    await videosTable.insert(videoData);
  };

  readonly findOneById = async (videoId: VideoId) => {
    const videosTable = getConnection().getRepository(VideoORMEntity);

    const videoData = await videosTable.findOne({
      where: {
        id: videoId.value,
      },
      relations: ['channel'],
    });

    if (!videoData) {
      return null;
    }

    const channelData = videoData.channel;

    const channel = this.channelFactory.restore({
      channelIdValue: channelData.id,
      channelTitleValue: channelData.title,
      channelUpdatedAtValue: channelData.updated_at,
    });

    const video = this.videoFactory.restore({
      videoIdValue: videoData.id,
      videoTitleValue: videoData.title,
      videoDurationValue: videoData.duration,
      videoUpdatedAtValue: videoData.updated_at,
      channel,
    });

    return video;
  };
}
