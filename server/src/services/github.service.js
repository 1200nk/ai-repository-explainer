import axios from "axios";
import env from "../config/env.js";
import pLimit from "p-limit";
import { buildTree } from "../utils/treeBuilder.js";
import { renderTree } from "../utils/treeRenderer.js";

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    ...(env.GITHUB_TOKEN && {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    }),
  },
});

/**
 * Extract owner and repo from GitHub URL
 */
function parseGithubUrl(url) {
  const regex =
    /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/;

  const match = url.match(regex);

  if (!match) {
    throw new Error("Invalid GitHub repository URL");
  }

  return {
    owner: match[1],
    repo: match[2],
  };
}

/**
 * Get repository metadata
 */
async function getRepository(owner, repo) {
  const { data } = await github.get(`/repos/${owner}/${repo}`);
  return data;
}

/**
 * Get full repository tree
 */
async function getRepositoryTree(owner, repo, branch) {
  const { data } = await github.get(
    `/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`
  );

  return data.tree;
}

/**
 * Download a single file
 */
async function getRawFile(owner, repo, branch, path) {
  const { data } = await github.get(
    `/repos/${owner}/${repo}/contents/${path}?ref=${branch}`
  );

  return Buffer.from(data.content, "base64").toString("utf8");
}

/**
 * Download many files in parallel
 */
export async function getMultipleFiles(owner, repo, branch, paths) {
  const limit = pLimit(5);

  const results = await Promise.allSettled(
    paths.map(path =>
      limit(async () => ({
        path,
        content: await getRawFile(owner, repo, branch, path),
      }))
    )
  );

  return results
    .filter(result => result.status === "fulfilled")
    .map(result => result.value);
}

/**
 * Main function used by the controller
 */
export async function inspectRepository(githubUrl) {
  const { owner, repo } = parseGithubUrl(githubUrl);

  const repository = await getRepository(owner, repo);

  const branch = repository.default_branch;

  const rawTree = await getRepositoryTree(owner, repo, branch);

  // Internal representation
  const tree = buildTree(rawTree);

  // Public representation
  const asciiTree = renderTree(tree);

  return {
    owner,
    repo,
    branch,
    asciiTree,
  };
}