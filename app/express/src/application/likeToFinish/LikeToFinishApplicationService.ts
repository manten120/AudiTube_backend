import { FinishId } from '../../domain/models/finish/FinishId';
import { ILikeToFinishRepository } from '../../domain/models/likeToFinish/ILikeToFinishRepository';
import { ILikeToFinishFactory } from '../../domain/models/likeToFinish/ILikeToFinishFactory';
import { UserId } from '../../domain/models/user/UserId';

export class LikeToFinishApplicationService {
  readonly likeToFinishRepository: ILikeToFinishRepository;

  readonly likeToFinishFactory: ILikeToFinishFactory;

  constructor(argsObj: {
    likeToFinishRepository: ILikeToFinishRepository;
    likeToFinishFactory: ILikeToFinishFactory;
  }) {
    this.likeToFinishRepository = argsObj.likeToFinishRepository;
    this.likeToFinishFactory = argsObj.likeToFinishFactory;
  }

  readonly toggle = async (argsObj: {
    finishIdValue: string;
    userIdValue: string;
  }) => {
    try {
      const { finishIdValue, userIdValue } = argsObj;

      const finishId = FinishId.restore(finishIdValue);
      const userId = new UserId(userIdValue);

      const like = await this.likeToFinishRepository.findOne({
        finishId,
        userId,
      });

      if (like) {
        await this.likeToFinishRepository.delete(like);
      } else {
        const newLike = this.likeToFinishFactory.createNew({
          finishIdValue,
          userIdValue,
        });
        await this.likeToFinishRepository.saveNew(newLike);
      }

      return { ok: true, error: null };
    } catch (e) {
      return { ok: false, error: e };
    }
  };
}
