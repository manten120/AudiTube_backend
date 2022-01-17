import { getConnection } from 'typeorm';
import { CommentORMEntity } from '../../orm';
import { ICommentRepository } from '../../domain/models/comment/ICommentRepository';
import { Comment } from '../../domain/models/comment/Comment';
import { CommentId } from '../../domain/models/comment/CommentId';
import { ICommentFactory } from '../../domain/models/comment/ICommentFactory';

export class CommentRepository implements ICommentRepository {
  private readonly commentFactory: ICommentFactory;

  constructor(commentFactory: ICommentFactory) {
    this.commentFactory = commentFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  readonly saveNew = async (comment: Comment) => {
    const commentsTable = getConnection().getRepository(CommentORMEntity);

    const commentData = new CommentORMEntity();
    commentData.id = comment.id.value;
    commentData.finish_id = comment.finishId.value;
    commentData.user_id = comment.userId.value;
    commentData.text = comment.text.value;
    commentData.posted_at = comment.postedAt.value;
    commentData.is_restricted = false;

    await commentsTable.insert(commentData);
  };

  readonly findOneById = async (commentId: CommentId) => {
    const commentsTable = getConnection().getRepository(CommentORMEntity);

    const commentData = (
      await commentsTable.findByIds([commentId.value], {
        relations: ['likes'],
      })
    )[0];

    if(commentData === undefined) {
      return null
    }

    const likedUserIdValues = commentData.likes.map((like) => like.user_id);

    const comment = this.commentFactory.restore({
      commentIdValue: commentData.id,
      finishIdValue: commentData.finish_id,
      userIdValue: commentData.user_id,
      commentTextValue: commentData.text,
      postedAtValue: commentData.posted_at,
      isRestricted: commentData.is_restricted,
      likedUserIdValues,
    });

    return comment;
  };

  // eslint-disable-next-line class-methods-use-this
  readonly delete = async (comment: Comment) => {
    const commentsTable = getConnection().getRepository(CommentORMEntity);

    const commentData = await commentsTable.findOne({
      where: {
        id: comment.id.value,
      },
    });

    if (!commentData) {
      throw new Error('commentはすでに存在しません');
    }

    await commentsTable.remove(commentData);
  };
}
