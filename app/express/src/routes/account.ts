import express from 'express';
import { userApplicationService } from '../application';
import { UserUpdateCommand } from '../application/user/UserUpdateCommand';
import type { CustomReq } from '../types';

const userRouter = express.Router();

userRouter.post('/', (req: CustomReq, res, next) => {
  (async () => {
    const { password, displayId, userName } = req.body;

    if (!password) {
      throw new Error('passwordがundefinedです');
    }

    if (!displayId) {
      throw new Error('displayIdがundefinedです');
    }

    if (!userName) {
      throw new Error('userNameがundefinedです');
    }

    const result = await userApplicationService.register(
      password,
      displayId,
      userName
    );

    if (!result.ok) {
      res.send('ユーザー登録に失敗しました');
      throw result.error;
    }

    res.send('ユーザー登録しました');
  })().catch(next);
});

userRouter.put('/', (req: CustomReq, res, next) => {
  (async () => {
    const { userId, displayId, userName } = req.body;

    if (!userId) {
      throw new Error('userIdがundefinedです');
    }

    const userUpdateCommand = new UserUpdateCommand(
      userId,
      displayId !== undefined ? displayId : null,
      userName !== undefined ? userName : null
    );

    const result = await userApplicationService.update(userUpdateCommand);

    if (!result.ok) {
      res.send('ユーザー情報を更新できませんでした');
      throw result.error;
    }

    res.send('ユーザー情報を更新しました');
  })().catch(next);
});

userRouter.put('/password', (req: CustomReq, res, next) => {
  (async () => {
    const { oldPassword, newPassword, newPasswordForCheck, displayId } =
      req.body;

    if (!oldPassword) {
      throw new Error('oldPasswordがundefinedです');
    }

    if (!newPassword) {
      throw new Error('newPasswordがundefinedです');
    }

    if (!newPasswordForCheck) {
      throw new Error('newPasswordForCheckがundefinedです');
    }

    if (!displayId) {
      throw new Error('displayIdがundefinedです');
    }

    const result = await userApplicationService.changePassword({
      oldPlainPassword: oldPassword,
      newPlainPassword: newPassword,
      newPlainPasswordForCheck: newPasswordForCheck,
      displayIdValue: displayId,
    });

    if (!result.ok) {
      res.send('パスワードを変更できませんでした');
      throw result.error;
    }

    res.send('パスワードを変更しました');
  })().catch(next);
});

userRouter.post('/login', (req: CustomReq, res, next) => {
  (async () => {
    const { password, displayId } = req.body;

    if (!password) {
      throw new Error('passwordがundefinedです');
    }

    if (!displayId) {
      throw new Error('displayIdがundefinedです');
    }

    const result = await userApplicationService.login(displayId, password);

    if (!result.ok) {
      return res.json({ result: false });
    }

    if (result.error) {
      res.json({ result: false });
      throw result.error;
    }

    return res.json({ result: true });
  })().catch(next);
});

// router.post('/', (req: PostReq, res, next) => {
//   (async () => {
//     const { firstName, lastName } = req.body;

//     if (!firstName) {
//       return res.send('firstNameを入力してください');
//     }

//     if (!lastName) {
//       return res.send('lastNameを入力してください');
//     }

//     const userData = new UserORMEntity();
//     userData.name = firstName;

//     const userTable = getConnection().getRepository(UserORMEntity);
//     await userTable.save(userData);

//     const response = `ユーザーを登録しました`;

//     return res.send(response);
//   })().catch(next);
// });

export { userRouter };
