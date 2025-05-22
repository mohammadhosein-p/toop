import { getAPI, rotateAPI } from "./apiKeyHandler";

export async function fetchData<T = any>(
  url: string,
  tag?: string[]
): Promise<T> {
  let attempts = 0;
  const maxAttempts = 3;
  console.log(`fetching ${url}`)

  while (attempts < maxAttempts) {
    try {
      const apiKey = getAPI();

      const res = await fetch(url, {
        headers: {
          "X-Auth-Token": apiKey,
        },
        next: { revalidate: 60, tags: tag },
      });

      if (res.status === 429) {
        rotateAPI();
        attempts++;
        console.warn(`API rotated. Retrying... (attempt ${attempts})`);
        continue;
      }

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      return data as T;
    } catch (err) {
      throw err;
    }
  }

  throw new Error("All API keys exhausted or request failed.");
}
