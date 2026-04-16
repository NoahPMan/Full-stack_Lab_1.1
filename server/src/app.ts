import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import { clerkMiddleware, getAuth } from "@clerk/express";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import orgRoutes from "./api/v1/routes/orgRoutes";

const app = express();

app.use(clerkMiddleware());

export function requireSignedIn(req: Request, res: Response, next: NextFunction) {
    const auth = getAuth(req);
    if (!auth?.userId) return res.status(401).json({ error: "Unauthorized" });
    return next();
}

const envOrigins = (process.env.FRONTEND_URL ?? "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

const allowedOrigins = new Set<string>([
    ...envOrigins,
    "http://localhost:5173"
]);

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.has(origin)) return callback(null, true);
        return callback(null, false);
    }
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.send("API running"));

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/org", orgRoutes);

export default app;