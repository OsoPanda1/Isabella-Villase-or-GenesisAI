import type { InferenceAdapter, GenerationRequest, GenerationResult } from "./types";
export class FailingClosedAdapter implements InferenceAdapter {
  constructor(private readonly reason="no_inference_provider") {}
  async generate(_request: GenerationRequest): Promise<GenerationResult> { throw new Error(`INFERENCE: ${this.reason}`); }
}
