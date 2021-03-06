import express from 'express';
import { watchingApplicationService } from '../application';
import type { CustomReq } from '../types';

const watchingListRouter = express.Router();

// 聴いている動画リストを取得
watchingListRouter.get('/', (req: CustomReq, res, next) => {
  (async () => {
    const { userId } = req.query;

    if (!userId) {
      throw new Error('userIdがundefinedです');
    }


    const result = await watchingApplicationService.getWatchingList(userId);

    if (!result.ok) {
      res.json(result.body);
      throw result.error;
    }

    return res.json(result.body);
  })().catch(next);
});

// 聴いている動画を追加
watchingListRouter.post('/', (req: CustomReq, res, next) => {
  (async () => {
    const { userId, videoId } = req.body;

    if (!userId) {
      throw new Error('userIdがundefinedです');
    }

    if (!videoId) {
      throw new Error('videoIdがundefinedです');
    }

    const result = await watchingApplicationService.register({
      userIdValue: userId,
      videoIdValue: videoId,
    });

    if (!result.ok) {
      res.send('聴いている動画に追加できませんでした');
      throw result.error;
    }

    return res.send('聴いている動画に追加しました');
  })().catch(next);
});

watchingListRouter.put('/', (req: CustomReq, res, next) => {
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


    const result = await watchingApplicationService.changePriority({
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

watchingListRouter.post('/delete', (req: CustomReq, res, next) => {
  (async () => {
    const { userId, videoId } = req.body;

    if (!userId) {
      throw new Error('userIdがundefinedです');
    }

    if (!videoId) {
      throw new Error('videoIdがundefinedです');
    }

    const result = await watchingApplicationService.delete(userId, videoId);

    if (!result.ok) {
      res.send('聴いている動画から削除できませんでした');
      throw result.error;
    }

    return res.send('聴いている動画から削除しました');
  })().catch(next);
});

export { watchingListRouter };
