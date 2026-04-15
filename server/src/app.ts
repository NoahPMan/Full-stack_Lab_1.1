import express from "express";
import cors from "cors";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import orgRoutes from "./api/v1/routes/orgRoutes";

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173"
].filter(Boolean) as string[];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) return callback(null, true);
            return callback(new Error(`CORS blocked for origin: ${origin}`));
        }
    })
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.send("API running"));

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/org", orgRoutes);

export default app;
