import { UserId } from '../user/UserId';
import { VideoId } from '../video/VideoId';
import { Wish } from './Wish';

export interface IWishRepository {
  saveNew: (wish: Wish) => Promise<void>;

  findOne: (userId: UserId, videoId: VideoId) => Promise<Wish | null>;

  findAllByUserId: (userId: UserId) => Promise<Wish[]>

  delete: (wish: Wish) => Promise<void>;
}