import { Router } from "express";
import { getRolesHandler, createOrgPersonHandler } from "../controllers/orgControllers";

const r = Router();
r.get("/roles", getRolesHandler);
r.post("/roles/assign", createOrgPersonHandler);
export default r;