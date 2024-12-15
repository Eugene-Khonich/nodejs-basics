// src/routers/students.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createStudentSchema } from '../validation/students.js';
import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';

const router = Router();

router.get('/', ctrlWrapper(getStudentsController));
router.get('/:studentId', isValidId, ctrlWrapper(getStudentByIdController));
router.post(
  '/register',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);
router.delete('/:studentId', isValidId, ctrlWrapper(deleteStudentController));
router.put(
  '/:studentId',
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);
router.patch(
  '/:studentId',
  validateBody(createStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
