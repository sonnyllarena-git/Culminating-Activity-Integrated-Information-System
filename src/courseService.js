// ==============================
// IMPORTS
// ==============================

const db = require("./database");

const {
  validateCourseInput
} = require("./validation");


// ==============================
// CREATE COURSE
// ==============================

function createCourse(title) {
  const errors =
    validateCourseInput(title);

  if (errors.length > 0) {
    throw new Error(errors[0]);
  }

  const cleanTitle = title.trim();

  const result = db.prepare(`
    INSERT INTO Course (title)
    VALUES (?)
  `).run(cleanTitle);

  return {
    id: result.lastInsertRowid,
    title: cleanTitle
  };
}


// ==============================
// GET ONE COURSE
// ==============================

function getCourse(id) {
  return db.prepare(`
    SELECT *
    FROM Course
    WHERE id = ?
  `).get(id);
}


// ==============================
// GET ALL COURSES
// ==============================

function getAllCourses() {
  return db.prepare(`
    SELECT *
    FROM Course
    ORDER BY id ASC
  `).all();
}


// ==============================
// UPDATE COURSE
// ==============================

function updateCourse(id, title) {
  const errors =
    validateCourseInput(title);

  if (errors.length > 0) {
    throw new Error(errors[0]);
  }

  const cleanTitle = title.trim();

  const result = db.prepare(`
    UPDATE Course
    SET title = ?
    WHERE id = ?
  `).run(
    cleanTitle,
    id
  );

  if (result.changes === 0) {
    return null;
  }

  return getCourse(id);
}


// ==============================
// DELETE COURSE
// ==============================

function deleteCourse(id) {
  const result = db.prepare(`
    DELETE FROM Course
    WHERE id = ?
  `).run(id);

  return result.changes > 0;
}


// ==============================
// EXPORT COURSE SERVICE
// ==============================

module.exports = {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse
};