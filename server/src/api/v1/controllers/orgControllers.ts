import { Request, Response } from "express";
import { listRoles, addPersonToRole } from "../services/orgService";

export async function getRolesHandler(_req: Request, res: Response) {
  res.json(await listRoles());
}

export async function createOrgPersonHandler(req: Request, res: Response) {
  const result = await addPersonToRole(req.body);
  if (!result.ok) return res.status(400).json(result);
  return res.status(201).json(result);
}