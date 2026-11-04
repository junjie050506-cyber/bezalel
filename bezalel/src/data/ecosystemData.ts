import {
  BusinessEntity,
  PhilosophyItem,
  TimelineMilestone,
  TeamMember,
  ClientPartner,
  AudienceGroup,
  CoreValue,
} from '../types';

export const EXECUTIVE_PROFILE = {
  sectionLabel: 'EXECUTIVE PROFILE',
  headline: 'A purpose-led ecosystem built around people and enterprise',
  lead: 'BEZALEL INC develops people, responds to needs, creates opportunity and builds sustainable enterprise.',
  body: 'Its specialised businesses span psychological and relational wellbeing, corporate training and consultancy, creative and marketing services, and corporate governance and business support under one enduring standard.',
  formulaLine1: 'PEOPLE → CAPABILITY → OPPORTUNITY',
  formulaLine2: 'ENTERPRISE → MULTIPLICATION',
  closing: 'Commercial sustainability and human development move together.',
};

export const BIBLICAL_STEWARDSHIP = {
  sectionLabel: 'THE NAME BEHIND THE WORK',
  scripture: 'EXODUS 31:1–6',
  headline:
    'Bezalel was called and equipped with wisdom, understanding, knowledge and skill for purposeful creative work.',
  body: 'For the Group, the name represents stewardship: using gifts, ideas, expertise, relationships and resources purposefully and responsibly.',
  body2:
    'Every venture within the ecosystem reflects this conviction—that excellence in craft and care for people belong together.',
  callout1:
    'Called by name, filled with wisdom, understanding, and knowledge in all manner of workmanship.',
  callout2: 'Craftsmanship · Stewardship · Multiplication',
  closingLine: 'CALLED TO BUILD WITH WISDOM & PURPOSE',
};

export const PURPOSE_VISION_MISSION_PROMISE = {
  sectionLabel: 'PURPOSE • VISION • MISSION • PROMISE',
  headline: 'We build capability that creates opportunity',
  items: [
    {
      label: 'PURPOSE',
      text: 'Equip people and strengthen enterprises so opportunity can be created, sustained and multiplied.',
    },
    {
      label: 'VISION',
      text: 'See people and enterprises become catalysts of sustainable opportunity for families, organisations, communities and future generations.',
    },
    {
      label: 'MISSION',
      text: 'Develop human potential and enterprise capability through education, psychological and relational wellbeing, training, creativity, entrepreneurship, governance and business support.',
    },
    {
      label: 'PROMISE',
      text: 'Turn capability into sustainable opportunity—for people, organisations and the communities they influence.',
    },
  ],
  brandLine: 'EQUIP PEOPLE. STRENGTHEN ENTERPRISE. MULTIPLY OPPORTUNITY.',
};

export const PARENT_COMPANY: BusinessEntity = {
  id: 'bezalel',
  number: '00',
  name: 'BEZALEL INC',
  shortName: 'Bezalel Inc',
  category: 'PARENT GROUP & STRATEGIC HOLDINGS',
  tagline: 'Equip people. Strengthen enterprise. Multiply opportunity.',
  summary:
    'The parent holding company uniting specialised operating subsidiaries across psychological care, corporate training, brand growth, and corporate governance.',
  logo: '/assets/ventures/bezalel-insignia-logo.png',
  website: 'https://bezalelinc.com',
  coreMessage: 'EQUIP PEOPLE · STRENGTHEN ENTERPRISE · MULTIPLY OPPORTUNITY',
  focusAreas: [
    'Strategic group governance & portfolio stewardship',
    'Cross-venture synergy & resource multiplication',
    'Ecosystem partnerships & institutional alliances',
    'Shared values, excellence & enduring standards',
  ],
  audience: 'Institutional partners, investors, enterprise clients & ecosystem stakeholders',
  ecosystemDomain: 'GROUP STEWARDSHIP',
  ecosystemRole: 'Parent holding group & ecosystem anchor',
  accentColor: '#2D3A1E',
  bgDark: true,
};

