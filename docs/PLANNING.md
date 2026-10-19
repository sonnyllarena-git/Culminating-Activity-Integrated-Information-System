# Culminating Activity Planning

## Project Title

Student Records Management System

## Project Overview

This project is an integrated information system for managing students and courses.

The system uses:

- Node.js
- REST API
- SQLite
- JSON
- Centralized validation
- Basic authentication
- Automated testing
- Layered architecture

---

# 1. Data Model

The system contains three related entities:

- Student
- Course
- Enrollment

Enrollment is the junction table connecting Student and Course.

## Entity Relationship

```text
Student
-------
id
name
program
   |
   | 1
   |
   | many
Enrollment
----------
id
student_id
course_id
grade
   |
   | many
   |
   | 1
Course
------
id
title