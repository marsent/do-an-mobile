import { Router } from 'express';
import { validate } from '../middlewares/validator';
import authController from './auth.controller';
import authValidation from './auth.validation';

const router = Router(),
  user = Router(),
  admin = Router(),
  lecture = Router(),
  student = Router();

user.post('/register', validate(authValidation.register), authController.register);
user.post('/sign-in', validate(authValidation.signIn), authController.userSignIn);
user.post('/verify/:user_id', validate(authValidation.verify), authController.verify);

admin.post('/sign-in', validate(authValidation.signIn), authController.adminLogin);
admin.get('/connect', (req, res, next) => res.json('Admin connect'));

lecture.post('/sign-in', validate(authValidation.signIn), authController.lectureLogin);

student.post('/sign-in', validate(authValidation.signIn), authController.studentLogin);

router.get('/connect', (req, res, next) => res.json('Connect'));
router.use('/user', user);
router.use('/admin', admin);
router.use('/lecture', lecture);
router.use('/student', student);

export { router as authRouter };
