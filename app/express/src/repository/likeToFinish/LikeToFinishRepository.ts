import { getConnection } from 'typeorm';
import { FinishLikeORMEntity } from '../../orm';
import { ILikeToFinishFactory } from '../../domain/models/likeToFinish/ILikeToFinishFactory';
import { ILikeToFinishRepository } from '../../domain/models/likeToFinish/ILikeToFinishRepository';
import { LikeToFinish } from '../../domain/models/likeToFinish/LikeToFinish';
import { FinishId } from '../../domain/models/finish/FinishId';
import { UserId } from '../../domain/models/user/UserId';

export class LikeToFinishRepository implements ILikeToFinishRepository {
  private readonly likeToFinishFactory: ILikeToFinishFactory;

  constructor(likeToFinishFactory: ILikeToFinishFactory) {
    this.likeToFinishFactory = likeToFinishFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  readonly saveNew = async (likeToFinish: LikeToFinish) => {
    const finishLikesTable = getConnection().getRepository(FinishLikeORMEntity);

    const finishLikesData = new FinishLikeORMEntity();
    finishLikesData.id = likeToFinish.id.value;
    finishLikesData.user_id = likeToFinish.userId.value;
    finishLikesData.finish_id = likeToFinish.finishId.value;
    finishLikesData.created_at = likeToFinish.createdAt.value;

    await finishLikesTable.insert(finishLikesData);
  };

  readonly findOne = async (argsObj: {
    finishId: FinishId;
    userId: UserId;
  }) => {
    const finishLikesTable = getConnection().getRepository(FinishLikeORMEntity);
    const data = await finishLikesTable.findOne({
      where: {
        finish_id: argsObj.finishId.value,
        user_id: argsObj.userId.value,
      },
    });

    if (!data) {
      return null;
    }

    const likeToFinish = this.likeToFinishFactory.restore({
      likeToFinishIdValue: data.id,
      finishIdValue: data.finish_id,
      userIdValue: data.user_id,
      createdAtValue: data.created_at,
    });

    return likeToFinish;
  };

  // eslint-disable-next-line class-methods-use-this
  readonly delete = async (likeToFinish: LikeToFinish) => {
    const finishLikesTable = getConnection().getRepository(FinishLikeORMEntity);

    const finishLikesData = new FinishLikeORMEntity();
    finishLikesData.id = likeToFinish.id.value;
    finishLikesData.user_id = likeToFinish.userId.value;
    finishLikesData.finish_id = likeToFinish.finishId.value;
    finishLikesData.created_at = likeToFinish.createdAt.value;

    await finishLikesTable.delete(finishLikesData);
  };
}
