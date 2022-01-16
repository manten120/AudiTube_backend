import { FinishId } from '../finish/FinishId';
import { User } from '../user/User';
import { CommentId } from './CommentId';
import { CommentText } from './CommentText';

export class Comment {
  readonly id: CommentId;

  readonly finishId: FinishId;

  readonly user: User;

  readonly text: CommentText;

  constructor(argsObj: {
    id: CommentId;
    finishId: FinishId;
    user: User;
    text: CommentText;
  }) {
    this.id = argsObj.id;
    this.finishId = argsObj.finishId;
    this.user = argsObj.user;
    this.text = argsObj.text;
  }
}
