export interface VentureDivision {
  code: string;
  title: string;
  description: string;
}

export interface BusinessEntity {
  id: string;
  number: string;
  name: string;
  shortName: string;
  category: string;
  tagline: string;
  summary: string;
  motto?: string;
  mantra?: string;
  logo?: string;
  website?: string;
  websiteComingSoon?: boolean;
  coreMessage: string;
  focusAreas: string[];
  divisions?: VentureDivision[];
  audience: string;
  ecosystemDomain: string;
  ecosystemRole: string;
  accentColor: string;
  bgDark?: boolean;
}

export interface PhilosophyItem {
  letter: string;
  title: string;
  description: string;
  implication: string;
}

export interface TimelineMilestone {
  step: string;
  yearOrPhase: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  bio?: string;
  initials: string;
  image?: string;
}

export interface ClientPartner {
  name: string;
  type: 'school' | 'corporate';
  categoryLabel: string;
  location?: string;
}

export interface AudienceGroup {
  number: string;
  name: string;
  description: string;
  recommendedEntities: string[];
}

export interface CoreValue {
  name: string;
  definition: string;
}
