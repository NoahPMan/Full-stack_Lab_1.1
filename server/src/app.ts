import express from "express";
import cors from "cors";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import orgRoutes from "./api/v1/routes/orgRoutes";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.send("API running"));

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/org", orgRoutes);

export default app;