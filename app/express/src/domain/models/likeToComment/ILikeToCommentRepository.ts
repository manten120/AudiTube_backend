import { CommentId } from '../comment/CommentId';
import { UserId } from '../user/UserId';
import { LikeToComment } from './LikeToComment';

export interface ILikeToCommentRepository {
  saveNew: (likeToComment: LikeToComment) => Promise<void>;
  findOne: (argsObj: {
    commentId: CommentId;
    userId: UserId;
  }) => Promise<LikeToComment | null>;
  delete: (likeToComment: LikeToComment) => Promise<void>;
}
