import { CommentId } from '../../domain/models/comment/CommentId';
import { ICommentFactory } from '../../domain/models/comment/ICommentFactory';
import { ICommentRepository } from '../../domain/models/comment/ICommentRepository';
import { FinishId } from '../../domain/models/finish/FinishId';
import { IFinishRepository } from '../../domain/models/finish/IFinishRepository';
import { IUserRepository } from '../../domain/models/user/IUserRepository';
import { UserId } from '../../domain/models/user/UserId';

export class CommentApplicationService {
  private readonly finishRepository: IFinishRepository;

  private readonly userRepository: IUserRepository;

  private readonly commentFactory: ICommentFactory;

  private readonly commentRepository: ICommentRepository;

  constructor(argsObj: {
    finishRepository: IFinishRepository;
    userRepository: IUserRepository;
    commentFactory: ICommentFactory;
    commentRepository: ICommentRepository;
  }) {
    this.finishRepository = argsObj.finishRepository;
    this.userRepository = argsObj.userRepository;
    this.commentFactory = argsObj.commentFactory;
    this.commentRepository = argsObj.commentRepository;
  }

  readonly post = async (argsObj: {
    finishIdValue: string;
    userIdValue: string;
    commentTextValue: string;
  }) => {
    try {
      const { finishIdValue, userIdValue, commentTextValue } = argsObj;

      const finishId = FinishId.restore(finishIdValue);
      const userId = new UserId(userIdValue);

      const finishPromise = this.finishRepository.findOneById(finishId);
      const userPromise = this.userRepository.findOneById(userId);

      const [finish, user] = await Promise.all([finishPromise, userPromise]);

      if (!finish) {
        throw new Error('finishが存在しません');
      }

      if (!user) {
        throw new Error('userが存在しません');
      }

      const comment = this.commentFactory.createNew({
        finishIdValue,
        userIdValue,
        commentTextValue,
      });

      await this.commentRepository.saveNew(comment);

      return { ok: true, error: null };
    } catch (e) {
      return { ok: false, error: e };
    }
  };

  readonly delete = async (commentIdValue: string) => {
    try {
      const commentId = CommentId.restore(commentIdValue);

      const comment = await this.commentRepository.findOneById(commentId);

      await this.commentRepository.delete(comment);

      return { ok: true, error: null };
    } catch (e) {
      return { ok: false, error: e };
    }
  };
}
