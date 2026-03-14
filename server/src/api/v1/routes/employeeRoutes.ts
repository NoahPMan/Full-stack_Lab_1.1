import { Router } from "express";
import { getEmployeesHandler, getDepartmentsHandler, createEmployeeHandler } from "../controllers/employeeController";

const r = Router();
r.get("/", getEmployeesHandler);
r.get("/departments", getDepartmentsHandler);
r.post("/", createEmployeeHandler);
export default r;