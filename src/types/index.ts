export type Profile = Record<string, string>;
export type Outcome = 'MATCH' | 'DOES_NOT_MATCH' | 'UNKNOWN';
export interface Source { url: string; name: string; section: string; method: string }
export interface Criterion { id: string; label: string; field?: string; values?: string[]; maxIncome?: number; source: Source; verified: boolean }
export interface Opportunity {
 id: string; name: string; shortName: string; provider: string; description: string; audience: string;
 opportunityType: 'scholarship' | 'support'; educationLevels: string[]; geographicCoverage: string[];
 eligibilityCriteria: Criterion[]; informationUrl: string; applicationUrl: string | null;
 applicationStatus: 'unknown' | 'open' | 'closed'; opensAt: string | null; closesAt: string | null;
 benefitDescription: string | null; requiredDocuments: string[]; applicationSteps: string[];
 sources: Source[]; lastVerifiedAt: string | null; verificationStatus: 'verified' | 'partially_verified' | 'needs_verification' | 'historical'; limitation: string;
}
