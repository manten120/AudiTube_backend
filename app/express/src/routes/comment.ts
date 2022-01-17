import express from 'express';
import { commentApplicationService } from '../application';
import type { CustomReq } from '../types';

const commentRouter = express.Router();

// コメントを投稿
commentRouter.post('/', (req: CustomReq, res, next) => {
  (async () => {
    const { finishId, userId, commentText } = req.body;

    if (finishId === undefined) {
      throw new Error('finishIdがundefinedです');
    }

    if (userId === undefined) {
      throw new Error('userIdがundefinedです');
    }

    if (commentText === undefined) {
      throw new Error('commentTextがundefinedです');
    }

    const result = await commentApplicationService.post({
      finishIdValue: finishId,
      userIdValue: userId,
      commentTextValue: commentText,
    });

    if (!result.ok) {
      res.send('コメントを投稿できませんでした');
      throw result.error;
    }

    return res.send('コメントを投稿しました');
  })().catch(next);
});

// コメントを削除 
commentRouter.post('/delete', (req: CustomReq, res, next) => {
  (async () => {
    // TODO: コメント投稿者本人だけが削除できるようにする

    const { commentId } = req.body;

    if (commentId === undefined) {
      throw new Error('commentIdがundefinedです');
    }

    const result = await commentApplicationService.delete(commentId);

    if (!result.ok) {
      res.send('コメントを削除できませんでした');
      throw result.error;
    }

    return res.send('コメントを削除しました');
  })().catch(next);
});

export {commentRouter}
