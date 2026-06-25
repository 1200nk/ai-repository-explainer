import Groq from "groq-sdk";
import env from "../config/env.js";
import { buildSelectFilesPrompt } from "../prompts/selectFiles.prompt.js";
import { buildRepositoryPrompt } from "../prompts/explainRepository.prompt.js";

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export async function selectImportantFiles(tree) {
  const prompt = buildSelectFilesPrompt(tree);

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = completion.choices[0].message.content;

  return JSON.parse(content).files;
}

export async function* generateRepositoryExplanation(repository, files) {
  const prompt = buildRepositoryPrompt(repository, files);

  const stream = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    stream: true,

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;

    if (content) {
      yield content;
    }
  }
}