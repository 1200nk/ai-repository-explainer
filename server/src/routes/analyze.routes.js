import { Router } from "express";
import { analyze } from "../controllers/analyze.controller.js";

const router = Router();

router.get("/stream", analyze);

export default router;