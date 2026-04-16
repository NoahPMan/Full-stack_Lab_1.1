import { Router } from "express";
import {
  getEmployeesHandler,
  getDepartmentsHandler,
  createEmployeeHandler
} from "../controllers/employeeController";
import { requireSignedIn } from "../../../app";

const r = Router();

r.get("/", getEmployeesHandler);
r.get("/departments", getDepartmentsHandler);

// Lab 5.1: POSTs must be authenticated
r.post("/", requireSignedIn, createEmployeeHandler);

export default r;