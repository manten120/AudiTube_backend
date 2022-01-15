import { Channel } from './Channel';

export interface IChannelFactory {
  createNew: (channelIdValue: string, channelTitleValue: string) => Channel;

  restore: (argsObj: {
    channelIdValue: string;
    channelTitleValue: string;
    channelUpdatedAtValue: string;
  }) => Channel;
}
