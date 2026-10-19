// ==============================
// IMPORTS
// ==============================

const {
  validateStudentInput
} = require("./validation");

const {
  insertStudent,
  findStudentById,
  findAllStudents,
  updateStudentRecord,
  deleteStudentRecord
} = require("./repositories/studentRepository");


// ==============================
// CREATE STUDENT
// ==============================

function createStudent(name, program) {
  const errors = validateStudentInput(
    name,
    program
  );

  if (errors.length > 0) {
    throw new Error(errors[0]);
  }

  const cleanName = name.trim();
  const cleanProgram = program.trim();

  return insertStudent(
    cleanName,
    cleanProgram
  );
}


// ==============================
// GET ONE STUDENT
// ==============================

function getStudent(id) {
  return findStudentById(id);
}


// ==============================
// GET ALL STUDENTS
// ==============================

function getAllStudents() {
  return findAllStudents();
}


// ==============================
// UPDATE STUDENT
// ==============================

function updateStudent(
  id,
  name,
  program
) {
  const errors = validateStudentInput(
    name,
    program
  );

  if (errors.length > 0) {
    throw new Error(errors[0]);
  }

  const cleanName = name.trim();
  const cleanProgram = program.trim();

  const changes = updateStudentRecord(
    id,
    cleanName,
    cleanProgram
  );

  if (changes === 0) {
    return null;
  }

  return getStudent(id);
}


// ==============================
// DELETE STUDENT
// ==============================

function deleteStudent(id) {
  const changes =
    deleteStudentRecord(id);

  return changes > 0;
}


// ==============================
// EXPORT STUDENT SERVICE
// ==============================

module.exports = {
  createStudent,
  getStudent,
  getAllStudents,
  updateStudent,
  deleteStudent
};