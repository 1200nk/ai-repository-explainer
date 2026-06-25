export function buildRepositoryPrompt(repository, files) {
  const fileContents = files
    .map(
      (file) => `
==========================
FILE: ${file.path}
==========================

${file.content}
`
    )
    .join("\n");

  return `
You are an expert software architect.

Analyze the following GitHub repository.

Repository:
${repository.owner}/${repository.repo}

Directory Tree:

${repository.asciiTree}

The following are the most important files.

${fileContents}

Generate a detailed Markdown report with the following sections:

# Overview

Briefly describe the purpose of the repository.

# Tech Stack

# Project Structure

Explain the folder organization.

# Architecture

Describe how the application works.

# Request / Data Flow

Describe the main flow of data.

# Important Files

Explain why each important file exists.

# Key Design Decisions

# Possible Improvements

Return ONLY markdown.
`;
}