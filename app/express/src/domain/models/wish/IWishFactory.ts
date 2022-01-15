import { Wish } from './Wish';
import type { PriorityValue } from '../../../types';

export interface IWishFactory {
  createNew: (userIdValue: string, videIdValue: string) => Promise<Wish>;

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
    wishPriorityValue: PriorityValue;
    wishRegisteredAtValue: string;
  }) => Wish;
}
