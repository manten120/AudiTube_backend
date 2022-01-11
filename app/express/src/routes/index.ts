import express from 'express';

const router = express.Router();

router.get('/', (_req, res, _next) => {
  res.send('routes/index');
});

export { router as indexRouter };
