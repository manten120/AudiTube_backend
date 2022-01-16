import { CommentId } from '../comment/CommentId';
import { DateTime } from '../common/DateTime';
import { FinishId } from '../finish/FinishId';
import { User } from '../user/User';

export class Favorite {
  readonly targetId: FinishId | CommentId;

  readonly user: User;

  readonly createdAt: DateTime;

  constructor(targetId: FinishId | CommentId, user: User, createdAt: DateTime) {
    this.targetId = targetId;
    this.user = user;
    this.createdAt = createdAt;
  }
}
