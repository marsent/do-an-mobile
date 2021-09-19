import { Router } from 'express';
import apiRoutes from './api/routes';
import { authRouter } from './common/auth/auth.router';
import { userRouter } from './common/user/user.router';

const router = Router();

router.use('/api', apiRoutes);
router.use('/auth', authRouter);
router.use('/user', userRouter);

export { router as mainRouter };
