import {
  inspectRepository,
  getMultipleFiles,
} from "./github.service.js";

import {
  selectImportantFiles,
  generateRepositoryExplanation,
} from "./groq.service.js";

import { sendEvent } from "../utils/stream.js";

export async function analyzeRepository(githubUrl, res) {
  sendEvent(res, "status", "Fetching repository...");

  const repository = await inspectRepository(githubUrl);

  sendEvent(res, "status", "Selecting important files...");

  const importantFiles = await selectImportantFiles(
    repository.asciiTree
  );

  sendEvent(res, "files", importantFiles);

  sendEvent(res, "status", "Downloading files...");

  const files = await getMultipleFiles(
    repository.owner,
    repository.repo,
    repository.branch,
    importantFiles
  );

  sendEvent(res, "status", "Generating explanation...");

  for await (const chunk of generateRepositoryExplanation(
    repository,
    files
  )) {
    sendEvent(res, "markdown", chunk);
  }

  sendEvent(res, "done", {
    repository: {
      owner: repository.owner,
      repo: repository.repo,
      branch: repository.branch,
    },

    files: files.map(file => file.path),
  });
}