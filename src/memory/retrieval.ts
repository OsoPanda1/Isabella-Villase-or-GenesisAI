import type { IKESEngine,KnowledgeClaim } from "./ikes";
import type { VectorStore } from "./vector";
export interface RetrievalResult{claims:KnowledgeClaim[];semantic:readonly{id:string;text:string;score:number}[];}
export class GovernedRetriever{
 constructor(private readonly ikes:IKESEngine,private readonly vectors:VectorStore,private readonly embed:(q:string)=>Promise<readonly number[]>){}
 async retrieve(query:string,limit=8):Promise<RetrievalResult>{const claims=this.ikes.retrieve(query).slice(0,limit);const v=await this.embed(query);const semantic=this.vectors.search(v,limit).map(r=>({id:r.id,text:r.text,score:1}));return{claims,semantic};}
}