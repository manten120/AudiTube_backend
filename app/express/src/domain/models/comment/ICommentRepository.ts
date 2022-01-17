import { Comment } from './Comment';
import { CommentId } from './CommentId';

export interface ICommentRepository {
  saveNew: (comment: Comment) => Promise<void>;

  findOneById: (commentId: CommentId) => Promise<Comment | null>;

  delete: (comment: Comment) => Promise<void>;
}
