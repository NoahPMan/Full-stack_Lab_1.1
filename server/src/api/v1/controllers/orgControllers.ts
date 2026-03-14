import { Request, Response } from "express";
import { listRoles, addPersonToRole } from "../services/orgService";

export function getRolesHandler(_req: Request, res: Response) {
  res.json(listRoles());
}

export function createOrgPersonHandler(req: Request, res: Response) {
  const result = addPersonToRole(req.body);
  if (!result.ok) return res.status(400).json(result);
  return res.status(201).json(result);
}
``