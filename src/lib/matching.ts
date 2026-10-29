import type { Criterion, Opportunity, Outcome, Profile } from '../types';
export const incomeRanges: Record<string, [number, number]> = { low:[0,250000], middle:[250001,450000], upper:[450001,800000], high:[800001,Infinity] };
export function evaluate(c: Criterion, profile: Profile): Outcome {
 if (!c.verified || !c.field) return 'UNKNOWN';
 const value = profile[c.field];
 if (!value || value === 'unknown') return 'UNKNOWN';
 if (c.maxIncome !== undefined) { const range = incomeRanges[value]; if (!range) return 'UNKNOWN'; return range[1] <= c.maxIncome ? 'MATCH' : range[0] > c.maxIncome ? 'DOES_NOT_MATCH' : 'UNKNOWN'; }
 if (!c.values?.length) return 'UNKNOWN';
 return c.values.includes(value) ? 'MATCH' : 'DOES_NOT_MATCH';
}
export function matchOpportunity(o: Opportunity, profile: Profile = {}) {
 const criteria = (o.eligibilityCriteria ?? []).map(c => ({...c, outcome:evaluate(c,profile)}));
 const matched = criteria.filter(c=>c.outcome==='MATCH').length;
 const conflicts = criteria.filter(c=>c.outcome==='DOES_NOT_MATCH').length;
 const unknown = criteria.length - matched - conflicts;
 const score = criteria.length ? Math.round(matched / criteria.length * 100) : 0;
 const band = conflicts ? 'Some criteria do not match' : !matched ? 'Insufficient verified information' : unknown ? 'Possible match — information needed' : 'Strong potential match';
 return {criteria,matched,conflicts,unknown,score,band};
}
export function applicationStatus(o: Opportunity, today = new Date().toISOString().slice(0,10)) {
 if (o.closesAt && o.closesAt < today) return 'closed';
 if (o.opensAt && o.opensAt > today) return 'unknown';
 return o.applicationStatus;
}
