import { getConnection } from 'typeorm';
import { FinishORMEntity } from '../../orm';
import { IFinishRepository } from '../../domain/models/finish/IFinishRepository';
import { Finish } from '../../domain/models/finish/Finish';

export class FinishRepository implements IFinishRepository {
  // eslint-disable-next-line class-methods-use-this
  saveNew = async (finish: Finish) => {
    const finishesTable = getConnection().getRepository(FinishORMEntity);

    const finishData = new FinishORMEntity();
    finishData.id = finish.id.value;
    finishData.user_id = finish.user.id.value;
    finishData.video_id = finish.video.id.value;
    finishData.review = finish.review.value;
    finishData.has_spoilers = finish.hasSpoilers;
    finishData.review_is_restricted = finish.reviewIsRestricted;
    finishData.started_at = finish.startedAt.value;
    finishData.finished_at = finish.finishedAt.value;
    finishData.registered_at = finish.registeredAt.value;
    finishData.is_restricted = finish.isRestricted;

    await finishesTable.insert(finishData)
  };
}
