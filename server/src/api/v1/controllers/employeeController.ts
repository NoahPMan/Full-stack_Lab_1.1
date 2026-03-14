import { Request, Response } from "express";
import { listEmployees, listDepartments, addEmployee } from "../services/employeeService";

export function getEmployeesHandler(_req: Request, res: Response) {
  res.json(listEmployees());
}

export function getDepartmentsHandler(_req: Request, res: Response) {
  res.json(listDepartments());
}

export function createEmployeeHandler(req: Request, res: Response) {
  const result = addEmployee(req.body);
  if (!result.ok) return res.status(400).json(result);
  return res.status(201).json(result);
}