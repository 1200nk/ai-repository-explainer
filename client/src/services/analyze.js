const API_BASE = "http://localhost:5000/api/analyze";

export function analyzeRepository(githubUrl, handlers) {
  const url =
    `${API_BASE}/stream?githubUrl=` +
    encodeURIComponent(githubUrl);

  const source = new EventSource(url);

  source.addEventListener("status", (event) => {
    handlers.onStatus?.(JSON.parse(event.data));
  });

  source.addEventListener("files", (event) => {
    handlers.onFiles?.(JSON.parse(event.data));
  });

  source.addEventListener("markdown", (event) => {
    handlers.onMarkdown?.(JSON.parse(event.data));
  });

  source.addEventListener("done", (event) => {
    handlers.onDone?.(JSON.parse(event.data));
    source.close();
  });

  source.addEventListener("error", (event) => {
    handlers.onError?.(event);
    source.close();
  });

  return source;
}