// ==============================
// IMPORTS
// ==============================

const db = require("../database");


// ==============================
// INSERT COURSE
// ==============================

function insertCourse(title) {
  const result = db.prepare(`
    INSERT INTO Course (title)
    VALUES (?)
  `).run(title);

  return {
    id: result.lastInsertRowid,
    title
  };
}


// ==============================
// FIND COURSE BY ID
// ==============================

function findCourseById(id) {
  return db.prepare(`
    SELECT *
    FROM Course
    WHERE id = ?
  `).get(id);
}


// ==============================
// FIND ALL COURSES
// ==============================

function findAllCourses() {
  return db.prepare(`
    SELECT *
    FROM Course
    ORDER BY id ASC
  `).all();
}


// ==============================
// UPDATE COURSE RECORD
// ==============================

function updateCourseRecord(
  id,
  title
) {
  const result = db.prepare(`
    UPDATE Course
    SET title = ?
    WHERE id = ?
  `).run(
    title,
    id
  );

  return result.changes;
}


// ==============================
// DELETE COURSE RECORD
// ==============================

function deleteCourseRecord(id) {
  const result = db.prepare(`
    DELETE FROM Course
    WHERE id = ?
  `).run(id);

  return result.changes;
}


// ==============================
// EXPORT REPOSITORY FUNCTIONS
// ==============================

module.exports = {
  insertCourse,
  findCourseById,
  findAllCourses,
  updateCourseRecord,
  deleteCourseRecord
};