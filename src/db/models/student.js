// src/db/models/student.js

import { Schema, model } from 'mongoose';

const studentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    avgMark: {
      type: Number,
      required: true,
    },
    onDuty: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

studentsSchema.post('save', (error, doc, next) => {
  error.status = 400;
  next();
});
studentsSchema.post('findOneAndUpdate', (error, doc, next) => {
  error.status = 400;
  next();
});
studentsSchema.pre('findOneAndUpdate', function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
});
// Встановлення номера помилки та повторна фалідація

export const StudentsCollection = model('students', studentsSchema);
