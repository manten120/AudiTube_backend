import { DateTime } from '../common/DateTime';
import { CommentId } from '../comment/CommentId';
import { UserId } from '../user/UserId';
import { LikeToCommentId } from './LikeToCommentId';

export class LikeToComment {
  readonly id: LikeToCommentId;

  readonly commentId: CommentId;

  readonly userId: UserId;

  readonly createdAt: DateTime;

  constructor(argsObj: {
    id: LikeToCommentId;
    commentId: CommentId;
    userId: UserId;
    createdAt: DateTime;
  }) {

    this.id = argsObj.id
    this.commentId = argsObj.commentId;
    this.userId = argsObj.userId;
    this.createdAt = argsObj.createdAt;
  }
}
