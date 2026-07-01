# Architecture Document

# Salary Management System

## Overview

The Salary Management System is a web-based application designed to help HR managers efficiently manage employee salary information for an organization with approximately **10,000 employees** across multiple countries.

The application follows a **Layered Architecture**, separating the presentation, business logic, and data access layers. This approach promotes maintainability, testability, and scalability while keeping the codebase clean and easy to extend.

---

# Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | React, TypeScript, Material UI |
| Backend | Node.js, Express, TypeScript |
| ORM | Prisma |
| Database | PostgreSQL |
| Validation | Zod |
| Testing | Jest |
| API Style | REST |

---

# High-Level Architecture

```
+----------------------------+
|      React Frontend        |
+-------------+--------------+
              |
         REST API (HTTP)
              |
+-------------v--------------+
|  Express + TypeScript API  |
|        Controllers         |
+-------------+--------------+
              |
+-------------v--------------+
|        Service Layer       |
|     Business Logic         |
+-------------+--------------+
              |
+-------------v--------------+
|      Repository Layer      |
|      Prisma ORM            |
+-------------+--------------+
              |
+-------------v--------------+
|      PostgreSQL Database   |
+----------------------------+
```

---

# Architecture Layers

## 1. Presentation Layer (Frontend)

**Responsibilities**

- Display employee data
- Employee CRUD operations
- Salary dashboard
- Search and filtering
- Client-side validation
- Consume REST APIs

The frontend contains minimal business logic and delegates all business rules to the backend.

---

## 2. Controller Layer

Controllers act as the API entry point.

**Responsibilities**

- Handle HTTP requests
- Validate request payloads
- Call service methods
- Return HTTP responses
- Handle exceptions

Controllers remain lightweight and contain no business logic.

---

## 3. Service Layer

The Service Layer contains the application's business rules.

Examples include:

- Employee management
- Salary updates
- Employee search
- Salary analytics
- Business validations

Keeping business logic here improves testability and maintainability.

---

## 4. Repository Layer

Repositories encapsulate all database operations using Prisma.

Responsibilities include:

- CRUD operations
- Pagination
- Filtering
- Aggregate queries
- Optimized database access

This abstraction isolates the application from database implementation details.

---

## 5. Database Layer

The application uses **PostgreSQL** with **Prisma ORM**.

### Employee Entity

- Employee ID
- First Name
- Last Name
- Email
- Department
- Designation
- Country
- Currency
- Salary
- Employment Status
- Created At
- Updated At

### Indexes

Indexes will be created on:

- Employee ID
- Email
- Department
- Country

These improve search and filtering performance.

---

# Request Flow

Example: Create Employee

```
React UI
    │
POST /employees
    │
    ▼
EmployeeController
    │
    ▼
EmployeeService
    │
Business Validation
    │
    ▼
EmployeeRepository
    │
Prisma ORM
    │
    ▼
PostgreSQL
    │
Response
```

---

# Validation

Input validation is performed using **Zod**.

Examples:

- Required fields
- Valid email format
- Positive salary value
- Non-empty employee name

Invalid requests return **HTTP 400 Bad Request** with descriptive error messages.

---

# Error Handling

A centralized error-handling middleware ensures consistent API responses.

Example:

```json
{
  "success": false,
  "message": "Employee not found"
}
```

---

# Performance Considerations

The system is designed to efficiently support **10,000 employee records**.

Performance optimizations include:

- Server-side pagination
- Database indexing
- Efficient filtering and searching
- Aggregate queries for analytics
- Bulk data seeding using Prisma's `createMany()`

These measures reduce response times and avoid loading unnecessary data into memory.

---

# Testing Strategy

Unit tests focus on business logic within the Service Layer.

Key test scenarios include:

- Employee CRUD operations
- Salary updates
- Input validation
- Search and filtering
- Salary analytics

Keeping business logic separate from controllers enables faster and more focused tests.

---

# Key Design Decisions

## Layered Architecture

Chosen to:

- Separate concerns
- Improve readability
- Simplify testing
- Support future scalability

---

## REST API

REST was selected because it is simple, well understood, and well suited for CRUD-oriented applications.

---

## PostgreSQL

PostgreSQL was selected because:

- It is production-ready and widely adopted.
- It provides strong support for indexing and concurrent access.
- It scales better than SQLite as application complexity grows.
- It integrates seamlessly with Prisma.
- It offers an easy migration path to cloud-hosted databases for deployment.

---

# Future Enhancements

Potential production features include:

- Authentication & Authorization
- Role-Based Access Control (RBAC)
- Salary History
- Audit Logging
- Payroll Processing
- Currency Conversion
- Excel Import/Export
- Notifications
- Docker Support
- CI/CD Pipeline
- Monitoring & Logging