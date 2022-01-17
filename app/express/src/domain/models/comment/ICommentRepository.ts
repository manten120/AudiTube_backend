import { Comment } from './Comment';

export interface ICommentRepository {
  saveNew: (comment: Comment) => Promise<void>;
}
