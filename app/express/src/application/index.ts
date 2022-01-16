import { UserApplicationService } from './user/UserApplicationService';
import { UserRepository } from '../repository/user/userRepository';
import { UserFactory } from '../repository/user/userFactory';
import { AuthUserRepository } from '../repository/authUser/authUserRepository';
import { AuthUserFactory } from '../repository/authUser/authUserFactory';
import { UserService } from '../domain/Services/UserService';
import { WishFactory } from '../repository/wish/WishFactory';
import { ChannelFactory } from '../repository/channel/ChannelFactory';
import { ChannelRepository } from '../repository/channel/ChannelRepository';
import { VideoFactory } from '../repository/video/VideoFactory';
import { VideoRepository } from '../repository/video/VideoRepository';
import { WishRepository } from '../repository/wish/WishRepository';
import { WatchingFactory } from '../repository/watching/WatchingFactory';
import { WatchingRepository } from '../repository/watching/WatchingRepository';
import { WishApplicationService } from './wish/WishApplicationService';
import { ListService } from '../domain/Services/ListService';
import { WatchingApplicationService } from './watching/WatchingApplicationService';
import { FinishRepository } from '../repository/finish/FinishRepository';
import { FinishFactory } from '../repository/finish/FinishFactory';
import { FinishApplicationService } from './finish/FinishApplicationService';

const userFactory = new UserFactory();
const userRepository = new UserRepository(userFactory);
const authUserFactory = new AuthUserFactory();
const authUserRepository = new AuthUserRepository(authUserFactory);
const userService = new UserService(userRepository);

export const userApplicationService = new UserApplicationService({
  userService,
  userRepository,
  userFactory,
  authUserRepository,
  authUserFactory,
});

const channelFactory = new ChannelFactory();
const channelRepository = new ChannelRepository(channelFactory);

const videoFactory = new VideoFactory(channelRepository);
const videoRepository = new VideoRepository(videoFactory, channelFactory);

const wishFactory = new WishFactory({
  userRepository,
  videoRepository,
  userFactory,
  videoFactory,
  channelFactory,
});

const wishRepository = new WishRepository(wishFactory);

const watchingFactory = new WatchingFactory({
  userRepository,
  videoRepository,
  userFactory,
  videoFactory,
  channelFactory,
});

const watchingRepository = new WatchingRepository(watchingFactory);

const finishFactory = new FinishFactory({ userRepository, videoRepository });
const finishRepository = new FinishRepository();

const listService = new ListService({
  channelRepository,
  channelFactory,
  videoRepository,
  videoFactory,
  wishRepository,
  wishFactory,
  watchingRepository,
  watchingFactory,
  finishFactory,
  finishRepository,
});

export const wishApplicationService = new WishApplicationService({
  wishRepository,
  listService,
});

export const watchingApplicationService = new WatchingApplicationService({
  watchingRepository,
  listService,
});

export const finishApplicationService = new FinishApplicationService(
  listService
);