export const FOUNDATION_PILLARS: CoreValue[] = [
  {
    name: 'Service',
    definition: 'Lead by serving and creating genuine value.',
  },
  {
    name: 'Stewardship',
    definition: 'Treat resources and opportunities as entrusted responsibilities.',
  },
  {
    name: 'Integrity',
    definition: 'Choose what is right over what is convenient.',
  },
  {
    name: 'Legacy',
    definition: 'Build impact that continues through others.',
  },
];

export const BUSINESS_ENTITIES: BusinessEntity[] = [
  {
    id: 'olive-vine',
    number: '01',
    name: 'OLIVE & VINE PSYCHOLOGICAL SOLUTIONS',
    shortName: 'Olive & Vine',
    category: 'PSYCHOLOGICAL & RELATIONAL WELLBEING',
    tagline: 'Renew Hearts. Strengthen Relationships.',
    summary:
      'Supporting children, young people, adults, parents and families through psychological and therapeutic care.',
    mantra: 'Care. Connect. Flourish.',
    logo: '/assets/ventures/olive-vine-logo.png',
    website: 'https://olivevine.solutions',
    websiteComingSoon: true,
    coreMessage: 'RENEW HEARTS. STRENGTHEN RELATIONSHIPS.',
    focusAreas: [
      'Psychological & Therapeutic Support',
      'Emotional Health & Identity',
      'Family & Relationship Support',
      'Personal Wellbeing',
    ],
    audience: 'Children, young people, adults, parents and families',
    ecosystemDomain: 'WELLBEING',
    ecosystemRole: 'Emotional & relational wellbeing',
    accentColor: '#A3B86C',
    bgDark: true,
  },
  {
    id: 'hur-on',
    number: '02',
    name: 'HUR-ON TRAINING & CONSULTANCY',
    shortName: 'HUR-ON',
    category: 'PEOPLE & ORGANISATIONAL DEVELOPMENT',
    tagline: 'Powered by Relational Intelligence',
    summary:
      'Developing people at every stage of life through training, experiential learning, development programmes and meaningful events.',
    motto: 'rhythm · artistry · flow',
    mantra: 'Learn. Relate. Grow.',
    logo: '/assets/ventures/hur-on-logo.png',
    website: 'https://hur-on.com',
    websiteComingSoon: true,
    coreMessage: 'POWERED BY RELATIONAL INTELLIGENCE',
    focusAreas: [
      'SPARK — Children & Youth',
      'PULSE — Corporate Training',
      'BLOOM — Seniors, Parents & Adults',
      'VERVE — Events, Camps & Competitions',
    ],
    divisions: [
      {
        code: 'SPARK',
        title: 'Children & Youth Development',
        description:
          'Children and youth development — creativity, communication, leadership and enrichment programmes.',
      },
      {
        code: 'PULSE',
        title: 'Corporate Training & Consultancy',
        description:
          'Corporate training and consultancy — leadership, teamwork and relational intelligence.',
      },
      {
        code: 'BLOOM',
        title: 'Seniors, Parents & Adults',
        description:
          'Activities and learning for seniors, parents and adults.',
      },
      {
        code: 'VERVE',
        title: 'Events, Camps & Competitions',
        description:
          'Events, school camps, competitions and experiential programmes.',
      },
    ],
    audience: 'Children, youth, corporations, leadership teams, seniors, parents and adults',
    ecosystemDomain: 'PEOPLE',
    ecosystemRole: 'People & organisational development across every stage of life',
    accentColor: '#8C9E5E',
    bgDark: false,
  },
  {
    id: 'mustard-seed',
    number: '03',
    name: 'MUSTARD SEED & CO',
    shortName: 'Mustard Seed & Co',
    category: 'CREATIVE, MARKETING & BUSINESS GROWTH',
    tagline: 'Seed the Idea. Forest the Vision.',
    summary:
      'Helping emerging and growing organisations clarify their position, communicate value and pursue sustainable business growth.',
    mantra: 'Plant. Nurture. Grow.',
    logo: '/assets/ventures/mustard-seed-logo.png',
    website: 'https://theseed.agency/index.html',
    coreMessage: 'SEED THE IDEA. FOREST THE VISION.',
    focusAreas: [
      'Branding & Creative Strategy',
      'Digital Marketing & Advertising',
      'Social Media, Content & Websites',
      'Campaigns & Business Consultancy',
    ],
    audience: 'Emerging and growing enterprises, SMEs, brands',
    ecosystemDomain: 'CREATIVE',
    ecosystemRole: 'Positioning, visibility & sustainable business growth',
    accentColor: '#D4A017',
    bgDark: true,
  },
  {
    id: 'phroneo',
    number: '04',
    name: 'PHRONEO BOARDSUITE',
    shortName: 'Phroneo BoardSuite',
    category: 'CORPORATE GOVERNANCE & BUSINESS SUPPORT',
    tagline: 'Wise Structure for Businesses Built to Endure.',
    summary:
      'Supporting entrepreneurs and enterprises with strong corporate, administrative and governance foundations.',
    mantra: 'Think. Govern. Build.',
    logo: '/assets/ventures/phroneo-logo.png',
    website: 'https://phroneoboardsuite.com',
    websiteComingSoon: true,
    coreMessage: 'WISE STRUCTURE FOR BUSINESSES BUILT TO ENDURE.',
    focusAreas: [
      'Business Registration & Incorporation',
      'Corporate Secretarial Services',
      'Financial Administration',
      'Business Support & Advisory',
    ],
    audience: 'Boards, entrepreneurs, corporate leaders and growing companies',
    ecosystemDomain: 'ENTERPRISE',
    ecosystemRole: 'Structure, governance & administrative continuity',
    accentColor: '#D4A017',
    bgDark: false,
  },
];

