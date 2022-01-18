import { getConnection } from 'typeorm';
import { CommentLikeORMEntity } from '../../orm';
import { ILikeToCommentFactory } from '../../domain/models/likeToComment/ILikeToCommentFactory';
import { ILikeToCommentRepository } from '../../domain/models/likeToComment/ILikeToCommentRepository';
import { LikeToComment } from '../../domain/models/likeToComment/LikeToComment';
import { CommentId } from '../../domain/models/comment/CommentId';
import { UserId } from '../../domain/models/user/UserId';

export class LikeToCommentRepository implements ILikeToCommentRepository {
  private readonly likeToCommentFactory: ILikeToCommentFactory;

  constructor(likeToCommentFactory: ILikeToCommentFactory) {
    this.likeToCommentFactory = likeToCommentFactory;
  }

  // eslint-disable-next-line class-methods-use-this
  readonly saveNew = async (likeToComment: LikeToComment) => {
    const commentLikesTable = getConnection().getRepository(CommentLikeORMEntity);

    const commentLikesData = new CommentLikeORMEntity();
    commentLikesData.id = likeToComment.id.value;
    commentLikesData.user_id = likeToComment.userId.value;
    commentLikesData.comment_id = likeToComment.commentId.value;
    commentLikesData.created_at = likeToComment.createdAt.value;

    await commentLikesTable.insert(commentLikesData);
  };

  readonly findOne = async (argsObj: {
    commentId: CommentId;
    userId: UserId;
  }) => {
    const commentLikesTable = getConnection().getRepository(CommentLikeORMEntity);
    const data = await commentLikesTable.findOne({
      where: {
        comment_id: argsObj.commentId.value,
        user_id: argsObj.userId.value,
      },
    });

    if (!data) {
      return null;
    }

    const likeToComment = this.likeToCommentFactory.restore({
      likeToCommentIdValue: data.id,
      commentIdValue: data.comment_id,
      userIdValue: data.user_id,
      createdAtValue: data.created_at,
    });

    return likeToComment;
  };

  // eslint-disable-next-line class-methods-use-this
  readonly delete = async (likeToComment: LikeToComment) => {
    const commentLikesTable = getConnection().getRepository(CommentLikeORMEntity);

    const commentLikesData = new CommentLikeORMEntity();
    commentLikesData.id = likeToComment.id.value;
    commentLikesData.user_id = likeToComment.userId.value;
    commentLikesData.comment_id = likeToComment.commentId.value;
    commentLikesData.created_at = likeToComment.createdAt.value;

    await commentLikesTable.delete(commentLikesData);
  };
}
