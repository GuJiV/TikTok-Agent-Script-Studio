import type { ModelClient, ModelMessage } from "./types.js";

export class MockModelClient implements ModelClient {
  async completeJson<T>(_messages: ModelMessage[], fallback: T): Promise<T> {
    return fallback;
  }
}
