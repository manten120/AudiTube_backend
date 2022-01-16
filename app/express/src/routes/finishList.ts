import express from 'express';
import { finishApplicationService } from '../application';
import type { CustomReq } from '../types';

const finishListRouter = express.Router();

// 聴き終わった動画を追加
finishListRouter.post('/', (req: CustomReq, res, next) => {
  (async () => {
    const { userId, videoId, review, hasSpoilers } = req.body;

    if (userId === undefined) {
      throw new Error('userIdがundefinedです');
    }

    if (videoId === undefined) {
      throw new Error('videoIdがundefinedです');
    }

    if (review === undefined) {
      throw new Error('reviewがundefinedです');
    }

    if (hasSpoilers === undefined) {
      throw new Error('hasSpoilersがundefinedです');
    }

    const result = await finishApplicationService.register({
      userIdValue: userId,
      videoIdValue: videoId,
      reviewValue: review,
      hasSpoilers,
    });

    if (!result.ok) {
      res.send('聴き終わった動画に追加できませんでした');
      throw result.error;
    }

    return res.send('聴き終わった動画に追加しました');
  })().catch(next);
});

export { finishListRouter };
