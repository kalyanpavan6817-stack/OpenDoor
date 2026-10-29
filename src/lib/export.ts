import type { Opportunity } from '../types';
export function exportShortlist(items: Opportunity[]) {
 const blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),notice:'Discovery shortlist, not an eligibility decision. Confirm all current conditions on official sources.',opportunities:items.map(o=>({name:o.name,source:o.informationUrl,applicationUrl:o.applicationUrl,closesAt:o.closesAt,verification:o.verificationStatus}))},null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url;a.download='opendoor-shortlist.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
