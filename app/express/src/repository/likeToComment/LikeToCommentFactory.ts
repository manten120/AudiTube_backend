import { DateTime } from '../../domain/models/common/DateTime';
import { CommentId } from '../../domain/models/comment/CommentId';
import { ILikeToCommentFactory } from '../../domain/models/likeToComment/ILikeToCommentFactory';
import { LikeToComment } from '../../domain/models/likeToComment/LikeToComment';
import { LikeToCommentId } from '../../domain/models/likeToComment/LikeToCommentId';
import { UserId } from '../../domain/models/user/UserId';

export class LikeToCommentFactory implements ILikeToCommentFactory {
  // eslint-disable-next-line class-methods-use-this
  readonly createNew = (argsObj: {
    commentIdValue: string;
    userIdValue: string;
  }) => {
    const id = LikeToCommentId.createNew();
    const commentId = CommentId.restore(argsObj.commentIdValue);
    const userId = new UserId(argsObj.userIdValue);
    const createdAt = DateTime.now();

    const likeToFinish = new LikeToComment({
      id,
      commentId,
      userId,
      createdAt,
    });

    return likeToFinish;
  };

  // eslint-disable-next-line class-methods-use-this
  readonly restore = (argsObj: {
    likeToCommentIdValue: string;
    commentIdValue: string;
    userIdValue: string;
    createdAtValue: string;
  }) => {
    const id = LikeToCommentId.restore(argsObj.likeToCommentIdValue);
    const commentId = CommentId.restore(argsObj.commentIdValue);
    const userId = new UserId(argsObj.userIdValue);
    const createdAt = DateTime.restore(argsObj.createdAtValue);

    const likeToComment = new LikeToComment({
      id,
      commentId,
      userId,
      createdAt,
    });

    return likeToComment;
  };
}
