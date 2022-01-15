// import { IVideoRepository } from '../../domain/models/video/IVideoRepository';
// import { IChannelRepository } from '../../domain/models/channel/IChannelRepository';
// import { IChannelFactory } from '../../domain/models/channel/IChannelFactory';
// import { IVideoFactory } from '../../domain/models/video/IVideoFactory';
// import { IWishFactory } from '../../domain/models/wish/IWishFactory';
import { IWishRepository } from '../../domain/models/wish/IWishRepository';
import { ListService } from '../../domain/Services/ListService';
import { UserId } from '../../domain/models/user/UserId';
import { WishListDTO } from './WishListDTO';
import { VideoId } from '../../domain/models/video/VideoId';

export class WishApplicationService {
  // private readonly channelRepository: IChannelRepository;

  // private readonly channelFactory: IChannelFactory;

  // private readonly videoRepository: IVideoRepository;

  // private readonly videoFactory: IVideoFactory;

  private readonly wishRepository: IWishRepository;

  // private readonly wishFactory: IWishFactory;

  private readonly listService: ListService;

  constructor(argsObj: {
    // channelRepository: IChannelRepository;
    // channelFactory: IChannelFactory;
    // videoRepository: IVideoRepository;
    // videoFactory: IVideoFactory;
    wishRepository: IWishRepository;
    // wishFactory: IWishFactory;
    listService: ListService;
  }) {
    // this.channelRepository = argsObj.channelRepository;
    // this.channelFactory = argsObj.channelFactory;
    // this.videoRepository = argsObj.videoRepository;
    // this.videoFactory = argsObj.videoFactory;
    this.wishRepository = argsObj.wishRepository;
    // this.wishFactory = argsObj.wishFactory;
    this.listService = argsObj.listService;
  }

  readonly register = async (argsObj: {
    userIdValue: string;
    videoIdValue: string;
    channelIdValue: string;
  }) => {
    try {
      const { userIdValue, videoIdValue, channelIdValue } = argsObj;

      await this.listService.registerWish({
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
      const wish = await this.wishRepository.findOne(userId, videoId);
      if (!wish) {
        throw new Error('wishは存在しないか削除済みです');
      }
      await this.wishRepository.delete(wish);
      return { ok: true, error: null };
    } catch (e) {
      return { ok: false, error: e };
    }
  };

  readonly getWishList = async (userIdValue: string) => {
    try {
      const userId = new UserId(userIdValue);
      const wishes = await this.wishRepository.findAllByUserId(userId);
      const wishList = wishes.map((wish) => new WishListDTO(wish));
      return { ok: true, body: wishList, error: null };
    } catch (e) {
      return { ok: false, body: [] as WishListDTO[], error: e };
    }
  };
}
