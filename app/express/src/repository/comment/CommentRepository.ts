import { getConnection } from 'typeorm';
import { CommentORMEntity } from '../../orm';
import { ICommentRepository } from '../../domain/models/comment/ICommentRepository';
import { Comment } from '../../domain/models/comment/Comment';

export class CommentRepository implements ICommentRepository {
  // eslint-disable-next-line class-methods-use-this
  readonly saveNew = async (comment: Comment) => {
    const commentsTable = getConnection().getRepository(CommentORMEntity);

    const commentData = new CommentORMEntity();
    commentData.id = comment.id.value;
    commentData.finish_id = comment.finishId.value;
    commentData.user_id = comment.userId.value;
    commentData.text = comment.text.value;
    commentData.posted_at = comment.postedAt.value;

    await commentsTable.insert(commentData);
  };
}
