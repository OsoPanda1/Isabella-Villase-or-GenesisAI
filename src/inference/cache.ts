export interface CacheEntry<T>{value:T;createdAt:number;expiresAt:number;hits:number;}
export class TtlCache<T>{
 private readonly data=new Map<string,CacheEntry<T>>();
 constructor(private readonly ttlMs=30000,private readonly maxEntries=1000){}
 get(key:string):T|undefined{const e=this.data.get(key);if(!e)return undefined;if(Date.now()>=e.expiresAt){this.data.delete(key);return undefined;}e.hits++;return e.value;}
 set(key:string,value:T):void{if(this.data.size>=this.maxEntries&&!this.data.has(key)){const first=this.data.keys().next().value;if(first!==undefined)this.data.delete(first);}const now=Date.now();this.data.set(key,{value,createdAt:now,expiresAt:now+this.ttlMs,hits:0});}
 clear():void{this.data.clear();}
 stats(){return{entries:this.data.size,hits:[...this.data.values()].reduce((n,e)=>n+e.hits,0)};}
}