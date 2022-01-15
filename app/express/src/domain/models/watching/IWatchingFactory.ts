import { Watching } from './Watching';
import type { PriorityValue } from '../../../types';

export interface IWatchingFactory {
  createNew: (userIdValue: string, videIdValue: string) => Promise<Watching>;

  restore: (argsObj: {
    userIdValue: string;
    displayIdValue: string;
    userNameValue: string;
    channelIdValue: string;
    channelTitleValue: string;
    channelUpdatedAtValue: string;
    videoIdValue: string;
    videoTitleValue: string;
    videoDurationValue: string;
    videoUpdatedAtValue: string;
    watchingPriorityValue: PriorityValue;
    watchingRegisteredAtValue: string;
  }) => Watching;
}
