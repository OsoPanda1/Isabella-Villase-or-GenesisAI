import type { GenerationRequest, GenerationResult, InferenceAdapter, InferenceRouter, ModelDescriptor } from "./types";
export class GovernedInferenceRouter implements InferenceRouter {
 private readonly models=new Map<string,InferenceAdapter>();
 register(adapter:InferenceAdapter):void{if(this.models.has(adapter.descriptor.id))throw new Error("INFERENCE: duplicate model");this.models.set(adapter.descriptor.id,adapter);}
 list():readonly ModelDescriptor[]{return [...this.models.values()].map(m=>m.descriptor);}
 async generate(request:GenerationRequest):Promise<GenerationResult>{const a=request.modelId?this.models.get(request.modelId):this.select();if(!a)throw new Error("INFERENCE: no compatible model");if(request.maxTokens<1||request.maxTokens>a.descriptor.maxOutputTokens)throw new Error("INFERENCE: token budget rejected");return a.generate(request);}
 private select():InferenceAdapter|undefined{return [...this.models.values()].sort((a,b)=>a.descriptor.latencyClass.localeCompare(b.descriptor.latencyClass))[0];}
}