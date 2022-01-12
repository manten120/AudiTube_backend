import express from 'express';
import { getConnection } from 'typeorm';

import { UserORMEntity } from '../orm';
import type { GetReq, PostReq } from '../types';

const router = express.Router();

router.get('/', (req: GetReq, res, next) => {
  (async () => {
    const { id } = req.query;

    if (!id) {
      return res.send('idを指定してください');
    }

    const userTable = getConnection().getRepository(UserORMEntity);
    const userData = await userTable.findOne({ where: { id } });

    const response = userData
      ? `id: ${id} のユーザーが見つかりました。 firstName: ${userData.name}`
      : `id: ${id} のユーザーは存在しません`;

    return res.send(response);
  })().catch(next);
});

router.post('/', (req: PostReq, res, next) => {
  (async () => {
    const { firstName, lastName } = req.body;

    if (!firstName) {
      return res.send('firstNameを入力してください');
    }

    if (!lastName) {
      return res.send('lastNameを入力してください');
    }

    const userData = new UserORMEntity();
    userData.name = firstName;

    const userTable = getConnection().getRepository(UserORMEntity);
    await userTable.save(userData);

    const response = `ユーザーを登録しました`;

    return res.send(response);
  })().catch(next);
});

export { router as userRouter };
