import { FinishId } from '../finish/FinishId';
import { UserId } from '../user/UserId';
import { LikeToFinish } from './LikeToFinish';

export interface ILikeToFinishRepository {
  saveNew: (likeToFinish: LikeToFinish) => Promise<void>;
  findOne: (argsObj: {
    finishId: FinishId;
    userId: UserId;
  }) => Promise<LikeToFinish | null>;
  delete: (likeToFinish: LikeToFinish) => Promise<void>;
}
