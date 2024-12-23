// src/controllers/students.js

import createHttpError from 'http-errors';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
  patchStudent,
} from '../services/students.js';
import { parsePaginationParams } from '../utils/parsePafinationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const students = await getAllStudents({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  });
  res.json({
    status: 200,
    message: 'Seccefully found students!',
    data: students,
  });
};

export const getStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);
  if (!student) {
    throw createHttpError(404, 'Student not found');
  }
  res.json({
    status: 200,
    message: `Succefully found student with id ${studentId}!`,
    data: student,
  });
};

export const createStudentController = async (req, res) => {
  const student = await createStudent(req.body);
  res.status(201).json({
    status: 201,
    message: 'Succefully created a student!',
    data: student,
  });
};

export const deleteStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await deleteStudent(studentId);
  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(204).send();
};

export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req, body, {
    upsert: true,
  });
  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Succefully upsert a student!',
    data: result.student,
  });
};

export const patchStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const result = await patchStudent(studentId, req.body);
  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.json({
    status: 200,
    message: 'Succefully patched a student!',
    data: result.student,
  });
};
