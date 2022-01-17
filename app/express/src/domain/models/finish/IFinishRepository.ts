// import { UserId } from '../user/UserId';
// import { VideoId } from '../video/VideoId';
import { Finish } from './Finish';
import { FinishId } from './FinishId';

export interface IFinishRepository {
  saveNew: (finish: Finish) => Promise<void>;

  update: (finish: Finish) => Promise<void>;
  
  findOneById: (finishId: FinishId) => Promise<Finish | null>;

  // findAllByUserId: (userId: UserId) => Promise<Finish[]>;

  // delete: (finish: Finish) => Promise<void>;
}
