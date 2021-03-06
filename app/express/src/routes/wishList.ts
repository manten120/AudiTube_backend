import express from 'express';
import { wishApplicationService } from '../application';
import type { CustomReq } from '../types';

const wishListRouter = express.Router();


// 聴きたい動画リストを取得
wishListRouter.get('/', (req: CustomReq, res, next) => {
  (async () => {
    const { userId } = req.query;

    if (!userId) {
      throw new Error('userIdがundefinedです');
    }


    const result = await wishApplicationService.getWishList(userId);

    if (!result.ok) {
      res.json(result.body);
      throw result.error;
    }

    return res.json(result.body);
  })().catch(next);
});

// 聴きたい動画を追加
wishListRouter.post('/', (req: CustomReq, res, next) => {
  (async () => {
    const { userId, videoId } = req.body;

    if (!userId) {
      throw new Error('userIdがundefinedです');
    }

    if (!videoId) {
      throw new Error('videoIdがundefinedです');
    }

    const result = await wishApplicationService.register({
      userIdValue: userId,
      videoIdValue: videoId,
    });

    if (!result.ok) {
      res.send('聴きたい動画に追加できませんでした');
      throw result.error;
    }

    return res.send('聴きたい動画に追加しました');
  })().catch(next);
});

wishListRouter.put('/', (req: CustomReq, res, next) => {
  (async () => {
    const { userId, videoId, priority } = req.body;

    if (!userId) {
      throw new Error('userIdがundefinedです');
    }

    if (!videoId) {
      throw new Error('videoIdがundefinedです');
    }

    if(!priority) {
      throw new Error('priorityがundefinedです');
    }


    const result = await wishApplicationService.changePriority({
      userIdValue: userId,
      videoIdValue: videoId,
      priorityValue: priority,
    });

    if (!result.ok) {
      res.send('優先順位を変更できませんでした');
      throw result.error;
    }
    
    return res.send('優先順位を変更しました');
  })().catch(next);
});

// 聴きたい動画を削除
wishListRouter.post('/delete', (req: CustomReq, res, next) => {
  (async () => {
    const { userId, videoId } = req.body;

    if (!userId) {
      throw new Error('userIdがundefinedです');
    }

    if (!videoId) {
      throw new Error('videoIdがundefinedです');
    }

    const result = await wishApplicationService.delete(userId, videoId);

    if (!result.ok) {
      res.send('聴きたい動画から削除できませんでした');
      throw result.error;
    }

    return res.send('聴きたい動画から削除しました');
  })().catch(next);
});

export { wishListRouter };
