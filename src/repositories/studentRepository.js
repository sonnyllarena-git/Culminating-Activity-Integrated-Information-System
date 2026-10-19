// ==============================
// IMPORTS
// ==============================

const db = require("../database");


// ==============================
// INSERT STUDENT
// ==============================

function insertStudent(name, program) {
  const result = db.prepare(`
    INSERT INTO Student (name, program)
    VALUES (?, ?)
  `).run(
    name,
    program
  );

  return {
    id: result.lastInsertRowid,
    name,
    program
  };
}


// ==============================
// FIND STUDENT BY ID
// ==============================

function findStudentById(id) {
  return db.prepare(`
    SELECT *
    FROM Student
    WHERE id = ?
  `).get(id);
}


// ==============================
// FIND ALL STUDENTS
// ==============================

function findAllStudents() {
  return db.prepare(`
    SELECT *
    FROM Student
    ORDER BY id ASC
  `).all();
}


// ==============================
// UPDATE STUDENT RECORD
// ==============================

function updateStudentRecord(
  id,
  name,
  program
) {
  const result = db.prepare(`
    UPDATE Student
    SET name = ?, program = ?
    WHERE id = ?
  `).run(
    name,
    program,
    id
  );

  return result.changes;
}


// ==============================
// DELETE STUDENT RECORD
// ==============================

function deleteStudentRecord(id) {
  const result = db.prepare(`
    DELETE FROM Student
    WHERE id = ?
  `).run(id);

  return result.changes;
}


// ==============================
// EXPORT REPOSITORY FUNCTIONS
// ==============================

module.exports = {
  insertStudent,
  findStudentById,
  findAllStudents,
  updateStudentRecord,
  deleteStudentRecord
};