export const PHILOSOPHY_ACRONYM: PhilosophyItem[] = [
  {
    letter: 'B',
    title: 'BUILD PEOPLE',
    description: 'Develop people, character, confidence and capability.',
    implication: 'Every program and initiative starts with cultivating the individual.',
  },
  {
    letter: 'E',
    title: 'EQUIP POTENTIAL',
    description: 'Provide knowledge, skills, tools, exposure and opportunities that help potential become capability.',
    implication: 'Turning latent talent into tangible competence through disciplined practice.',
  },
  {
    letter: 'Z',
    title: 'ZEAL WITH PURPOSE',
    description: 'Bring energy, conviction and excellence to work that carries meaning beyond ourselves.',
    implication: 'Passion directed by transcendent purpose and stewardship.',
  },
  {
    letter: 'A',
    title: 'ADVANCE OPPORTUNITY',
    description: 'Create pathways for education, employment, enterprise, growth and contribution.',
    implication: 'Building bridges that convert newly gained capability into real-world livelihoods.',
  },
  {
    letter: 'L',
    title: 'LEAD THROUGH SERVICE',
    description: 'Exercise leadership through stewardship, responsibility and service to people.',
    implication: 'Servant leadership anchored in responsibility to others before self.',
  },
  {
    letter: 'E',
    title: 'ESTABLISH ENTERPRISE',
    description: 'Help ideas and capabilities become sustainable businesses, organisations and livelihoods.',
    implication: 'Institutionalizing solutions with commercial viability and governance.',
  },
  {
    letter: 'L',
    title: 'LEAVE A LEGACY',
    description: 'Build impact that continues through people and the opportunities they create for others.',
    implication: 'Generational multiplication where recipients become opportunity creators.',
  },
];

