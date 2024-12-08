// src/routers/students.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createStudentSchema } from '../validation/students.js';
import {
  getStudentsController,
  getStudentByIdController,
  createStudentContriller,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController));
router.get(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(getStudentByIdController),
);
router.post('/students', ctrlWrapper(createStudentContriller));
router.delete(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(deleteStudentController),
);
router.put(
  '/students/:studentId',
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);
router.patch(
  '/students/:studentId',
  validateBody(createStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
