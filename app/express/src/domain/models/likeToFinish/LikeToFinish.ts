import { DateTime } from '../common/DateTime';
import { FinishId } from '../finish/FinishId';
import { UserId } from '../user/UserId';
import { LikeToFinishId } from './LikeToFinishId';

export class LikeToFinish {
  readonly id: LikeToFinishId;

  readonly finishId: FinishId;

  readonly userId: UserId;

  readonly createdAt: DateTime;

  constructor(argsObj: {
    id: LikeToFinishId;
    finishId: FinishId;
    userId: UserId;
    createdAt: DateTime;
  }) {

    this.id = argsObj.id
    this.finishId = argsObj.finishId;
    this.userId = argsObj.userId;
    this.createdAt = argsObj.createdAt;
  }
}