export const ECOSYSTEM_MATRIX = [
  {
    business: 'BEZALEL',
    focusDomain: 'Young People & Marketplace',
    outcome: 'Learning, capability & enterprise networks',
  },
  {
    business: 'OLIVE & VINE',
    focusDomain: 'Inner Person',
    outcome: 'Emotional & relational wellbeing',
  },
  {
    business: 'HUR-ON',
    focusDomain: 'Leaders & Teams',
    outcome: 'Behaviour & organisational capability',
  },
  {
    business: 'MUSTARD SEED',
    focusDomain: 'Brands & Business',
    outcome: 'Positioning, visibility & growth',
  },
  {
    business: 'PHRONEO',
    focusDomain: 'Foundations',
    outcome: 'Structure, governance & continuity',
  },
  {
    business: 'BEZALEL INC',
    focusDomain: 'The Ecosystem',
    outcome: 'Purpose, stewardship & multiplication',
  },
];

export const DIFFERENTIATORS = [
  {
    number: '01',
    title: 'ONE STORY',
    description: 'Capabilities cultivated across one continuing entrepreneurial journey.',
  },
  {
    number: '02',
    title: 'PEOPLE + ENTERPRISE',
    description: 'Human development connected with sustainable organisations.',
  },
  {
    number: '03',
    title: 'SERVICE, NOT DEPENDENCY',
    description: 'Equip people to contribute, earn, lead and build.',
  },
  {
    number: '04',
    title: 'PURPOSE + SUSTAINABILITY',
    description: 'Enterprise creates value, employment and impact.',
  },
  {
    number: '05',
    title: 'SPECIALISATION',
    description: 'Distinct expertise connected by one Group purpose.',
  },
  {
    number: '06',
    title: 'MULTIPLICATION',
    description: 'Success continues through what others go on to build.',
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    step: '01',
    yearOrPhase: '2004',
    title: 'VISION',
    description: 'The name and wider purpose became clear.',
    highlights: [
      'Rooted in Exodus 31:1–6 stewardship calling',
      'Uniting human care with enterprise capability',
    ],
  },
  {
    step: '02',
    yearOrPhase: '2008',
    title: 'FORMATION',
    description: 'Bezalel Resources formally established.',
    highlights: [
      'Statutory governance and operational groundwork',
      'Early community and youth education initiatives',
    ],
  },
  {
    step: '03',
    yearOrPhase: 'BUILD',
    title: 'EXPLORATION',
    description: 'High-impact institutional expansion.',
    highlights: [
      'Conference operations for ~RM1.7M project',
      'Established a dedicated refugee school in Malaysia',
    ],
  },
  {
    step: '04',
    yearOrPhase: 'TODAY',
    title: 'ECOSYSTEM',
    description: 'Connected human and enterprise growth.',
    highlights: [
      'Four specialised businesses across people, care, creative, and enterprise',
      'Turning capability into sustainable opportunity',
    ],
  },
];

export const TRACK_RECORD_ITEMS = [
  { index: '01', title: 'Social and NGO involvement since Lalitha’s teenage years' },
  { index: '02', title: 'Bezalel entrepreneurial journey since 2008' },
  { index: '03', title: 'Early conference involvement linked to an approximately RM1.7 million project' },
  { index: '04', title: 'Longstanding education, youth development and experiential programmes' },
  { index: '05', title: 'Spearheaded the establishment of a refugee school' },
  { index: '06', title: 'Training, coaching and organisational development' },
  { index: '07', title: 'Psychological and relational wellbeing' },
  { index: '08', title: 'Advertising, creativity and business growth' },
  { index: '09', title: 'Governance, compliance and business support' },
];

export const FOUNDER_PERSPECTIVES = [
  { index: '01', title: 'Advertising & client servicing' },
  { index: '02', title: 'Branding & marketing' },
  { index: '03', title: 'Teaching & education' },
  { index: '04', title: 'Training & facilitation' },
  { index: '05', title: 'Coaching & psychology' },
  { index: '06', title: 'Entrepreneurship & business development' },
  { index: '07', title: 'Leadership & community involvement' },
];

