import express from 'express';
import { wishApplicationService } from '../application';
import type { CustomReq } from '../types';

const wishListRouter = express.Router();

// 聴きたい動画を追加
wishListRouter.post('/', (req: CustomReq, res, next) => {
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

    const result = await wishApplicationService.register({
      userIdValue: userId,
      videoIdValue: videoId,
      channelIdValue: channelId,
    });

    if (!result.ok) {
      res.send('聴きたい動画に追加できませんでした');
      throw result.error;
    }

    return res.send('聴きたい動画に追加しました');
  })().catch(next);
});

export { wishListRouter };
