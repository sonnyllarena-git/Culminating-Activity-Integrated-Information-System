// ==============================
// IMPORTS
// ==============================

const {
  validateCourseInput
} = require("./validation");

const {
  insertCourse,
  findCourseById,
  findAllCourses,
  updateCourseRecord,
  deleteCourseRecord
} = require("./repositories/courseRepository");


// ==============================
// CREATE COURSE
// ==============================

function createCourse(title) {
  const errors =
    validateCourseInput(title);

  if (errors.length > 0) {
    throw new Error(errors[0]);
  }

  const cleanTitle =
    title.trim();

  return insertCourse(
    cleanTitle
  );
}


// ==============================
// GET ONE COURSE
// ==============================

function getCourse(id) {
  return findCourseById(id);
}


// ==============================
// GET ALL COURSES
// ==============================

function getAllCourses() {
  return findAllCourses();
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

  const cleanTitle =
    title.trim();

  const changes =
    updateCourseRecord(
      id,
      cleanTitle
    );

  if (changes === 0) {
    return null;
  }

  return getCourse(id);
}


// ==============================
// DELETE COURSE
// ==============================

function deleteCourse(id) {
  const changes =
    deleteCourseRecord(id);

  return changes > 0;
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