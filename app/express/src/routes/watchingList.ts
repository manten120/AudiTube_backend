import express from 'express';
import { watchingApplicationService } from '../application';
import type { CustomReq } from '../types';

const watchingListRouter = express.Router();

// 聴いている動画を追加
watchingListRouter.post('/', (req: CustomReq, res, next) => {
  (async () => {
    const { userId, videoId, channelId } = req.body;

    if (!userId) {
      throw new Error('userIdがundefinedです');
    }

    if (!videoId) {
      throw new Error('videoIdがundefinedです');
    }

    if (!channelId) {
      throw new Error('channelIdがundefinedです');
    }

    const result = await watchingApplicationService.register({
      userIdValue: userId,
      videoIdValue: videoId,
      channelIdValue: channelId,
    });

    if (!result.ok) {
      res.send('聴いている動画に追加できませんでした');
      throw result.error;
    }

    return res.send('聴いている動画に追加しました');
  })().catch(next);
});

export { watchingListRouter };