export const IMPACT_CHAIN = [
  {
    step: '01',
    name: 'DEVELOP CAPABILITY',
    description: 'A learner or team discovers capability through world-class enrichment, coaching, and psychological wellbeing.',
    actor: 'The Learner & The Individual',
  },
  {
    step: '02',
    name: 'CREATE OPPORTUNITY',
    description: 'Capability opens concrete pathways for work, education, community leadership, and new enterprise.',
    actor: 'The Professional & Family',
  },
  {
    step: '03',
    name: 'BUILD ENTERPRISE',
    description: 'New capabilities become sustainable businesses, enduring ventures, and resilient institutions.',
    actor: 'The Founder & Organisation',
  },
  {
    step: '04',
    name: 'MULTIPLY LIVELIHOODS',
    description: 'Enterprises generate meaningful employment, strengthening households, teams, and local economies.',
    actor: 'The Workplace & Community',
  },
  {
    step: '05',
    name: 'EXTEND IMPACT',
    description: 'Recipients become opportunity creators, passing forward knowledge, capital, and mentorship.',
    actor: 'Future Generations',
  },
];

export const LEGACY_STATEMENTS = [
  { entity: 'A young person', outcome: 'discovers capability.' },
  { entity: 'An individual', outcome: 'strengthens their inner life.' },
  { entity: 'An employee', outcome: 'becomes a leader.' },
  { entity: 'An entrepreneur', outcome: 'builds a sustainable enterprise.' },
  { entity: 'A business', outcome: 'creates jobs.' },
  { entity: 'A recipient', outcome: 'becomes an opportunity creator.' },
];

export const KINGDOM_MARKETPLACE_PILLARS = [
  {
    name: 'Commerce',
    summary: 'Ethical marketplace for goods, crafts, and trade powered by purpose-led founders.',
  },
  {
    name: 'Services',
    summary: 'High-trust professional, creative, legal, and operational service networks.',
  },
  {
    name: 'Employment',
    summary: 'Dignified work placements, apprenticeships, and talent matching.',
  },
  {
    name: 'Partnerships',
    summary: 'Collaborative consortia tackling systemic challenges across communities.',
  },
  {
    name: 'Learning',
    summary: 'Continuous wisdom transfer, masterclasses, and executive mentorship.',
  },
  {
    name: 'Impact',
    summary: 'Audited social return, livelihood generation, and generational stewardship.',
  },
];

export const CORE_VALUES: CoreValue[] = [
  {
    name: 'SERVICE',
    definition: 'Lead by serving and creating genuine value.',
  },
  {
    name: 'STEWARDSHIP',
    definition: 'Treat resources and opportunities as entrusted responsibilities.',
  },
  {
    name: 'INTEGRITY',
    definition: 'Choose what is right over what is convenient.',
  },
  {
    name: 'EXCELLENCE',
    definition: 'Pursue quality, competence and continual improvement.',
  },
  {
    name: 'PEOPLE',
    definition: 'See the person before the transaction.',
  },
  {
    name: 'ENTERPRISE',
    definition: 'Build ideas and capability into sustainable solutions.',
  },
  {
    name: 'MULTIPLICATION',
    definition: 'Seek outcomes that continue through others.',
  },
];

