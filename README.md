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

| Branch Name   | Purpose                  |
|--------------|--------------------------|
| fs_lab-1.1   | Lab 1.1 implementation  |
| fs_lab-1.2   | Lab 1.2 React rebuild   |

Both labs were completed on their own branches.  
Lab 1.2 was later merged into `main` for deployment to Vercel, as required.