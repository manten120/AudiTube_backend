import { CommentId } from '../../domain/models/comment/CommentId';
import { ILikeToCommentRepository } from '../../domain/models/likeToComment/ILikeToCommentRepository';
import { ILikeToCommentFactory } from '../../domain/models/likeToComment/ILikeToCommentFactory';
import { UserId } from '../../domain/models/user/UserId';

export class LikeToCommentApplicationService {
  readonly likeToCommentRepository: ILikeToCommentRepository;

  readonly likeToCommentFactory: ILikeToCommentFactory;

  constructor(argsObj: {
    likeToCommentRepository: ILikeToCommentRepository;
    likeToCommentFactory: ILikeToCommentFactory;
  }) {
    this.likeToCommentRepository = argsObj.likeToCommentRepository;
    this.likeToCommentFactory = argsObj.likeToCommentFactory;
  }

  readonly toggle = async (argsObj: {
    commentIdValue: string;
    userIdValue: string;
  }) => {
    try {
      const { commentIdValue, userIdValue } = argsObj;

      const commentId = CommentId.restore(commentIdValue);
      const userId = new UserId(userIdValue);

      const like = await this.likeToCommentRepository.findOne({
        commentId,
        userId,
      });

      if (like) {
        await this.likeToCommentRepository.delete(like);
      } else {
        const newLike = this.likeToCommentFactory.createNew({
          commentIdValue,
          userIdValue,
        });
        await this.likeToCommentRepository.saveNew(newLike);
      }

      return { ok: true, error: null };
    } catch (e) {
      return { ok: false, error: e };
    }
  };
}
