import { DateTime } from '../../domain/models/common/DateTime';
import { FinishId } from '../../domain/models/finish/FinishId';
import { ILikeToFinishFactory } from '../../domain/models/likeToFinish/ILikeToFinishFactory';
import { LikeToFinish } from '../../domain/models/likeToFinish/LikeToFinish';
import { LikeToFinishId } from '../../domain/models/likeToFinish/LikeToFinishId';
import { UserId } from '../../domain/models/user/UserId';

export class LikeToFinishFactory implements ILikeToFinishFactory {
  // eslint-disable-next-line class-methods-use-this
  readonly createNew = (argsObj: {
    finishIdValue: string;
    userIdValue: string;
  }) => {
    const id = LikeToFinishId.createNew();
    const finishId = FinishId.restore(argsObj.finishIdValue);
    const userId = new UserId(argsObj.userIdValue);
    const createdAt = DateTime.now();

    const likeToFinish = new LikeToFinish({
      id,
      finishId,
      userId,
      createdAt,
    });

    return likeToFinish;
  };

  // eslint-disable-next-line class-methods-use-this
  readonly restore = (argsObj: {
    likeToFinishIdValue: string;
    finishIdValue: string;
    userIdValue: string;
    createdAtValue: string;
  }) => {
    const id = LikeToFinishId.restore(argsObj.likeToFinishIdValue);
    const finishId = FinishId.restore(argsObj.finishIdValue);
    const userId = new UserId(argsObj.userIdValue);
    const createdAt = DateTime.restore(argsObj.createdAtValue);;

    const likeToFinish = new LikeToFinish({
      id,
      finishId,
      userId,
      createdAt,
    });

    return likeToFinish;
  }
}
