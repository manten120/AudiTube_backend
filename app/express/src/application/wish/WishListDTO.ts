import { Wish } from '../../domain/models/wish/Wish';
import type { PriorityValue } from '../../types';

export class WishListDTO {
  videoId: string;

  videoTitle: string;

  videoDuration: string;

  channelId: string;

  channelTitle: string;

  priority: PriorityValue;

  registeredAt: string;

  constructor(wish: Wish) {
    this.videoId = wish.video.id.value;
    this.videoTitle = wish.video.title.value;
    this.videoDuration = wish.video.duration.value;
    this.channelId = wish.video.channel.id.value;
    this.channelTitle = wish.video.channel.title.value;
    this.priority = wish.priority.value;
    this.registeredAt = wish.registeredAt.value
  }
}
