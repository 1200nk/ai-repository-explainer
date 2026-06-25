export function buildSelectFilesPrompt(tree) {
  return `
You are an expert software architect.

You will receive the directory tree of a GitHub repository.

Your task is to select the files that are most important for understanding the architecture and implementation.

Prioritize:

- package.json
- README.md
- Entry points
- Configuration
- Routing
- API
- Database
- Authentication
- Business logic
- Core React components

Ignore:

- node_modules
- dist
- build
- coverage
- images
- tests
- lock files
- generated code

Return ONLY valid JSON.

Example:

{
  "files": [
    "package.json",
    "src/App.tsx"
  ]
}

Repository Tree:

${tree}
`;
}