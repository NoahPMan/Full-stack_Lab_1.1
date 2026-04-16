import { Router } from "express";
import { getRolesHandler, createOrgPersonHandler } from "../controllers/orgControllers";
import { requireSignedIn } from "../../../app";

const r = Router();

r.get("/roles", getRolesHandler);

// Lab 5.1: POSTs must be authenticated
r.post("/roles/assign", requireSignedIn, createOrgPersonHandler);

export default r;
