import { Finish } from './Finish';

export interface IFinishFactory {
  createNew: (argsObj: {
    userIdValue: string;
    videoIdValue: string;
    reviewValue: string;
    hasSpoilers: boolean;
  }) => Finish;

  restore: (argsObj: {
    finishIdValue: string;
    userIdValue: string;
    videoIdValue: string;
    reviewValue: string;
    hasSpoilers: boolean;
    reviewIsRestricted: boolean;
    startedAtValue: string;
    finishedAtValue: string;
    registeredAtValue: string;
    isRestricted: boolean
    commentIdValues: string[];
    likedUserIdValues: string[];
  }) => Finish;
}
