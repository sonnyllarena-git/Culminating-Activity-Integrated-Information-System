# Student Records Management System

A culminating project for **CCIT102 - Integrative Programming 1**.

This project is an integrated information system built using Node.js, SQLite, REST APIs, centralized validation, authentication, JSON export, automated testing, layered architecture, and Git version control.

---

# Project Overview

The Student Records Management System manages:

- Students
- Courses
- Enrollments

The system includes:

- Full CRUD for Students
- Full CRUD for Courses
- Authentication for modifying data
- Centralized validation
- JSON student export
- Relational database relationships
- Layered architecture
- Unit testing
- Integration testing
- Incremental Git development

---

# System Features

## Student Management

The system supports:

- Create Student
- View all Students
- View one Student
- Update Student
- Delete Student

Student fields:

- `id`
- `name`
- `program`

---

## Course Management

The system supports:

- Create Course
- View all Courses
- View one Course
- Update Course
- Delete Course

Course fields:

- `id`
- `title`

---

## Enrollment Relationship

The system contains an `Enrollment` table that connects Students and Courses.

Fields:

- `id`
- `student_id`
- `course_id`
- `grade`

The relationships are:

```text
Student 1 ---- many Enrollment
Course  1 ---- many Enrollment