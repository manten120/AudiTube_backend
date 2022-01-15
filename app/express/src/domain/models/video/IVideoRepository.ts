import { Video } from './Video';
import { VideoId } from './VideoId';

export interface IVideoRepository {
  saveNew: (video: Video) => Promise<void>;

  findOneById: (videoId: VideoId) => Promise<Video | null>;
}
