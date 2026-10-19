// ==============================
// IMPORT SERVER
// ==============================

const server = require("../src/server");


// ==============================
// TEST SETTINGS
// ==============================

const BASE_URL =
  "http://localhost:3000";

const AUTH_HEADERS = {
  "Content-Type": "application/json",
  "Authorization":
    "Bearer student-system-token"
};

let createdStudentId = null;
let createdCourseId = null;


// ==============================
// TEST 1: GET ALL STUDENTS
// ==============================

async function testGetAllStudents() {
  const response = await fetch(
    `${BASE_URL}/students`
  );

  if (response.status !== 200) {
    throw new Error(
      "GET /students should return 200"
    );
  }

  console.log(
    "PASS 1: GET /students"
  );
}


// ==============================
// TEST 2: VALID LOGIN
// ==============================

async function testValidLogin() {
  const response = await fetch(
    `${BASE_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({
        username: "admin",
        password: "admin123"
      })
    }
  );

  const data =
    await response.json();

  if (
    response.status !== 200 ||
    !data.token
  ) {
    throw new Error(
      "Valid login should return 200 and a token"
    );
  }

  console.log(
    "PASS 2: Valid POST /login"
  );
}


// ==============================
// TEST 3: INVALID LOGIN
// ==============================

async function testInvalidLogin() {
  const response = await fetch(
    `${BASE_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({
        username: "admin",
        password: "wrongpassword"
      })
    }
  );

  if (response.status !== 401) {
    throw new Error(
      "Invalid login should return 401"
    );
  }

  console.log(
    "PASS 3: Invalid POST /login"
  );
}


// ==============================
// TEST 4: UNAUTHORIZED STUDENT CREATE
// ==============================

async function testUnauthorizedStudentCreate() {
  const response = await fetch(
    `${BASE_URL}/students`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({
        name: "Unauthorized Test",
        program: "BSIT"
      })
    }
  );

  if (response.status !== 401) {
    throw new Error(
      "Unauthorized student POST should return 401"
    );
  }

  console.log(
    "PASS 4: Unauthorized POST /students"
  );
}


// ==============================
// TEST 5: AUTHORIZED STUDENT CREATE
// ==============================

async function testAuthorizedStudentCreate() {
  const response = await fetch(
    `${BASE_URL}/students`,
    {
      method: "POST",
      headers: AUTH_HEADERS,
      body: JSON.stringify({
        name: "Integration Test Student",
        program: "BSIT"
      })
    }
  );

  const data =
    await response.json();

  if (
    response.status !== 201 ||
    !data.id
  ) {
    throw new Error(
      "Authorized student POST should return 201"
    );
  }

  createdStudentId = data.id;

  console.log(
    "PASS 5: Authorized POST /students"
  );
}


// ==============================
// TEST 6: INVALID STUDENT INPUT
// ==============================

async function testInvalidStudentInput() {
  const response = await fetch(
    `${BASE_URL}/students`,
    {
      method: "POST",
      headers: AUTH_HEADERS,
      body: JSON.stringify({
        name: "",
        program: "BSIT"
      })
    }
  );

  if (response.status !== 400) {
    throw new Error(
      "Invalid student input should return 400"
    );
  }

  console.log(
    "PASS 6: Invalid POST /students"
  );
}


// ==============================
// TEST 7: UPDATE STUDENT
// ==============================

async function testUpdateStudent() {
  const response = await fetch(
    `${BASE_URL}/students/${createdStudentId}`,
    {
      method: "PUT",
      headers: AUTH_HEADERS,
      body: JSON.stringify({
        name: "Updated Test Student",
        program: "BSCS"
      })
    }
  );

  const data =
    await response.json();

  if (
    response.status !== 200 ||
    data.name !==
      "Updated Test Student"
  ) {
    throw new Error(
      "Student PUT should update the student"
    );
  }

  console.log(
    "PASS 7: PUT /students/:id"
  );
}


// ==============================
// TEST 8: GET ONE STUDENT
// ==============================

async function testGetStudent() {
  const response = await fetch(
    `${BASE_URL}/students/${createdStudentId}`
  );

  const data =
    await response.json();

  if (
    response.status !== 200 ||
    data.id !== createdStudentId
  ) {
    throw new Error(
      "GET student should return created student"
    );
  }

  console.log(
    "PASS 8: GET /students/:id"
  );
}


// ==============================
// TEST 9: GET ALL COURSES
// ==============================

async function testGetAllCourses() {
  const response = await fetch(
    `${BASE_URL}/courses`
  );

  if (response.status !== 200) {
    throw new Error(
      "GET /courses should return 200"
    );
  }

  console.log(
    "PASS 9: GET /courses"
  );
}


// ==============================
// TEST 10: UNAUTHORIZED COURSE CREATE
// ==============================

async function testUnauthorizedCourseCreate() {
  const response = await fetch(
    `${BASE_URL}/courses`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({
        title: "Unauthorized Course"
      })
    }
  );

  if (response.status !== 401) {
    throw new Error(
      "Unauthorized course POST should return 401"
    );
  }

  console.log(
    "PASS 10: Unauthorized POST /courses"
  );
}


// ==============================
// TEST 11: AUTHORIZED COURSE CREATE
// ==============================

