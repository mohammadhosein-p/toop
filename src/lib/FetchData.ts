import axios from "axios";
import { getAPI, rotateAPI } from "./apiKeyHandler";

export async function fetchData<T = any>(url: string): Promise<T> {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const apiKey = getAPI();
      const { data } = await axios.get<T>(url, {
        headers: {
          "X-Auth-Token": apiKey,
        },
      });

      return data;
    } catch (error: any) {
      if (error.response?.status === 429) {
        rotateAPI();
        attempts++;
        console.warn(`API rotated. Retrying... (attempt ${attempts})`);
      } else {
        throw error;
      }
    }
  }

  throw new Error("All API keys exhausted or request failed.");
}
