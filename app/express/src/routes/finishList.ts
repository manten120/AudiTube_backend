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

// 聴き終わった動画に関する情報を変更
finishListRouter.put('/', (req: CustomReq, res, next) => {
  (async () => {
    const { finishId, review, hasSpoilers, startedAt, finishedAt } = req.body;

    if (finishId === undefined) {
      throw new Error('finishIdがundefinedです');
    }

    if (review === undefined) {
      throw new Error('reviewがundefinedです');
    }

    if (hasSpoilers === undefined) {
      throw new Error('hasSpoilersがundefinedです');
    }

    if (startedAt === undefined) {
      throw new Error('startedAtがundefinedです');
    }

    if (finishedAt === undefined) {
      throw new Error('finishedAtがundefinedです');
    }

    const result = await finishApplicationService.update({
      finishIdValue: finishId,
      reviewValue: review,
      hasSpoilers,
      startedAtValue: startedAt,
      finishedAtValue: finishedAt,
    });

    if (!result.ok) {
      res.send('聴き終わった動画に関する情報を変更できませんでした');
      throw result.error;
    }

    return res.send('聴き終わった動画に関する情報を変更しました');
  })().catch(next);
});

// 聴き終わった動画を削除
finishListRouter.post('/delete', (req: CustomReq, res, next) => {
  (async () => {
    // TODO: 本人だけが削除できるようにする

    const { finishId } = req.body;

    if (finishId === undefined) {
      throw new Error('finishIdがundefinedです');
    }

    const result = await finishApplicationService.delete(finishId);

    if (!result.ok) {
      res.send('聴き終わった動画をを削除できませんでした');
      throw result.error;
    }

    return res.send('聴き終わった動画をを削除しました');
  })().catch(next);
});

export { finishListRouter };
