import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import analyzeRoutes from "./routes/analyze.routes.js";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Repo Explainer API"
    });
});

app.use("/api/analyze", analyzeRoutes);

export default app;