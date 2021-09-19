import { Router } from 'express';
import { isAdmin, isLecture, isStudent } from '../../common/middlewares/auth-middleware';
import { validate } from '../../common/middlewares/validator';
import scheduleController from './schedule.controller';
import scheduleValidation from './schedule.validation';

const router = Router(),
  admin = Router(),
  lecture = Router(),
  student = Router();

admin.get('/', validate(scheduleValidation.admin.get), scheduleController.admin.get);
admin.get('/:id', validate(scheduleValidation.admin.getById), scheduleController.admin.getById);

student.get('/', scheduleController.student.get);

router.use('/admin', isAdmin, admin);
router.use('/student', isStudent, student);

export { router as scheduleRouter };
