import { ListService } from '../../domain/Services/ListService';
import { IFinishRepository } from '../../domain/models/finish/IFinishRepository';
import { FinishId } from '../../domain/models/finish/FinishId';
import { DateTime } from '../../domain/models/common/DateTime';
import { Review } from '../../domain/models/finish/Review';

export class FinishApplicationService {
  private readonly listService: ListService;

  private readonly finishRepository: IFinishRepository;

  constructor(argsObj: {
    listService: ListService;
    finishRepository: IFinishRepository;
  }) {
    this.listService = argsObj.listService;
    this.finishRepository = argsObj.finishRepository;
  }

  readonly register = async (argsObj: {
    userIdValue: string;
    videoIdValue: string;
    reviewValue: string;
    hasSpoilers: boolean;
  }) => {
    try {
      await this.listService.registerFinish(argsObj);
      return { ok: true, error: null };
    } catch (e) {
      return { ok: false, error: e };
    }
  };

  readonly update = async (argsObj: {
    finishIdValue: string;
    reviewValue: string;
    hasSpoilers: boolean;
    startedAtValue: string;
    finishedAtValue: string;
  }) => {
    try {
      const {
        finishIdValue,
        reviewValue,
        hasSpoilers,
        startedAtValue,
        finishedAtValue,
      } = argsObj;

      const finishId = FinishId.restore(finishIdValue);
      const finish = await this.finishRepository.findOneById(finishId);

      if (!finish) {
        throw new Error('更新対象のfinishが存在しません')
      }

      const review = new Review(reviewValue);
      const startedAt = DateTime.restore(startedAtValue);
      const finishedAt = DateTime.restore(finishedAtValue);

      finish.editReview(review);
      finish.changeHasSpoilers(hasSpoilers);
      finish.changeStartedAt(startedAt);
      finish.changeFinishedAt(finishedAt);

      await this.finishRepository.update(finish);

      return { ok: true, error: null };
    } catch (e) {
      return { ok: false, error: e };
    }
  };
}
