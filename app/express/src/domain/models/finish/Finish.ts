import { DateTime } from '../common/DateTime';
import { FinishId } from './FinishId';
import { Review } from './Review';
import { Watching } from '../watching/Watching';
import { UserId } from '../user/UserId';
import { CommentId } from '../comment/CommentId';
import { VideoId } from '../video/VideoId';

export class Finish {
  readonly id: FinishId;

  readonly userId: UserId;

  readonly videoId: VideoId;

  review: Review;

  hasSpoilers: boolean; // ネタバレの有無

  reviewIsRestricted: boolean;

  startedAt: DateTime; // 聴き始めた日

  finishedAt: DateTime; // 聴き終えた日

  readonly registeredAt: DateTime; // 聴き終わった日リストに登録した日

  readonly comments: CommentId[]; // コメントの識別子

  readonly likedUsers: UserId[]; // いいねしたユーザーの識別子

  isRestricted: boolean; // ほかユーザーへの公開が制限されているか

  constructor(argsObj: {
    id: FinishId;
    userId: UserId;
    videoId: VideoId;
    review: Review;
    hasSpoilers: boolean;
    reviewIsRestricted: boolean;
    startedAt: DateTime;
    finishedAt: DateTime;
    registeredAt: DateTime;
    isRestricted: boolean;
    comments: CommentId[];
    likedUsers: UserId[];
  }) {
    this.id = argsObj.id;
    this.userId = argsObj.userId;
    this.videoId = argsObj.videoId;
    this.review = argsObj.review;
    this.hasSpoilers = argsObj.hasSpoilers;
    this.reviewIsRestricted = argsObj.reviewIsRestricted;
    this.startedAt = argsObj.startedAt;
    this.finishedAt = argsObj.finishedAt;
    this.registeredAt = argsObj.registeredAt;
    this.isRestricted = argsObj.isRestricted;
    this.comments = argsObj.comments;
    this.likedUsers = argsObj.likedUsers;
  }

  readonly editReview = (editedReview: Review) => {
    this.review = editedReview;
  };

  readonly changeHasSpoilers = (hasSpoilers: boolean) => {
    this.hasSpoilers = hasSpoilers;
  };

  readonly changeReviewIsRestricted = (reviewIsRestricted: boolean) => {
    this.reviewIsRestricted = reviewIsRestricted;
  };

  readonly changeStartedAt = (startedAt: DateTime) => {
    this.startedAt = startedAt;
  };

  readonly inheritRegisteredAtOfWatchingAsStartedAt = (
    watching: Watching | null
  ) => {
    const isSameVideoAndUser = watching
      ? this.videoId.equals(watching.video.id) && this.userId.equals(watching.user.id) // TODO watchingのリファクタ後、equals()の引数を変更する
      : false;

    if (watching && isSameVideoAndUser) {
      this.changeStartedAt(watching.registeredAt);
    }
  };

  readonly changeFinishedAt = (finishedAt: DateTime) => {
    this.finishedAt = finishedAt;
  };

  readonly changeIsRestricted = (isRestricted: boolean) => {
    this.isRestricted = isRestricted;
  };
}
