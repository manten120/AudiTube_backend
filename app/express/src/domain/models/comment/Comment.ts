import { DateTime } from '../common/DateTime';
import { FinishId } from '../finish/FinishId';
import { UserId } from '../user/UserId';
import { CommentId } from './CommentId';
import { CommentText } from './CommentText';

export class Comment {
  readonly id: CommentId;

  readonly finishId: FinishId;

  readonly userId: UserId;

  readonly text: CommentText;

  readonly postedAt: DateTime;

  isRestricted: boolean; // ほかユーザーへの公開が制限されているか

  readonly likedUsers: UserId[]; // いいねしたユーザーの識別子

  constructor(argsObj: {
    id: CommentId;
    finishId: FinishId;
    userId: UserId;
    text: CommentText;
    postedAt: DateTime;
    isRestricted: boolean;
    likedUsers: UserId[]
  }) {
    this.id = argsObj.id;
    this.finishId = argsObj.finishId;
    this.userId = argsObj.userId;
    this.text = argsObj.text;
    this.postedAt = argsObj.postedAt;
    this.isRestricted = argsObj.isRestricted;
    this.likedUsers = argsObj.likedUsers;
  }
}
