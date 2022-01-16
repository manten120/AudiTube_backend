import { IFinishFactory } from '../../domain/models/finish/IFinishFactory';
import { IUserRepository } from '../../domain/models/user/IUserRepository';
import { IVideoRepository } from '../../domain/models/video/IVideoRepository';
import { UserId } from '../../domain/models/user/UserId';
import { VideoId } from '../../domain/models/video/VideoId';
import { Review } from '../../domain/models/finish/Review';
import { DateTime } from '../../domain/models/common/DateTime';
import { User } from '../../domain/models/user/User';
import { Comment } from '../../domain/models/comment/Comment';
import { Finish } from '../../domain/models/finish/Finish';
import { FinishId } from '../../domain/models/finish/FinishId';

export class FinishFactory implements IFinishFactory {
  private readonly userRepository: IUserRepository;

  private readonly videoRepository: IVideoRepository;

  constructor(argsObj: {
    userRepository: IUserRepository;
    videoRepository: IVideoRepository;
  }) {
    this.userRepository = argsObj.userRepository;
    this.videoRepository = argsObj.videoRepository;
  }

  readonly createNew = async (argsObj: {
    userIdValue: string;
    videoIdValue: string;
    reviewValue: string;
    hasSpoilers: boolean;
  }) => {
    const id = FinishId.createNew();
    const userId = new UserId(argsObj.userIdValue);
    const videoId = new VideoId(argsObj.videoIdValue);
    const userPromise = this.userRepository.findOneById(userId);
    const videoPromise = this.videoRepository.findOneById(videoId);
    const [user, video] = await Promise.all([userPromise, videoPromise]);

    if (!user) {
      throw new Error('userが存在しません');
    }

    if (!video) {
      throw new Error('videoが存在しません');
    }

    const review = new Review(argsObj.reviewValue);
    const { hasSpoilers } = argsObj;
    const reviewIsRestricted = false;

    const startedAt = DateTime.now();
    const finishedAt = DateTime.now();
    const registeredAt = DateTime.now();

    const comments = [] as Comment[];
    const favorites = [] as User[];

    const isRestricted = false;

    const finish = new Finish({
      id,
      user,
      video,
      review,
      hasSpoilers,
      reviewIsRestricted,
      startedAt,
      finishedAt,
      registeredAt,
      comments,
      favorites,
      isRestricted,
    });

    return finish;
  };
}
