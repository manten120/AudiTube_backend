import { Channel } from '../channel/Channel';
import { VideoId } from './VideoId';
import { VideoTitle } from './VideoTitle';
import { VideoDuration } from './VideoDuration';
import { DateTime } from '../common/DateTime';

export class Video {
  readonly id: VideoId;

  title: VideoTitle;

  readonly duration: VideoDuration;

  readonly channel: Channel;

  updatedAt: DateTime

  constructor(
    id: VideoId,
    title: VideoTitle,
    duration: VideoDuration,
    updatedAt: DateTime,
    channel: Channel,
  ) {
    this.id = id;
    this.title = title;
    this.duration = duration;
    this.updatedAt = updatedAt;
    this.channel = channel;
  }

  readonly equals = (video: Video) => {
    if (this.id.equals(video.id)) {
      return true;
    }
    return false;
  };

  readonly changeTitle = (newTitle: VideoTitle) => {
    this.title = newTitle;
    this.updatedAt = DateTime.now();
  }
}
