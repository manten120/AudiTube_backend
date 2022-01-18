import express from 'express';
import {
  likeToFinishApplicationService,
  likeToCommentApplicationService,
} from '../application';
import type { CustomReq } from '../types';

const likeRouter = express.Router();

// 聴き終わった動画・感想へのいいね
likeRouter.post('/finish', (req: CustomReq, res, next) => {
  (async () => {
    const { finishId, userId } = req.body;

    if (finishId === undefined) {
      throw new Error('finishIdがundefinedです');
    }

    if (userId === undefined) {
      throw new Error('userIdがundefinedです');
    }

    const result = await likeToFinishApplicationService.toggle({
      finishIdValue: finishId,
      userIdValue: userId,
    });

    if (!result.ok) {
      res.send('いいねまたはいいねの取り消しに失敗しました');
      throw result.error;
    }

    return res.send('いいねまたはいいねの取り消しに成功しました');
  })().catch(next);
});

// コメントへのいいね
likeRouter.post('/comment', (req: CustomReq, res, next) => {
  (async () => {
    const { commentId, userId } = req.body;

    if (commentId === undefined) {
      throw new Error('commentIdがundefinedです');
    }

    if (userId === undefined) {
      throw new Error('userIdがundefinedです');
    }

    const result = await likeToCommentApplicationService.toggle({
      commentIdValue: commentId,
      userIdValue: userId,
    });

    if (!result.ok) {
      res.send('いいねまたはいいねの取り消しに失敗しました');
      throw result.error;
    }

    return res.send('いいねまたはいいねの取り消しに成功しました');
  })().catch(next);
});

export {likeRouter}
