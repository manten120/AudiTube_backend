import { Comment } from './Comment';
import { CommentId } from './CommentId';

export interface ICommentRepository {
  saveNew: (comment: Comment) => Promise<void>;

  findOneById: (commentId: CommentId) => Promise<Comment>;

  delete: (comment: Comment) => Promise<void>;
}
