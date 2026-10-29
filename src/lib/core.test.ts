import {describe,it,expect} from 'vitest';
import {matchOpportunity,evaluate,applicationStatus} from './matching';
import {validateProfile} from './validation';
import {parseStorage} from './storage';
import {opportunities} from '../data/opportunities';
import type {Criterion} from '../types';
const c:Criterion={id:'income',label:'income',field:'income',maxIncome:450000,verified:true,source:opportunities[0].sources[0]};
describe('deterministic matching',()=>{
 it('treats every missing answer as unknown',()=>{for(const o of opportunities){const m=matchOpportunity(o);expect(m.matched).toBe(0);expect(m.conflicts).toBe(0);expect(m.unknown).toBe(o.eligibilityCriteria.length);}});
 it('handles exact bracket boundaries',()=>{expect(evaluate(c,{income:'middle'})).toBe('MATCH');expect(evaluate(c,{income:'upper'})).toBe('DOES_NOT_MATCH');});
 it('does not guess across overlapping brackets',()=>expect(evaluate({...c,maxIncome:300000},{income:'middle'})).toBe('UNKNOWN'));
 it('does not evaluate unverified criteria',()=>expect(evaluate({...c,verified:false},{income:'low'})).toBe('UNKNOWN'));
 it('treats malformed income as unknown',()=>expect(evaluate(c,{income:'not-a-bracket'})).toBe('UNKNOWN'));
 it('gives conflicts priority over partial matches',()=>{const m=matchOpportunity(opportunities[1],{level:'Undergraduate',year:'1'});expect(m.band).toBe('Some criteria do not match');expect(m.conflicts).toBe(1);expect(m.matched).toBe(1);});
 it('retains unmodeled conditions even in a plausible profile',()=>{const m=matchOpportunity(opportunities[1],{level:'Postgraduate',year:'1',mode:'Regular / full time'});expect(m.band).toBe('Possible match — information needed');expect(m.unknown).toBe(2);});
 it('handles an empty criteria list',()=>expect(matchOpportunity({...opportunities[0],eligibilityCriteria:[]}).band).toBe('Insufficient verified information'));
 it('reports a strong potential match only for all matching checks',()=>expect(matchOpportunity({...opportunities[0],eligibilityCriteria:[c]},{income:'low'}).band).toBe('Strong potential match'));
 it('expires a verified open deadline',()=>expect(applicationStatus({...opportunities[0],applicationStatus:'open',closesAt:'2025-01-01'},'2026-01-01')).toBe('closed'));
 it('does not mark future windows open',()=>expect(applicationStatus({...opportunities[0],applicationStatus:'open',opensAt:'2027-01-01'},'2026-01-01')).toBe('unknown'));
});
describe('validation and persistence',()=>{
 it('requires academic context but not sensitive answers',()=>{expect(Object.keys(validateProfile({}))).toHaveLength(4);expect(validateProfile({state:'Telangana',level:'Undergraduate',course:'Technical',year:'1'})).toEqual({});});
 it('rejects unsupported options',()=>expect(validateProfile({state:'Mars'}).state).toBeTruthy());
 it('rejects inconsistent fresh entry and academic year',()=>{expect(validateProfile({entry:'First year',year:'4'}).entry).toBeTruthy();expect(validateProfile({entry:'Second year lateral entry',year:'1'}).entry).toBeTruthy();});
 it('accepts optional unknowns',()=>expect(validateProfile({state:'Telangana',level:'Undergraduate',course:'Technical',year:'1',income:'unknown'})).toEqual({}));
 it.each(['broken','null','[]','{"saved":false,"tasks":null}'])('handles malformed storage %s',raw=>expect(parseStorage(raw)).toEqual({saved:[],tasks:{}}));
 it('sanitizes stored fields',()=>expect(parseStorage('{"saved":["ugc-pg",4,"ugc-pg"],"tasks":{"a":true,"b":"yes"},"income":"low"}')).toEqual({saved:['ugc-pg'],tasks:{a:true}}));
});
describe('curated data contract',()=>{
 it('has unique IDs and no unsupported application windows',()=>{expect(new Set(opportunities.map(o=>o.id)).size).toBe(opportunities.length);for(const o of opportunities){expect(o.applicationStatus).toBe('unknown');expect(o.closesAt).toBeNull();expect(o.sources.length).toBeGreaterThan(0);expect(o.verificationStatus).toBe('partially_verified');for(const c of o.eligibilityCriteria)expect(c.source.url).toMatch(/^https:\/\//);}});
});