export const AUDIENCE_GROUPS: AudienceGroup[] = [
  {
    number: '01',
    name: 'Children & young people',
    description: 'Curiosity, scientific inquiry, critical thinking, debate, and character development beyond the conventional syllabus.',
    recommendedEntities: ['BEZALEL', 'OLIVE & VINE PSYCHOLOGICAL SOLUTIONS'],
  },
  {
    number: '02',
    name: 'Parents & families',
    description: 'Therapeutic and emotional support, relational intelligence, and holistic parenting coaching.',
    recommendedEntities: ['OLIVE & VINE PSYCHOLOGICAL SOLUTIONS'],
  },
  {
    number: '03',
    name: 'Professionals & employees',
    description: 'Personal effectiveness, communications, mindset evolution, and vocational growth.',
    recommendedEntities: ['HUR-ON TRAINING & CONSULTANCY'],
  },
  {
    number: '04',
    name: 'Leaders & teams',
    description: 'High-performance team dynamics, experiential management simulations, and leadership alignment.',
    recommendedEntities: ['HUR-ON TRAINING & CONSULTANCY'],
  },
  {
    number: '05',
    name: 'Entrepreneurs & SMEs',
    description: 'Brand positioning, commercial campaign launch, customer acquisition, and market clarity.',
    recommendedEntities: ['MUSTARD SEED & CO', 'PHRONEO BOARDSUITE'],
  },
  {
    number: '06',
    name: 'Established organisations',
    description: 'Corporate governance, statutory compliance, secretarial advisory, and enterprise scaling.',
    recommendedEntities: ['PHRONEO BOARDSUITE', 'HUR-ON TRAINING & CONSULTANCY'],
  },
  {
    number: '07',
    name: 'Schools & education communities',
    description: 'Co-curricular forensics, debate clubs, LEGO challenges, teacher workshops, and student wellbeing.',
    recommendedEntities: ['BEZALEL', 'OLIVE & VINE PSYCHOLOGICAL SOLUTIONS'],
  },
  {
    number: '08',
    name: 'Purpose-led organisations',
    description: 'NGOs, faith-based bodies, and social enterprises building enduring institutional stewardship.',
    recommendedEntities: ['BEZALEL INC', 'BEZALEL'],
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Lalitha Manoharan',
    role: 'Founder & Chief Servant Officer (CSO)',
    department: 'Executive Leadership',
    bio: 'Entrepreneur, psychotherapist, trainer, coach, and facilitator. Her life work connects entrepreneurship, people development, education, advertising, psychology, business development, and social impact.',
    initials: 'LM',
    image: '/assets/team/lalitha-manoharan.jpg',
  },
  {
    name: 'Puvisha Manoharan',
    role: 'Head Of Business Development',
    department: 'Commercial & Partnerships',
    bio: 'Oversees strategic growth, alliance development, and cross-entity synergy across the Bezalel Inc operating portfolio.',
    initials: 'PM',
    image: '/assets/team/puvisha-manoharan.jpg',
  },
  {
    name: 'Patricia Tan',
    role: 'Head Of Creative & Branding',
    department: 'Creative & Marketing',
    bio: 'Leads brand strategy, visual systems, and campaign communications for Mustard Seed & Co and ecosystem partners.',
    initials: 'PT',
    image: '/assets/team/patricia-tan.jpg',
  },
  {
    name: 'Yen Wei (Yuki), Yap',
    role: 'Visual Communications Lead',
    department: 'Creative & Operations',
    bio: 'Spearheads visual narrative design and cross-programme operational cohesion across school and corporate deployments.',
    initials: 'YY',
    image: '/assets/team/yen-wei-yuki-yap.jpg',
  },
  {
    name: 'Priya',
    role: 'Education Programmes Executive',
    department: 'Bezalel Global',
    bio: 'Designs and executes experiential youth curricula, Junior Scientists labs, and enrichment competitions.',
    initials: 'PR',
    image: '/assets/team/priya.jpg',
  },
  {
    name: 'Gideon',
    role: 'School Programmes & Operation Lead',
    department: 'School Operations',
    bio: 'Coordinates on-ground deployments across partner international schools and manages educational facilitation teams.',
    initials: 'GD',
    image: '/assets/team/gideon.jpg',
  },
  {
    name: 'Rajeswary',
    role: 'Client Support Executive',
    department: 'Client Relations',
    bio: 'Ensures dedicated service quality, client satisfaction, and responsive communication across all 4 business entities.',
    initials: 'RW',
    image: '/assets/team/rajeswary.jpg',
  },
  {
    name: 'Samuel',
    role: 'Content & Operation Executive',
    department: 'Media & Operations',
    bio: 'Develops multimedia content, training collateral, and ensures structured operational delivery across programs.',
    initials: 'SM',
    image: '/assets/team/samuel.jpg',
  },
  {
    name: 'Sylvia Alina',
    role: 'HR & Admin Executive',
    department: 'People & Administration',
    bio: 'Nurtures organizational culture, internal talent development, and administrative governance for the Group.',
    initials: 'SA',
    image: '/assets/team/sylvia-alina.jpg',
  },
  {
    name: 'Jas Cheng',
    role: 'Marketing Strategist',
    department: 'Growth & Strategy',
    bio: 'Crafts data-driven digital campaigns, positioning strategies, and market outreach initiatives for client brands.',
    initials: 'JC',
    image: '/assets/team/jas-cheng.jpg',
  },
  {
    name: 'Angela Ong',
    role: 'Brand Creative & Intern Project Coordinator',
    department: 'Creative & Talent Development',
    bio: 'Coordinates brand creative execution, multimedia production, and ecosystem internship learning pathways.',
    initials: 'AO',
    image: '/assets/team/angela-ong.jpg',
  },
];

