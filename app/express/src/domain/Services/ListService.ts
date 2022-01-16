import { IVideoRepository } from '../models/video/IVideoRepository';
import { IVideoFactory } from '../models/video/IVideoFactory';
import { IWatchingRepository } from '../models/watching/IWatchingRepository';
import { IWatchingFactory } from '../models/watching/IWatchingFactory';
import { IWishRepository } from '../models/wish/IWishRepository';
import { IWishFactory } from '../models/wish/IWishFactory';
import { IFinishRepository } from '../models/finish/IFinishRepository';
import { IFinishFactory } from '../models/finish/IFinishFactory';
import { UserId } from '../models/user/UserId';
import { ChannelId } from '../models/channel/ChannelId';
import { VideoId } from '../models/video/VideoId';
import { IChannelRepository } from '../models/channel/IChannelRepository';
import { IChannelFactory } from '../models/channel/IChannelFactory';
import {
  getDataOfVideoAndChannelFromYouTubeAPI,
  getVideoDuration,
} from '../../adapter/youtubeDataApi';

export class ListService {
  private readonly channelRepository: IChannelRepository;

  private readonly channelFactory: IChannelFactory;

  private readonly videoRepository: IVideoRepository;

  private readonly videoFactory: IVideoFactory;

  private readonly wishRepository: IWishRepository;

  private readonly wishFactory: IWishFactory;

  private readonly watchingRepository: IWatchingRepository;

  private readonly watchingFactory: IWatchingFactory;

  private readonly finishRepository: IFinishRepository;

  private readonly finishFactory: IFinishFactory;

  constructor(argsObj: {
    channelRepository: IChannelRepository;
    channelFactory: IChannelFactory;
    videoRepository: IVideoRepository;
    videoFactory: IVideoFactory;
    wishRepository: IWishRepository;
    wishFactory: IWishFactory;
    watchingRepository: IWatchingRepository;
    watchingFactory: IWatchingFactory;
    finishRepository: IFinishRepository;
    finishFactory: IFinishFactory;
  }) {
    this.channelRepository = argsObj.channelRepository;
    this.channelFactory = argsObj.channelFactory;
    this.videoRepository = argsObj.videoRepository;
    this.videoFactory = argsObj.videoFactory;
    this.wishRepository = argsObj.wishRepository;
    this.wishFactory = argsObj.wishFactory;
    this.watchingRepository = argsObj.watchingRepository;
    this.watchingFactory = argsObj.watchingFactory;
    this.finishRepository = argsObj.finishRepository;
    this.finishFactory = argsObj.finishFactory;
  }

  private readonly registerVideoAndChannel = async (videoIdValue: string) => {
    const videoId = new VideoId(videoIdValue);
    const video = await this.videoRepository.findOneById(videoId);
    if (video) {
      return;
    }

    const dataOfVideoAndChannelPromise =
      getDataOfVideoAndChannelFromYouTubeAPI(videoIdValue);
    const videoDurationValuePromise = getVideoDuration(videoIdValue);

    const [dataOfVideoAndChannel, videoDurationValue] = await Promise.all([
      dataOfVideoAndChannelPromise,
      videoDurationValuePromise,
    ]);

    const channelIdValue = dataOfVideoAndChannel.channelId;
    const channelTitleValue = dataOfVideoAndChannel.channelTitle;
    const videoTitleValue = dataOfVideoAndChannel.videoTitle;

    const channelId = new ChannelId(channelIdValue);
    const channel = await this.channelRepository.findOneById(channelId);
    if (!channel) {
      const newChannel = this.channelFactory.createNew(
        channelIdValue,
        channelTitleValue
      );
      await this.channelRepository.saveNew(newChannel);
    }

    const newVideo = await this.videoFactory.createNew({
      videoIdValue,
      videoTitleValue,
      videoDurationValue,
      channelIdValue,
    });

    await this.videoRepository.saveNew(newVideo);
  };

  readonly registerWish = async (argsObj: {
    userIdValue: string;
    videoIdValue: string;
  }) => {
    const { userIdValue, videoIdValue } = argsObj;

    await this.registerVideoAndChannel(videoIdValue);

    const userId = new UserId(userIdValue);
    const videoId = new VideoId(videoIdValue);

    const wish = await this.wishRepository.findOne(userId, videoId);
    if (wish) {
      throw new Error('wishは既に存在しています');
    }

    const newWish = await this.wishFactory.createNew(userIdValue, videoIdValue);
    await this.wishRepository.saveNew(newWish);

    const watching = await this.watchingRepository.findOne(userId, videoId);
    if (watching) {
      await this.watchingRepository.delete(watching);
    }
  };

  readonly registerWatching = async (argsObj: {
    userIdValue: string;
    videoIdValue: string;
  }) => {
    const { userIdValue, videoIdValue } = argsObj;

    await this.registerVideoAndChannel(videoIdValue);

    const userId = new UserId(userIdValue);
    const videoId = new VideoId(videoIdValue);

    const watching = await this.watchingRepository.findOne(userId, videoId);
    if (watching) {
      throw new Error('watchingは既に存在しています');
    }

    const newWatching = await this.watchingFactory.createNew(
      userIdValue,
      videoIdValue
    );
    await this.watchingRepository.saveNew(newWatching);

    const wish = await this.wishRepository.findOne(userId, videoId);
    if (wish) {
      await this.wishRepository.delete(wish);
    }
  };

  readonly registerFinish = async (argsObj: {
    userIdValue: string;
    videoIdValue: string;
    reviewValue: string;
    hasSpoilers: boolean;
  }) => {
    const { userIdValue, videoIdValue, reviewValue, hasSpoilers } = argsObj;

    // 聴いた動画リストに登録する動画とそのチャンネルに関するデータ(Videoエンティティ、Channelエンティティ)が
    // 存在するかチェックする。なければ作成し保存する。
    await this.registerVideoAndChannel(videoIdValue);

    const userId = new UserId(userIdValue);
    const videoId = new VideoId(videoIdValue);
    const wishPromise = this.wishRepository.findOne(userId, videoId);
    const watchingPromise = this.watchingRepository.findOne(userId, videoId);

    const finishPromise = await this.finishFactory.createNew({
      userIdValue,
      videoIdValue,
      reviewValue,
      hasSpoilers,
    });

    const [wish, watching, finish] = await Promise.all([
      wishPromise,
      watchingPromise,
      finishPromise,
    ]);

    // 聴き終わった動画リストに登録しようとしている動画が、聴いている動画リストに登録されているとき、
    // 聴いている動画リストに登録した日時(watching.registeredAt)を、
    // 聴き終わったの動画リストのその動画を聴き始めた日時(finish.startedAt)として引き継ぐ
    finish.inheritRegisteredAtOfWatchingAsStartedAt(watching);

    // 聴き終わった動画リストに登録しようとしている動画が、聴きたい動画リストまたは聴いている動画リストに登録されているとき、それらの登録を解除する
    const deleteWishPromise = wish ? this.wishRepository.delete(wish) : '';
    const deleteWatchingPromise = watching
      ? this.watchingRepository.delete(watching)
      : '';
    await Promise.all([deleteWishPromise, deleteWatchingPromise]);

    // 聴き終わった動画リストに登録する 
    await this.finishRepository.saveNew(finish);
  };
}
