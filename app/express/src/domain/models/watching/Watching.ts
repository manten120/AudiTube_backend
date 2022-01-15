import { User } from '../user/User';
import { Video } from '../video/Video';
import { Priority } from '../wish/Priority';
import { DateTime } from '../common/DateTime';

export class Watching {
  readonly user: User;

  readonly video: Video;

  readonly priority: Priority;

  readonly registeredAt: DateTime;

  constructor(argsObj: {
    user: User;
    video: Video;
    registeredAt: DateTime;
    priority: Priority;
  }) {
    this.user = argsObj.user;
    this.video = argsObj.video;
    this.priority = argsObj.priority;
    this.registeredAt = argsObj.registeredAt;
  }
}
