import { Comment } from "./Comment";

export interface ICommentFactory {
  createNew: (argsObj: { finishIdValue:string; userIdValue: string; commentTextValue: string }) => Comment;
}