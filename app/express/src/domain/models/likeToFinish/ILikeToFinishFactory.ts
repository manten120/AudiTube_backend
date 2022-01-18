import { LikeToFinish } from './LikeToFinish';

export interface ILikeToFinishFactory {
  createNew: (argsObj: {
    finishIdValue: string;
    userIdValue: string;
  }) => LikeToFinish;
  restore: (argsObj: {
    likeToFinishIdValue: string;
    finishIdValue: string;
    userIdValue: string;
    createdAtValue: string;
  }) => LikeToFinish;
}
