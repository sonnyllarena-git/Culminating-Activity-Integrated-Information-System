// ==============================
// IMPORTS
// ==============================

const {
  getAllStudents
} = require("./studentService");


// ==============================
// BUILD STUDENT JSON EXPORT
// ==============================

function buildStudentExport() {
  const students = getAllStudents();

  return {
    exportedAt: new Date().toISOString(),
    recordCount: students.length,
    students
  };
}


// ==============================
// EXPORT DATA SERVICE
// ==============================

module.exports = {
  buildStudentExport
};