import { User } from '../user/User';
import { Video } from '../video/Video';
import { Priority } from './Priority';
import { DateTime } from '../common/DateTime';

export class Wish {
  readonly user: User;

  readonly video: Video;

  priority: Priority;

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

  readonly changePriority = (newPriority: Priority) => {
    this.priority = newPriority;
  };
}
