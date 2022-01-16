// import { UserId } from '../user/UserId';
// import { VideoId } from '../video/VideoId';
import { Finish } from './Finish';

export interface IFinishRepository {
  saveNew: (finish: Finish) => Promise<void>;

  // update: (finish: Finish) => Promise<void>;
  
  // findOne: (userId: UserId, videoId: VideoId) => Promise<Finish | null>;

  // findAllByUserId: (userId: UserId) => Promise<Finish[]>;

  // delete: (finish: Finish) => Promise<void>;
}