async function testAuthorizedCourseCreate() {
  const response = await fetch(
    `${BASE_URL}/courses`,
    {
      method: "POST",
      headers: AUTH_HEADERS,
      body: JSON.stringify({
        title: "Integration Test Course"
      })
    }
  );

  const data =
    await response.json();

  if (
    response.status !== 201 ||
    !data.id
  ) {
    throw new Error(
      "Authorized course POST should return 201"
    );
  }

  createdCourseId = data.id;

  console.log(
    "PASS 11: Authorized POST /courses"
  );
}


// ==============================
// TEST 12: INVALID COURSE INPUT
// ==============================

async function testInvalidCourseInput() {
  const response = await fetch(
    `${BASE_URL}/courses`,
    {
      method: "POST",
      headers: AUTH_HEADERS,
      body: JSON.stringify({
        title: ""
      })
    }
  );

  if (response.status !== 400) {
    throw new Error(
      "Invalid course input should return 400"
    );
  }

  console.log(
    "PASS 12: Invalid POST /courses"
  );
}


// ==============================
// TEST 13: GET ONE COURSE
// ==============================

async function testGetCourse() {
  const response = await fetch(
    `${BASE_URL}/courses/${createdCourseId}`
  );

  const data =
    await response.json();

  if (
    response.status !== 200 ||
    data.id !== createdCourseId
  ) {
    throw new Error(
      "GET course should return created course"
    );
  }

  console.log(
    "PASS 13: GET /courses/:id"
  );
}


// ==============================
// TEST 14: UPDATE COURSE
// ==============================

async function testUpdateCourse() {
  const response = await fetch(
    `${BASE_URL}/courses/${createdCourseId}`,
    {
      method: "PUT",
      headers: AUTH_HEADERS,
      body: JSON.stringify({
        title:
          "Updated Integration Course"
      })
    }
  );

  const data =
    await response.json();

  if (
    response.status !== 200 ||
    data.title !==
      "Updated Integration Course"
  ) {
    throw new Error(
      "Course PUT should update the course"
    );
  }

  console.log(
    "PASS 14: PUT /courses/:id"
  );
}


// ==============================
// TEST 15: JSON STUDENT EXPORT
// ==============================

async function testStudentExport() {
  const response = await fetch(
    `${BASE_URL}/export/students`
  );

  const data =
    await response.json();

  const disposition =
    response.headers.get(
      "content-disposition"
    );

  if (
    response.status !== 200 ||
    !Array.isArray(data.students) ||
    typeof data.recordCount !== "number" ||
    !data.exportedAt ||
    !disposition ||
    !disposition.includes(
      "students-export.json"
    )
  ) {
    throw new Error(
      "Student JSON export is invalid"
    );
  }

  console.log(
    "PASS 15: GET /export/students"
  );
}


// ==============================
// TEST 16: DELETE COURSE
// ==============================

async function testDeleteCourse() {
  const response = await fetch(
    `${BASE_URL}/courses/${createdCourseId}`,
    {
      method: "DELETE",
      headers: {
        "Authorization":
          "Bearer student-system-token"
      }
    }
  );

  if (response.status !== 200) {
    throw new Error(
      "Course DELETE should return 200"
    );
  }

  createdCourseId = null;

  console.log(
    "PASS 16: DELETE /courses/:id"
  );
}


// ==============================
// TEST 17: DELETE STUDENT
// ==============================

async function testDeleteStudent() {
  const response = await fetch(
    `${BASE_URL}/students/${createdStudentId}`,
    {
      method: "DELETE",
      headers: {
        "Authorization":
          "Bearer student-system-token"
      }
    }
  );

  if (response.status !== 200) {
    throw new Error(
      "Student DELETE should return 200"
    );
  }

  createdStudentId = null;

  console.log(
    "PASS 17: DELETE /students/:id"
  );
}


// ==============================
// CLEANUP TEST DATA
// ==============================

async function cleanupTestData() {
  try {
    if (createdCourseId) {
      await fetch(
        `${BASE_URL}/courses/${createdCourseId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization":
              "Bearer student-system-token"
          }
        }
      );
    }

    if (createdStudentId) {
      await fetch(
        `${BASE_URL}/students/${createdStudentId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization":
              "Bearer student-system-token"
          }
        }
      );
    }
  } catch (err) {
    console.error(
      "Cleanup warning:",
      err.message
    );
  }
}


// ==============================
// RUN INTEGRATION TESTS
// ==============================

async function runTests() {
  try {
    await testGetAllStudents();
    await testValidLogin();
    await testInvalidLogin();

    await testUnauthorizedStudentCreate();
    await testAuthorizedStudentCreate();
    await testInvalidStudentInput();
    await testUpdateStudent();
    await testGetStudent();

    await testGetAllCourses();
    await testUnauthorizedCourseCreate();
    await testAuthorizedCourseCreate();
    await testInvalidCourseInput();
    await testGetCourse();
    await testUpdateCourse();

    await testStudentExport();

    await testDeleteCourse();
    await testDeleteStudent();

    console.log(
      "\nAll 17 API integration tests passed."
    );

  } catch (err) {
    console.error(
      "\nTEST FAILED:",
      err.message
    );

    process.exitCode = 1;

  } finally {
    await cleanupTestData();
    server.close();
  }
}

runTests();