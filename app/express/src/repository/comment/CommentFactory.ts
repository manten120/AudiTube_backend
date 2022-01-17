import { Comment } from '../../domain/models/comment/Comment';
import { CommentId } from '../../domain/models/comment/CommentId';
import { CommentText } from '../../domain/models/comment/CommentText';
import { ICommentFactory } from '../../domain/models/comment/ICommentFactory';
import { DateTime } from '../../domain/models/common/DateTime';
import { FinishId } from '../../domain/models/finish/FinishId';
import { UserId } from '../../domain/models/user/UserId';

export class CommentFactory implements ICommentFactory {
  // eslint-disable-next-line class-methods-use-this
  readonly createNew = (argsObj: {
    finishIdValue: string;
    userIdValue: string;
    commentTextValue: string;
  }) => {
    const id = CommentId.createNew();
    const finishId = FinishId.restore(argsObj.finishIdValue);
    const userId = new UserId(argsObj.userIdValue);
    const text = new CommentText(argsObj.commentTextValue);
    const postedAt = DateTime.now();

    const comment = new Comment({
      id,
      finishId,
      userId,
      text,
      postedAt,
    });

    return comment;
  };
}
