import path from 'path';
import { createConnection } from 'typeorm';

export const connectToDB = () =>
  createConnection({
    type: 'mysql',
    host: 'mysql8',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [
      path.join(
        __dirname,
        process.env.NODE_ENV === 'production' ? 'entity/*.js' : 'entity/*.ts'
      ),
    ],
    synchronize: true,
  });

export { BlockORMEntity } from './entity/BlockORMEntity';
export { ChannelORMEntity } from './entity/ChannelORMEntity';
export { CommentORMEntity } from './entity/CommentORMEntity';
export { FollowRMEntity } from './entity/FollowsORMEntity';
export { ReadingQualityORMEntity } from './entity/ReadingQuality';
export { ReasonORMEntity } from './entity/ReasonOrmEntity';
export { WishORMEntity } from './entity/WishORMEntity';
export { SoundQualityORMEntity } from './entity/SoundQualityORMEntity';
export { UserORMEntity } from './entity/UserORMEntity';
export { VideoORMEntity } from './entity/VideoORMEntity';
export { FinishORMEntity } from './entity/FinishORMEntity';
export { WatchingORMEntity } from './entity/WatchingORMEntity';
export { FinishLikeORMEntity } from './entity/FinishLikeORMEntity';
export { CommentLikeORMEntity } from './entity/CommentLikeORMEntity';
