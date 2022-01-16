import { Finish } from './Finish';

export interface IFinishFactory {
  createNew: (argsObj: {
    userIdValue: string;
    videoIdValue: string;
    reviewValue: string;
    hasSpoilers: boolean;
  }) => Promise<Finish>;

  // restore: (argsObj: {
  //   userIdValue: string;
  //   displayIdValue: string;
  //   userNameValue: string;
  //   channelIdValue: string;
  //   channelTitleValue: string;
  //   channelUpdatedAtValue: string;
  //   videoIdValue: string;
  //   videoTitleValue: string;
  //   videoDurationValue: string;
  //   videoUpdatedAtValue: string;
  //   wishRegisteredAtValue: string;
  // }) => Finish;
}
