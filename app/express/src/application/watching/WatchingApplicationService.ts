// import { IVideoRepository } from '../../domain/models/video/IVideoRepository';
// import { IChannelRepository } from '../../domain/models/channel/IChannelRepository';
// import { IChannelFactory } from '../../domain/models/channel/IChannelFactory';
// import { IVideoFactory } from '../../domain/models/video/IVideoFactory';
// import { IWatchingFactory } from '../../domain/models/watching/IWatchingFactory';
import { IWatchingRepository } from '../../domain/models/watching/IWatchingRepository';
import { ListService } from '../../domain/Services/ListService';
import { UserId } from '../../domain/models/user/UserId';
import { WatchingListDTO } from './WatchingListDTO';
import { VideoId } from '../../domain/models/video/VideoId';

export class WatchingApplicationService {
  // private readonly channelRepository: IChannelRepository;

  // private readonly channelFactory: IChannelFactory;

  // private readonly videoRepository: IVideoRepository;

  // private readonly videoFactory: IVideoFactory;

  private readonly watchingRepository: IWatchingRepository;

  // private readonly watchingFactory: IWatchingFactory;

  private readonly listService: ListService;

  constructor(argsObj: {
    // channelRepository: IChannelRepository;
    // channelFactory: IChannelFactory;
    // videoRepository: IVideoRepository;
    // videoFactory: IVideoFactory;
    watchingRepository: IWatchingRepository;
    // watchingFactory: IWatchingFactory;
    listService: ListService;
  }) {
    // this.channelRepository = argsObj.channelRepository;
    // this.channelFactory = argsObj.channelFactory;
    // this.videoRepository = argsObj.videoRepository;
    // this.videoFactory = argsObj.videoFactory;
    this.watchingRepository = argsObj.watchingRepository;
    // this.watchingFactory = argsObj.watchingFactory;
    this.listService = argsObj.listService;
  }

  readonly register = async (argsObj: {
    userIdValue: string;
    videoIdValue: string;
    channelIdValue: string;
  }) => {
    try {
      const { userIdValue, videoIdValue, channelIdValue } = argsObj;

      await this.listService.registerWatching({
        userIdValue,
        videoIdValue,
        channelIdValue,
      });

      return { ok: true, error: null };
    } catch (e) {
      return { ok: false, error: e };
    }
  };

  readonly delete = async (userIdValue: string, videoIdValue: string) => {
    try {
      const userId = new UserId(userIdValue);
      const videoId = new VideoId(videoIdValue);
      const watching = await this.watchingRepository.findOne(userId, videoId);
      if (!watching) {
        throw new Error('watchingは存在しないか削除済みです');
      }
      await this.watchingRepository.delete(watching);
      return { ok: true, error: null };
    } catch (e) {
      return { ok: false, error: e };
    }
  };

  readonly getWatchingList = async (userIdValue: string) => {
    const userId = new UserId(userIdValue);
    const watchings = await this.watchingRepository.findAllByUserId(userId);
    const watchingList = watchings.map(
      (watching) => new WatchingListDTO(watching)
    );
    return watchingList;
  };
}