export const CLIENT_PARTNERS: ClientPartner[] = [
  // Schools & Education
  { name: 'Sunway International Schools', type: 'school', categoryLabel: 'International Education' },
  { name: 'Tenby Schools', type: 'school', categoryLabel: 'International Education' },
  { name: 'Nexus International School Malaysia', type: 'school', categoryLabel: 'International Education' },
  { name: 'Garden International School', type: 'school', categoryLabel: 'International Education' },
  { name: 'The International School of Kuala Lumpur (ISKL)', type: 'school', categoryLabel: 'International Education' },
  { name: 'Taylor’s International School', type: 'school', categoryLabel: 'International Education' },
  { name: 'Nobel International School', type: 'school', categoryLabel: 'International Education' },
  { name: 'Tanarata International Schools', type: 'school', categoryLabel: 'International Education' },
  { name: 'Melaka International School', type: 'school', categoryLabel: 'International Education' },
  { name: 'LFKL (Lycée Français de Kuala Lumpur)', type: 'school', categoryLabel: 'Bilingual International' },
  { name: 'HEVEA', type: 'school', categoryLabel: 'Early Childhood & Elementary' },
  { name: 'RGS', type: 'school', categoryLabel: 'Academic Institution' },
  { name: 'LSL', type: 'school', categoryLabel: 'Educational Foundation' },
  { name: 'DSKL (Deutsche Schule Kuala Lumpur)', type: 'school', categoryLabel: 'German International School' },

  // Corporate & Brand Partners
  { name: 'Uniqlo', type: 'corporate', categoryLabel: 'Global Retail & Apparel' },
  { name: 'Nando’s', type: 'corporate', categoryLabel: 'Multinational Hospitality' },
  { name: 'Johnson & Johnson', type: 'corporate', categoryLabel: 'Healthcare & Consumer Goods' },
  { name: 'Unilever', type: 'corporate', categoryLabel: 'Global FMCG' },
  { name: 'UCSI University', type: 'corporate', categoryLabel: 'Higher Education' },
  { name: 'REDtone', type: 'corporate', categoryLabel: 'Telecommunications & Digital Infra' },
  { name: 'Syngenta', type: 'corporate', categoryLabel: 'Agri-Tech & Sciences' },
  { name: 'Padini Holdings Bhd', type: 'corporate', categoryLabel: 'Public Listed Fashion Group' },
  { name: 'DKSH', type: 'corporate', categoryLabel: 'Market Expansion Services' },
  { name: 'Namaste India 1947', type: 'corporate', categoryLabel: 'F&B & Hospitality Enterprise' },
];
