import type { ModelClient, ModelMessage } from "./types.js";

export interface OpenAICompatibleConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

function trimTrailingSlash(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export class OpenAICompatibleClient implements ModelClient {
  private baseUrl: string;
  private apiKey: string;
  private model: string;

  constructor(config: OpenAICompatibleConfig) {
    this.baseUrl = trimTrailingSlash(config.baseUrl);
    this.apiKey = config.apiKey;
    this.model = config.model;
  }

  async completeJson<T>(messages: ModelMessage[], fallback: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        temperature: 0.7,
        messages,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`Model API failed: ${response.status} ${detail}`);
    }

    const payload = await response.json() as any;
    const content = payload?.choices?.[0]?.message?.content;
    if (!content || typeof content !== "string") return fallback;

    try {
      return JSON.parse(content) as T;
    } catch {
      const match = content.match(/\{[\s\S]*\}/);
      if (!match) return fallback;
      try {
        return JSON.parse(match[0]) as T;
      } catch {
        return fallback;
      }
    }
  }
}

export function createModelFromEnv(): ModelClient | null {
  const baseUrl = process.env.AI_BASE_URL;
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || "mimo-v2.5-pro";
  if (!baseUrl || !apiKey || apiKey === "replace_me") return null;
  return new OpenAICompatibleClient({ baseUrl, apiKey, model });
}
