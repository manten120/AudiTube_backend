import { ListService } from '../../domain/Services/ListService';

export class FinishApplicationService {
  readonly listService: ListService;

  constructor(listService: ListService) {
    this.listService = listService;
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
}
