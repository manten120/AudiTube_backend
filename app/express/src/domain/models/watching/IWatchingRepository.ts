import { UserId } from "../user/UserId";
import { VideoId } from "../video/VideoId";
import { Watching } from "./Watching";

export interface IWatchingRepository {
  saveNew: (watching: Watching) => Promise<void>;

  findOne: (userId: UserId, videoId: VideoId) => Promise<Watching | null>;

  findAllByUserId: (userId: UserId) => Promise<Watching[]>

  delete: (watching: Watching) => Promise<void>;
}