import { Router } from 'express';

import { isAdmin, isLecture } from '../../common/middlewares/auth-middleware';
import { validate } from '../../common/middlewares/validator';
import lectureValidation from './lecture.validation';
import lectureController from './lecture.controller';

const admin = Router(),
  lecture = Router(),
  router = Router();

admin.get('/', validate(lectureValidation.admin.get), lectureController.admin.get);
admin.get('/:id', validate(lectureValidation.admin.getById), lectureController.admin.getById);
admin.post('/', validate(lectureValidation.admin.create), lectureController.admin.create);
admin.put('/:id', validate(lectureValidation.admin.update), lectureController.admin.update);

lecture.get('/', lectureController.lecture.get);
lecture.put('/', validate(lectureValidation.lecture.update), lectureController.lecture.update);

router.use('/admin', isAdmin, admin);
router.use('/', isLecture, lecture);

export { router as lectureRouter };
