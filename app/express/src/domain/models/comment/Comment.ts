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

  constructor(argsObj: {
    id: CommentId;
    finishId: FinishId;
    userId: UserId;
    text: CommentText;
    postedAt: DateTime;
  }) {
    this.id = argsObj.id;
    this.finishId = argsObj.finishId;
    this.userId = argsObj.userId;
    this.text = argsObj.text;
    this.postedAt = argsObj.postedAt;
  }
}
