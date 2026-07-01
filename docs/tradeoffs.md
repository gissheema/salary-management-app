# Trade-offs and Design Decisions

# Overview

This document explains the key architectural and technical decisions made while building the Salary Management System, along with the trade-offs considered. The goal was to create a maintainable, scalable, and production-oriented solution while keeping the implementation focused on the assessment requirements.

---

# 1. PostgreSQL over SQLite

## Decision

Used **PostgreSQL** as the database.

## Why

- Better represents a production environment.
- Excellent support for indexing and query optimization.
- Handles concurrent access efficiently.
- Integrates seamlessly with Prisma.
- Easy to deploy using free cloud services like Neon or Render.

## Trade-off

PostgreSQL requires additional setup compared to SQLite, but it provides a more realistic and scalable solution.

---

# 2. Prisma ORM over Raw SQL

## Decision

Used **Prisma ORM**.

## Why

- Type-safe database queries.
- Faster development.
- Built-in migration support.
- Improved developer experience.
- Reduced risk of SQL injection.

## Trade-off

ORMs introduce slight abstraction overhead compared to writing optimized SQL directly. However, the benefits in maintainability and productivity outweigh this for the scope of this project.

---

# 3. Layered Architecture

## Decision

Separated the application into:

- Controllers
- Services
- Repositories
- Database

## Why

- Clear separation of concerns.
- Easier unit testing.
- Business logic remains independent of HTTP and database layers.
- Simplifies future enhancements.

## Trade-off

This introduces additional files and boilerplate compared to placing everything in controllers, but results in a cleaner and more maintainable codebase.

---

# 4. REST API over GraphQL

## Decision

Implemented REST APIs.

## Why

- Well suited for CRUD operations.
- Simpler to implement and maintain.
- Easier to understand for this assessment.
- Supported by most frontend libraries without additional complexity.

## Trade-off

GraphQL offers more flexible data fetching but introduces additional complexity that is unnecessary for the current requirements.

---

# 5. Server-side Pagination

## Decision

Implemented pagination at the API level.

## Why

The system needs to support approximately 10,000 employee records. Returning all records in a single response would negatively impact performance.

## Trade-off

Pagination requires slightly more implementation effort but significantly improves response time and scalability.

---

# 6. Current Salary Only

## Decision

The application stores only the current salary.

## Why

The assessment focuses on salary management rather than payroll or historical reporting.

## Trade-off

Salary history and audit trails would be valuable in a production HR system but were intentionally excluded to keep the solution focused.

---

# 7. No Authentication

## Decision

Authentication and authorization were not implemented.

## Why

The assessment identifies the HR Manager as the primary user and does not specify security requirements.

## Trade-off

A production application would require authentication, authorization, and role-based access control. These features are outside the scope of this assessment.

---

# 8. Single Employee Entity

## Decision

Department, Designation, Country, and Currency are stored as attributes of the Employee entity.

## Why

This keeps the data model simple and minimizes unnecessary complexity.

## Trade-off

In a larger enterprise application, these would likely be separate reference tables with relationships to enforce consistency and reduce data duplication.

---

# 9. Analytics via Database Queries

## Decision

Salary statistics are calculated using database aggregation functions.

## Why

- Efficient execution.
- Reduced memory usage.
- Better scalability.

## Trade-off

Complex reporting requirements may eventually require caching or a dedicated reporting database, but database aggregation is sufficient for the current scale.

---

# 10. Validation with Zod

## Decision

Used Zod for request validation.

## Why

- Type-safe validation.
- Declarative schemas.
- Easy integration with TypeScript.
- Consistent error messages.

## Trade-off

Adds an external dependency, but significantly improves reliability and maintainability.

---

# Features Intentionally Excluded

The following features were deliberately left out to maintain focus on the core objectives of the assessment:

- Authentication & Authorization
- Role-Based Access Control
- Payroll Processing
- Salary History
- Audit Logging
- Notifications
- Excel Import/Export
- Currency Conversion
- Employee Self-Service Portal
- Approval Workflows

These are valuable capabilities for a production HR platform but are beyond the scope of this assessment.

---

# Future Improvements

If this application were to evolve into a production system, the following enhancements would be considered:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Salary History Tracking
- Audit Logs
- Currency Exchange Integration
- Excel Import & Export
- Docker & Kubernetes Deployment
- CI/CD Pipeline
- API Rate Limiting
- Monitoring & Logging
- Redis Caching
- Background Jobs for Reporting

---

# Conclusion

The chosen architecture emphasizes **simplicity, maintainability, and scalability** while avoiding unnecessary complexity. The design decisions were guided by the assessment's objective of demonstrating sound engineering judgment and delivering a clean, production-oriented solution rather than implementing every possible feature.