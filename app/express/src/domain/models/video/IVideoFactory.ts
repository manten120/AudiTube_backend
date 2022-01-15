import { Channel } from '../channel/Channel';
import { Video } from './Video';

export interface IVideoFactory {
  createNew: (argsObj: {
    videoIdValue: string;
    videoTitleValue: string;
    videoDurationValue: string;
    channelIdValue: string;
  }) => Promise<Video>;

  restore: (argsObj: {
    videoIdValue: string;
    videoTitleValue: string;
    videoDurationValue: string;
    videoUpdatedAtValue: string;
    channel: Channel;
  }) => Video;
}
