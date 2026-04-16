# Lab 1 - Pixell River Employee Directory

This repository contains **Lab 1.1** and **Lab 1.2**, which progressively build and rebuild a Pixell River Financial employee directory using different front-end technologies.

---

## Lab 1.1 - Pixell River Employee Directory

**Technologies:** HTML, CSS, JavaScript

Lab 1.1 focused on building a simple static webpage that displays Pixell River Financial employees organized by department.

All employee data is stored in JavaScript arrays and objects, then injected into the page using DOM manipulation. The goal was to demonstrate clean front-end structure using semantic HTML, basic styling, and straightforward scripting.

### Key Features

- Departments and employees stored in JavaScript
- Dynamically generated employee listings  
  (no hard-coded `<li>` elements)
- Header with logo, site title, and greeting message
- Footer with an automatically updating year
- Custom CSS styling
- Fully client-side, no frameworks

---

## Lab 1.2 - Pixell River Employee Directory Rebuild

**Technologies:** React, TypeScript, Vite

Lab 1.2 required recreating the Lab 1.1 project using a modern, component-based frontend architecture.

The application was built with React and TypeScript, using Vite as the development server and build tool. Employee data was moved from JavaScript into a JSON file, and TypeScript interfaces were used to ensure type safety throughout the application.

### Completed Requirements

- Initialized a React + TypeScript project using Vite
- Created reusable React components:
  - Header
  - Directory
  - Department
  - Footer
- Defined `Employee` and `Department` TypeScript interfaces
- Imported employee data from `employees.json`
- Dynamically rendered departments and employees using mapped components
- Implemented an automatically updating footer year
- Added custom styling through `index.css`
- Successfully built the project using `npm run build`
- Deployed the application to Vercel

---

## Components Overview

### Header

Displays the Pixell River logo, site title, and greeting message.

### Directory

Loads department data from JSON and renders each department.

### Department

Renders a department name along with its associated employee list.

### Footer

Dynamically displays the current year.

---

## Branches Used

| Branch Name | Purpose                |
| ----------- | ---------------------- |
| fs_lab-1.1  | Lab 1.1 implementation |
| fs_lab-1.2  | Lab 1.2 React rebuild  |

Both labs were completed on their own branches.  
Lab 1.2 was later merged into `main` for deployment to Vercel, as required.

---

## Lab_3.1

### Description

Lab 3.1 extends the existing React application by restructuring the employee-management features using a Hook → Service → Repository architecture. The goal is to clearly separate presentation logic, business logic, and data management, while ensuring all application state related to employees and departments comes from a single centralized source.
This lab required three new modules:

1. useFormInput Hook
   A reusable custom hook created to manage individual form fields.
   It controls:

the current value of the input
the list of messages for that input
a validate(callback) function that runs field-level validation
a clearMessages() helper for resetting errors

This hook now powers all inputs in the Add Employee form. 2. employeeService
A service responsible for business rules involved in employee creation.
It performs two validations:

the selected department must exist
first name must be at least three characters

If validation succeeds, the service requests the repository to create the employee. If validation fails, it returns structured errors that the form displays. 3. employeeRepo
A repository that acts as the application's single source of truth for departments and employees.
It is responsible for:

storing in-memory department and employee data
hydrating initial data from seed.ts when the app loads
exposing methods for retrieving and creating employees

After this refactor, no component directly imports employees.json. All reads and writes flow through the repository.
UI Integration
The Add Employee form was updated to use the hook, service, and repository. The Directory view was updated to load and group employees from the repository, and to refresh when new employees are added. No visual changes were required; the improvements are architectural.
Result
The application now follows a clean separation of concerns:

Hook: local UI state and field validation
Service: business rules
Repository: data management

---

## Lab_3.2

### Description:

Implements Organization role creation using Hook → Service → Repository. The page reads roles from `orgRepo` (single source of truth). `OrgAddPersonForm` uses `useFormInput` for field state/messages and `orgService` to validate first name (≥ 3) and prevent assigning a person to an already-occupied role. The Organization page re-reads from the repo after a successful add, keeping UI and data in sync.

---

## Lab_4.1

### Description:

Introduces a real back-end API and refactors the front-end to fetch from it instead of using front-end in-memory data. The solution follows a layered architecture on both sides:

Backend (Express + TypeScript): Route → Controller → Service → Repository with temporary in-memory data for this lab.
Frontend (React + Vite + TypeScript): Repositories call the API with fetch using VITE_API_BASE_URL; pages load data via useEffect with loading/error states.

No local JSON/seed or hydrator is used on the frontend anymore.
Technologies

Frontend: React, TypeScript, Vite
Backend: Node.js, Express, TypeScript, CORS, morgan
Dev: Nodemon, ts-node

---

## Lab_4.2

### Description:

In this lab, I updated my full-stack Employee Directory / Organization application to use a real relational database instead of in-memory data.

On the backend, I introduced Postgres as the database and used Prisma as the ORM. I modeled the application data using a normalized schema and created relations between entities such as departments, employees, and organizational roles.
Prisma migrations were used to generate and apply the database schema, and a seed script was created to populate the database with initial data so the application is usable immediately.

For local development, the backend connects to a local Postgres database using environment variables. For production, the backend is deployed on Vercel and connected to a hosted Postgres database provisioned through Neon.
The backend reads its database connection details from environment variables injected by Vercel, allowing the same codebase to run in both local and deployment environments.

The frontend remains a Vite + React single-page application. It now retrieves all employee and organization data from the backend API instead of relying on hardcoded data.
A VITE_API_BASE_URL environment variable is used to point the frontend to the deployed backend. A rewrite configuration was added so that client-side routing continues to work correctly when refreshing pages in production.

Overall, this lab moves the application from a prototype that relied on temporary data to a fully database-backed system with migrations, seeding, and a production-ready deployment setup.

---

## Lab_5.1

### Description:

In this lab, I added individual user authentication and protected “create” functionality using Clerk across both the frontend and backend.

On the frontend, I integrated Clerk into my Vite + React app and wrapped the application with a Clerk provider so authentication state is available everywhere.
I added login/logout controls directly into the navigation so users can sign in or sign out at any time. When a user is signed out, the application remains fully viewable (employees and organization roles still load), but entry creation is disabled.
Instead of showing the entry forms, the Employees and Organization pages display a small message explaining that the user must log in, along with a login button.

When a user is signed in, the entry forms become available again. For any action that creates data (POST requests), the frontend retrieves the user's session token and includes it in the Authorization header so requests are tied to an authenticated user session.

On the backend, I installed and configured Clerk's Express middleware to verify incoming requests. All POST routes were protected so that attempts to create employees or assign roles are rejected unless the request is authenticated.
This ensures that even if someone bypasses the UI and tries to call the API directly, the backend still enforces the “logged-in users only” rule for creating entries.

Overall, this lab upgrades the application from “public write access” to a secure, user-authenticated flow where anonymous users can browse data but only logged-in users can create new records.