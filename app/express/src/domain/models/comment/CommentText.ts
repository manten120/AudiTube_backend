export class CommentText {
  readonly value: string;

  constructor(value: string) {
    if(value.length < 1 || value.length > 300) {
      throw new Error('コメントの文字数は1~300文字です')
    }
    this.value = value;
  }
}