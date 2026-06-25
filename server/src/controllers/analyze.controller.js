import { analyzeRepository } from "../services/analyzer.service.js";

export async function analyze(req, res, next) {
  try {
    const { githubUrl } = req.query;

    if (!githubUrl) {
      return res.status(400).json({
        success: false,
        message: "GitHub URL is required.",
      });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    await analyzeRepository(githubUrl, res);

    res.end();
  } catch (err) {
    next(err);
  }
}