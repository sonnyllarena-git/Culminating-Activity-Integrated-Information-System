// ==============================
// VALIDATE STUDENT INPUT
// ==============================

function validateStudentInput(name, program) {
  const errors = [];

  if (
    typeof name !== "string" ||
    name.trim() === ""
  ) {
    errors.push(
      "Name is required and must be non-empty text."
    );
  }

  if (
    typeof name === "string" &&
    name.length > 100
  ) {
    errors.push(
      "Name must not exceed 100 characters."
    );
  }

  if (
    typeof program !== "string" ||
    program.trim() === ""
  ) {
    errors.push(
      "Program is required and must be non-empty text."
    );
  }

  if (
    typeof program === "string" &&
    program.length > 50
  ) {
    errors.push(
      "Program must not exceed 50 characters."
    );
  }

  return errors;
}


// ==============================
// VALIDATE LOGIN INPUT
// ==============================

function validateLoginInput(username, password) {
  const errors = [];

  if (
    typeof username !== "string" ||
    username.trim() === ""
  ) {
    errors.push(
      "Username is required."
    );
  }

  if (
    typeof password !== "string" ||
    password.trim() === ""
  ) {
    errors.push(
      "Password is required."
    );
  }

  return errors;
}


// ==============================
// EXPORT VALIDATION
// ==============================

module.exports = {
  validateStudentInput,
  validateLoginInput
};