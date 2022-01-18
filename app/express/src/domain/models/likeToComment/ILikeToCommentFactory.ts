import { LikeToComment } from './LikeToComment';

export interface ILikeToCommentFactory {
  createNew: (argsObj: {
    commentIdValue: string;
    userIdValue: string;
  }) => LikeToComment;
  restore: (argsObj: {
    likeToCommentIdValue: string;
    commentIdValue: string;
    userIdValue: string;
    createdAtValue: string;
  }) => LikeToComment;
}
