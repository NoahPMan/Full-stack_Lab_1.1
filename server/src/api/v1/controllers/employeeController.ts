import { Request, Response } from "express";
import { listDepartments, listEmployees, addEmployee } from "../services/employeeService";

export async function getDepartmentsHandler(_req: Request, res: Response) {
  res.json(await listDepartments());
}

export async function getEmployeesHandler(_req: Request, res: Response) {
  res.json(await listEmployees());
}

export async function createEmployeeHandler(req: Request, res: Response) {
  const result = await addEmployee(req.body);
  if (!result.ok) return res.status(400).json(result);
  return res.status(201).json(result);
}