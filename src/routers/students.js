// src/routers/students.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
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
router.get('/students/:studentId', ctrlWrapper(getStudentByIdController));
router.post('/students', ctrlWrapper(createStudentContriller));
router.delete('/students/:studentId', ctrlWrapper(deleteStudentController));
router.put('/students/:studentId', ctrlWrapper(upsertStudentController));
router.patch('/students/:studentId', ctrlWrapper(patchStudentController));

export default router;
