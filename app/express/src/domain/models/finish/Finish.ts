import { DateTime } from '../common/DateTime';
import { User } from '../user/User';
import { Video } from '../video/Video';
import { FinishId } from './FinishId';
import { Review } from './Review';
import { Comment } from '../comment/Comment';
import { Watching } from '../watching/Watching';

export class Finish {
  readonly id: FinishId;

  readonly user: User;

  readonly video: Video;

  review: Review;

  hasSpoilers: boolean; // ネタバレの有無

  reviewIsRestricted: boolean;

  startedAt: DateTime; // 聴き始めた日

  finishedAt: DateTime; // 聴き終えた日

  readonly registeredAt: DateTime; // 聴き終わった日リストに登録した日

  readonly comments: Comment[]; // 古い順

  readonly favorites: User[]; // 新しい順 いいねしたユーザー

  isRestricted: boolean; // ほかユーザーへの公開が制限されているか

  constructor(argsObj: {
    id: FinishId;
    user: User;
    video: Video;
    review: Review;
    hasSpoilers: boolean;
    reviewIsRestricted: boolean;
    startedAt: DateTime;
    finishedAt: DateTime;
    registeredAt: DateTime;
    comments: Comment[];
    favorites: User[];
    isRestricted: boolean;
  }) {
    this.id = argsObj.id;
    this.user = argsObj.user;
    this.video = argsObj.video;
    this.review = argsObj.review;
    this.hasSpoilers = argsObj.hasSpoilers;
    this.reviewIsRestricted = argsObj.reviewIsRestricted;
    this.startedAt = argsObj.startedAt;
    this.finishedAt = argsObj.finishedAt;
    this.registeredAt = argsObj.registeredAt;
    this.comments = argsObj.comments;
    this.favorites = argsObj.favorites;
    this.isRestricted = argsObj.isRestricted;
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

  readonly inheritRegisteredAtOfWatchingAsStartedAt = (watching: Watching | null) => {
    const isSameVideoAndUser = watching
      ? this.video.equals(watching.video) && this.user.equals(watching.user)
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
