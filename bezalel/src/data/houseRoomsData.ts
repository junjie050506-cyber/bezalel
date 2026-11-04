import { BUSINESS_ENTITIES, PARENT_COMPANY } from './ecosystemData';
import { BusinessEntity } from '../types';

export interface HouseRoom {
  id: string;
  roomNumber: string;
  roomName: string;
  subtitle: string;
  wing: string;
  level: string;
  dimensions: string;
  atmosphere: string;
  entity: BusinessEntity;
  hotspot: {
    x: number; // percentage (0-100)
    y: number; // percentage (0-100)
  };
  svgPolygon: string; // pixel coordinates for viewBox "0 0 1376 768" matching native image resolution
  conduitPath: string; // SVG path d attribute from hearth to this room
  synergyRole: string;
  synergyConnection: string;
  valueChainStep: string;
  architecturalMetaphor: string;
  interiorHighlights: string[];
  keyStats: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  accentGlow: string;
}

export const HOUSE_ROOMS: HouseRoom[] = [
  {
    id: 'olive-vine',
    roomNumber: '01',
    roomName: 'The Sanctuary & Solarium',
    subtitle: 'Inner Wellbeing & Relational Restoration',
    wing: 'West Wing Pavilion',
    level: 'Ground Floor Garden Level',
    dimensions: '1,450 sq ft · Panoramic Glass',
    atmosphere: 'Tranquil amber glow, sheer Belgian linen curtains, acoustic timber cladding, restorative garden vista',
    entity: BUSINESS_ENTITIES.find((b) => b.id === 'olive-vine')!,
    hotspot: {
      x: 16.8,
      y: 69.2,
    },
    svgPolygon: '112,462 350,462 350,602 112,602',
    conduitPath: 'M 688 546 C 510 546, 390 532, 231 532',
    synergyRole: 'INNER PERSON & EMOTIONAL RESILIENCE',
    synergyConnection: 'Transfers emotional wellbeing and psychological safety into HUR-ON leadership training.',
    valueChainStep: 'Phase 01 · Develop Inner Potential',
    architecturalMetaphor:
      'Like a serene sunlit solarium shielded from external turbulence, Olive & Vine provides a safe, peaceful harbor where individuals, couples, and families renew emotional clarity, heal generational wounds, and rebuild relational vitality.',
    interiorHighlights: [
      'Private psychological consultation suite with acoustic isolation',
      'Warm ambient fireside seating for couple and family therapy',
      'Panoramic garden outlook fostering calm reflective perspective',
      'Art-assisted and child-centered therapeutic play zones',
    ],
    keyStats: [
      { label: 'Therapeutic Hours', value: '3,200+', sublabel: 'Individual & Family Sessions' },
      { label: 'Families Supported', value: '450+', sublabel: 'Across Malaysia & SEA' },
      { label: 'Clinical Continuity', value: '96%', sublabel: 'Client Trust & Retention' },
    ],
    accentGlow: 'rgba(230, 185, 77, 0.18)',
  },
  {
    id: 'hur-on',
    roomNumber: '02',
    roomName: 'The Cathedral Mezzanine',
    subtitle: 'Leadership Atelier & High-Performance Masterclasses',
    wing: 'Central Cathedral Gable',
    level: 'Upper Mezzanine Loft',
    dimensions: '2,100 sq ft · Double-Height Vaulted Ceiling',
    atmosphere: 'Elevated vantage point, Scandinavian timber beams, strategic boardroom workshop table, luminous skylights',
    entity: BUSINESS_ENTITIES.find((b) => b.id === 'hur-on')!,
    hotspot: {
      x: 50.0,
      y: 39.5,
    },
    svgPolygon: '495,438 495,332 688,140 881,332 881,438',
    conduitPath: 'M 688 546 L 688 303',
    synergyRole: 'LEADERSHIP CRAFT & EXECUTIVE CAPABILITY',
    synergyConnection: 'Aligns executive behavior and team trust before Mustard Seed launches external brand growth.',
    valueChainStep: 'Phase 02 · Equip Capability & Teams',
    architecturalMetaphor:
      'Perched high in the open cathedral gable with expansive panoramic perspective, HUR-ON embodies the view from the summit—elevating executive vision, equipping leadership teams through accredited corporate masterclasses, and instilling corporate rhythm.',
    interiorHighlights: [
      'Executive roundtable designed for experiential leadership simulations',
      'HRD Corp certified interactive corporate workshop laboratory',
      'High-altitude vantage point symbolizing horizon vision and foresight',
      'State-of-the-art multimedia facilitation and team dynamics studio',
    ],
    keyStats: [
      { label: 'Executives Trained', value: '4,800+', sublabel: 'C-Suite & Mid-Senior Leads' },
      { label: 'Accreditation', value: 'HRD Corp', sublabel: 'Registered Corporate Provider' },
      { label: 'Experiential Rating', value: '98.4%', sublabel: 'Leadership Mastery Score' },
    ],
    accentGlow: 'rgba(230, 185, 77, 0.18)',
  },
  {
    id: 'bezalel',
    roomNumber: '00',
    roomName: 'The Grand Hearth & Great Hall',
    subtitle: 'Group Stewardship & Ecosystem Foundation',
    wing: 'Central Great Hall',
    level: 'Ground Level Pavilion',
    dimensions: '2,800 sq ft · High-Ceiling Hearth Pavilion',
    atmosphere: 'Centering warm natural stone fireplace, communal solid oak dining table, fireside library of values, soft wool rugs',
    entity: PARENT_COMPANY,
    hotspot: {
      x: 50.0,
      y: 71.1,
    },
    svgPolygon: '495,462 881,462 881,622 495,622',
    conduitPath: 'M 688 546 Z',
    synergyRole: 'ECOSYSTEM ANCHOR & GROUP STEWARDSHIP',
    synergyConnection: 'Supplies enduring biblical stewardship values, strategic capital, and synergy across all operating wings.',
    valueChainStep: 'Foundation · Stewardship & Multiplication',
    architecturalMetaphor:
      'The central open hearth around which every wing of the house converges. Bezalel Inc provides the enduring ethos, biblical stewardship principles, strategic capital, and communal warmth that unite all operating enterprises under one roof.',
    interiorHighlights: [
      'Central suspended open fireplace representing enduring purpose and warmth',
      'Ecosystem assembly hall connecting all subsidiary leaders',
      'Exodus 31:1–6 archival library dedicated to craftsmanship and wisdom',
      'Unbroken panoramic threshold blending interior craft with forest roots',
    ],
    keyStats: [
      { label: 'Operating History', value: '18 Yrs', sublabel: 'Stewardship Since 2008' },
      { label: 'Turnkey Portfolio', value: 'RM1.7M+', sublabel: 'Early Conference Scale' },
      { label: 'Specialised Entities', value: '5 Rooms', sublabel: 'One Enduring Mandate' },
    ],
    accentGlow: 'rgba(230, 185, 77, 0.22)',
  },
  {
    id: 'mustard-seed',
    roomNumber: '03',
    roomName: 'The Creative Glass Studio',
    subtitle: 'Brand Strategy, Advertising & Market Growth',
    wing: 'East Wing Glasshouse Studio',
    level: 'Ground Level Studio',
    dimensions: '1,680 sq ft · Floor-to-Ceiling Corner Glazing',
    atmosphere: 'Vertical cedar slatting, dynamic creative workstations, brand strategy pinboards, warm spotlighting, terrace access',
    entity: BUSINESS_ENTITIES.find((b) => b.id === 'mustard-seed')!,
    hotspot: {
      x: 84.8,
      y: 70.0,
    },
    svgPolygon: '1066,462 1265,462 1265,614 1066,614',
    conduitPath: 'M 688 546 C 860 578, 1020 578, 1167 538',
    synergyRole: 'BRAND POSITIONING & COMMERCIAL EXPANSION',
    synergyConnection: 'Collaborates with Phroneo to ensure intellectual property and trademarks are secured before public campaigns.',
    valueChainStep: 'Phase 03 · Multiply Market Opportunity',
    architecturalMetaphor:
      'A light-filled incubator studio surrounded by glass and cedar, where tiny seeds of authentic purpose germinate into commanding market positions, unforgettable advertising campaigns, and flourishing commercial brands.',
    interiorHighlights: [
      'Visual storytelling workshop wall & brand design laboratory',
      'Digital campaign broadcast & creative production suite',
      'Direct outdoor terrace connection representing organic market reach',
      'Acoustically tuned creative sprint rooms for rapid strategy ideation',
    ],
    keyStats: [
      { label: 'Brands Seeded', value: '120+', sublabel: 'Campaigns & Identities Launched' },
      { label: 'Creative ROI', value: '+340%', sublabel: 'Average Client Pipeline Lift' },
      { label: 'Production Scale', value: 'Full-Cycle', sublabel: 'Strategy, Creative & Ads' },
    ],
    accentGlow: 'rgba(230, 185, 77, 0.18)',
  },
  {
    id: 'phroneo',
    roomNumber: '04',
    roomName: 'The Bedrock Boardroom Suite',
    subtitle: 'Corporate Governance & Statutory Architecture',
    wing: 'Connecting Glass Suite & Terrace',
    level: 'Ground Floor Pavilion',
    dimensions: '1,520 sq ft · Biophilic Glass & Sconce Gallery',
    atmosphere: 'Double glass entrance, warm vertical architectural sconces, potted terrace botanicals, statutory archives',
    entity: BUSINESS_ENTITIES.find((b) => b.id === 'phroneo')!,
    hotspot: {
      x: 70.8,
      y: 69.2,
    },
    svgPolygon: '932,468 1015,468 1015,595 932,595',
    conduitPath: 'M 688 546 C 790 546, 880 535, 974 532',
    synergyRole: 'CORPORATE GOVERNANCE & STATUTORY CONTINUITY',
    synergyConnection: 'Provides the legal and statutory foundation that allows all operating subsidiaries to scale safely.',
    valueChainStep: 'Phase 04 · Establish Enduring Enterprise',
    architecturalMetaphor:
      'The connecting architectural suite linking the central hearth to the creative wing. Phroneo BoardSuite supplies the immutable statutory governance, compliance, and corporate structure that ensure enterprises endure through generations.',
    interiorHighlights: [
      'Executive governance boardroom with high-security board portal integration',
      'Statutory compliance & company secretarial registry office',
      'Direct foundational stone masonry symbolizing structural permanence',
      'Founder equity and cap-table structuring advisory sanctum',
    ],
    keyStats: [
      { label: 'Entities Governed', value: '180+', sublabel: 'Companies & Statutory Boards' },
      { label: 'Compliance Rate', value: '100%', sublabel: 'SSM & Statutory Audit Record' },
      { label: 'Endurance Metric', value: '18 Yrs', sublabel: 'Zero Governance Failures' },
    ],
    accentGlow: 'rgba(230, 185, 77, 0.18)',
  },
];


