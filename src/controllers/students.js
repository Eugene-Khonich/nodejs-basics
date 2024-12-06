// src/controllers/students.js

import createHttpError from 'http-errors';
import { getAllStudents, getStudentById } from '../services/students.js';

export const getStudentsController = async (req, res) => {
  const students = await getAllStudents();

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
