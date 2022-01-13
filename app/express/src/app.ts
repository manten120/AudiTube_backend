import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'reflect-metadata';

import { indexRouter } from './routes';
import { accountRouter } from './routes/account';
import { editRouter } from './routes/edit';

import { notifyAdminOfError } from './adapter/notify';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ejsファイル内でbootstrapを "bootstrap/css/bootstrap.min.css" などのパスで読み込めるようにする
app.use(
  '/bootstrap',
  express.static(
    path.join(__dirname, '../node_modules/bootstrap/dist')
  ) as RequestHandler
);

app.use('/account', accountRouter);
app.use('/edit', editRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, _res, next) => {
  next(
    createError(404, `存在しないパスへのリクエストです。\npath: ${req.path}`)
  );
});

// error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  // _next は省略不可 error handler は4つの引数を受け取る必要がある
  res.status(err.status || 500); // 500 Internal Server Error

  try {
    // slackに通知
    notifyAdminOfError(err.stack);
  } catch (e) {
    console.error('エラーハンドラ内で管理者への通知に失敗しました', e);
  }

  if (!res.writableEnded) {
    res.send('なにかおかしいです');
  }
});

export { app };
