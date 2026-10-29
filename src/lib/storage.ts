export const STORAGE_KEY='opendoor-shortlist-v1';
export interface SavedData { saved: string[]; tasks: Record<string,boolean> }
export function parseStorage(raw: string | null): SavedData {
 try { const x: unknown = JSON.parse(raw || '{}'); if(!x || typeof x!=='object') return {saved:[],tasks:{}};
 const o=x as Record<string,unknown>; const tasks: Record<string,boolean>={};
 if(o.tasks && typeof o.tasks==='object' && !Array.isArray(o.tasks)) for(const [k,v] of Object.entries(o.tasks)) if(typeof v==='boolean' && k.length<180) tasks[k]=v;
 return {saved:Array.isArray(o.saved)? [...new Set(o.saved.filter((v):v is string=>typeof v==='string' && v.length<100))]:[],tasks};
 } catch {return {saved:[],tasks:{}};}
}
