import { Watching } from '../../domain/models/watching/Watching';
import type { PriorityValue } from '../../types';

export class WatchingListDTO {
  videoId: string;

  videoTitle: string;

  videoDuration: string;

  channelId: string;

  channelTitle: string;

  priority: PriorityValue;

  registeredAt: string;

  constructor(watching: Watching) {
    this.videoId = watching.video.id.value;
    this.videoTitle = watching.video.title.value;
    this.videoDuration = watching.video.duration.value;
    this.channelId = watching.video.channel.id.value;
    this.channelTitle = watching.video.channel.title.value;
    this.priority = watching.priority.value;
    this.registeredAt = watching.registeredAt.value
  }
}
