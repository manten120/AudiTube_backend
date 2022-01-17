import { getConnection } from 'typeorm';
import { FinishORMEntity } from '../../orm';
import { IFinishRepository } from '../../domain/models/finish/IFinishRepository';
import { Finish } from '../../domain/models/finish/Finish';
import { FinishId } from '../../domain/models/finish/FinishId';
import { IFinishFactory } from '../../domain/models/finish/IFinishFactory';

export class FinishRepository implements IFinishRepository {
  private readonly finishFactory: IFinishFactory;

  constructor(finishFactory: IFinishFactory) {
    this.finishFactory = finishFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  saveNew = async (finish: Finish) => {
    const finishesTable = getConnection().getRepository(FinishORMEntity);

    const finishData = new FinishORMEntity();
    finishData.id = finish.id.value;
    finishData.user_id = finish.userId.value;
    finishData.video_id = finish.videoId.value;
    finishData.review = finish.review.value;
    finishData.has_spoilers = finish.hasSpoilers;
    finishData.review_is_restricted = finish.reviewIsRestricted;
    finishData.started_at = finish.startedAt.value;
    finishData.finished_at = finish.finishedAt.value;
    finishData.registered_at = finish.registeredAt.value;
    finishData.is_restricted = finish.isRestricted;

    await finishesTable.insert(finishData);
  };

  findOneById = async (finishId: FinishId) => {
    const finishesTable = getConnection().getRepository(FinishORMEntity);

    const finishData = await finishesTable.findOne({
      where: {
        id: finishId.value,
      },
      relations: ['comments', 'likes'],
    });

    if (!finishData) {
      return null;
    }

    const commentIdValues = finishData.comments.map((comment) => comment.id);
    const likedUserIdValues = finishData.likes.map((like) => like.user_id);

    const finish = this.finishFactory.restore({
      finishIdValue: finishData.id,
      userIdValue: finishData.user_id,
      videoIdValue: finishData.video_id,
      reviewValue: finishData.review,
      hasSpoilers: finishData.has_spoilers,
      reviewIsRestricted: finishData.review_is_restricted,
      startedAtValue: finishData.started_at,
      finishedAtValue: finishData.finished_at,
      registeredAtValue: finishData.registered_at,
      isRestricted: finishData.is_restricted,
      commentIdValues,
      likedUserIdValues,
    });

    return finish;
  };

  // eslint-disable-next-line class-methods-use-this
  update = async (finish: Finish) => {
    const finishesTable = getConnection().getRepository(FinishORMEntity);

    const finishData = new FinishORMEntity();
    // finishData.id = finish.id.value;
    // finishData.user_id = finish.userId.value;
    // finishData.video_id = finish.videoId.value;
    finishData.review = finish.review.value;
    finishData.has_spoilers = finish.hasSpoilers;
    finishData.review_is_restricted = finish.reviewIsRestricted;
    finishData.started_at = finish.startedAt.value;
    finishData.finished_at = finish.finishedAt.value;
    // finishData.registered_at = finish.registeredAt.value;
    finishData.is_restricted = finish.isRestricted;

    await finishesTable.update(finish.id.value, finishData);
  };
}
