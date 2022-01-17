import { Comment } from './Comment';

export interface ICommentFactory {
  createNew: (argsObj: {
    finishIdValue: string;
    userIdValue: string;
    commentTextValue: string;
  }) => Comment;

  restore: (argsObj: {
    commentIdValue: string;
    finishIdValue: string;
    userIdValue: string;
    commentTextValue: string;
    postedAtValue: string;
    isRestricted: boolean;
    likedUserIdValues: string[];
  }) => Comment;
}
