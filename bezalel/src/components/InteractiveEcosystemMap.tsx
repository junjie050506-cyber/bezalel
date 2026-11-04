import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import {
  BUSINESS_ENTITIES,
  PARENT_COMPANY,
} from '../data/ecosystemData';
import {
  Play,
  Pause,
  RotateCcw,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Building2,
  Compass,
  Move,
} from 'lucide-react';

export interface InteractiveEcosystemMapProps {
  onOpenInquiry?: (businessId?: string) => void;
  className?: string;
  initialSelectedId?: string;
}

interface EcosystemD3Node extends d3.SimulationNodeDatum {
  id: string;
  number: string;
  name: string;
  shortName: string;
  category: string;
  tagline: string;
  summary: string;
  logo: string;
  roleLabel: string;
  wingLabel: string;
  sphere: 'hub' | 'human' | 'enterprise';
  accentColor: string;
  baseAngleDeg: number;
  orbitRadius: number;
  nodeRadius: number;
  synergies: string[];
  synergyNote: string;
  metrics: { label: string; value: string }[];
}

interface EcosystemD3Link extends d3.SimulationLinkDatum<EcosystemD3Node> {
  id: string;
  source: EcosystemD3Node | string;
  target: EcosystemD3Node | string;
  type: 'hub-spoke' | 'synergy';
  label: string;
}

const INITIAL_NODES: EcosystemD3Node[] = [
  {
    id: 'bezalel',
    number: '00',
    name: PARENT_COMPANY.name,
    shortName: 'BEZALEL INC',
    category: PARENT_COMPANY.category,
    tagline: PARENT_COMPANY.tagline,
    summary: PARENT_COMPANY.summary,
    logo: '/assets/bezalel-logo.png',
    roleLabel: 'Central Holding Hub',
    wingLabel: 'The Grand Hearth · Center Anchor',
    sphere: 'hub',
    accentColor: '#E6B94D',
    baseAngleDeg: 0,
    orbitRadius: 0,
    nodeRadius: 56,
    synergies: ['olive-vine', 'hur-on', 'mustard-seed', 'phroneo'],
    synergyNote:
      'Supplies shared stewardship, strategic capital, and cross-venture governance uniting all four operating companies.',
    metrics: [
      { label: 'Established', value: '2008' },
      { label: 'Operating Ventures', value: '04' },
      { label: 'Institutional Partners', value: '24' },
    ],
  },
  {
    id: 'olive-vine',
    number: '01',
    name: 'Olive & Vine Psychological Solutions',
    shortName: 'Olive & Vine',
    category: 'Psychological & Relational Care',
    tagline: 'Inner wellbeing shapes how people live and lead.',
    summary:
      'Supports children, young people, adults, parents, educators, and executive families through confidential psychological and relational care.',
    logo: '/assets/ventures/olive-vine-logo.png',
    roleLabel: 'Inner Wellbeing',
    wingLabel: 'West Sanctuary Wing',
    sphere: 'human',
    accentColor: '#A3B86C',
    baseAngleDeg: 225, // Top-Left
    orbitRadius: 215,
    nodeRadius: 42,
    synergies: ['hur-on', 'mustard-seed'],
    synergyNote:
      'Builds emotional resilience and relational trust that feeds directly into HUR-ON executive leadership alignment.',
    metrics: [
      { label: 'School Campuses', value: '14' },
      { label: 'Clinical Sessions', value: '3,200+' },
      { label: 'Continuity Rate', value: '96%' },
    ],
  },
  {
    id: 'hur-on',
    number: '02',
    name: 'HUR-ON Training & Consultancy',
    shortName: 'HUR-ON',
    category: 'Corporate Training & Consultancy',
    tagline: 'Learning should change behaviour, relationships and performance.',
    summary:
      'Equips executives, teams, and corporate enterprises through HRD Corp-accredited masterclasses, leadership labs, and behavioural simulations.',
    logo: '/assets/ventures/hur-on-logo.png',
    roleLabel: 'Leadership Craft',
    wingLabel: 'Upper Cathedral Loft',
    sphere: 'human',
    accentColor: '#8C9E5E',
    baseAngleDeg: 315, // Top-Right
    orbitRadius: 215,
    nodeRadius: 42,
    synergies: ['olive-vine', 'mustard-seed', 'phroneo'],
    synergyNote:
      'Transforms inner potential into executive capability and high-trust organizational culture prior to market scaling.',
    metrics: [
      { label: 'Leaders Trained', value: '4,800+' },
      { label: 'Accreditation', value: 'HRD Corp' },
      { label: 'Mastery Score', value: '98.4%' },
    ],
  },
  {
    id: 'mustard-seed',
    number: '03',
    name: 'Mustard Seed & Co',
    shortName: 'Mustard Seed & Co',
    category: 'Creative Strategy & Brand Growth',
    tagline: 'Clarify the position. Communicate value. Pursue growth.',
    summary:
      'Accelerates emerging and established enterprises through brand positioning, narrative architecture, commercial campaigns, and digital systems.',
    logo: '/assets/ventures/mustard-seed-logo.png',
    roleLabel: 'Brand & Growth',
    wingLabel: 'East Glasshouse Studio',
    sphere: 'enterprise',
    accentColor: '#E6B94D',
    baseAngleDeg: 45, // Bottom-Right
    orbitRadius: 215,
    nodeRadius: 42,
    synergies: ['hur-on', 'phroneo'],
    synergyNote:
      'Translates aligned organizational capability into commanding market positioning and commercial growth.',
    metrics: [
      { label: 'Brands Seeded', value: '120+' },
      { label: 'Project Scale', value: 'RM1.7M+' },
      { label: 'Pipeline Lift', value: '+340%' },
    ],
  },
  {
    id: 'phroneo',
    number: '04',
    name: 'Phroneo BoardSuite',
    shortName: 'Phroneo BoardSuite',
    category: 'Corporate Governance & Secretarial',
    tagline: 'Wise structure helps enterprise endure.',
    summary:
      'Anchors growing companies with Companies Act 2016 statutory compliance, corporate secretarial stewardship, ESOP structuring, and IP defense.',
    logo: '/assets/ventures/phroneo-logo.png',
    roleLabel: 'Board Governance',
    wingLabel: 'Bedrock Governance Suite',
    sphere: 'enterprise',
    accentColor: '#D4A017',
    baseAngleDeg: 135, // Bottom-Left
    orbitRadius: 215,
    nodeRadius: 42,
    synergies: ['mustard-seed', 'hur-on'],
    synergyNote:
      'Protects intellectual property, board compliance, and statutory continuity so every enterprise endures across generations.',
    metrics: [
      { label: 'Entities Governed', value: '180+' },
      { label: 'SSM Compliance', value: '100%' },
      { label: 'Track Record', value: '18 Yrs' },
    ],
  },
];

const INITIAL_LINKS: EcosystemD3Link[] = [
  // Primary Hub-to-Spoke Arterial Connections
  {
    id: 'hub-olive-vine',
    source: 'bezalel',
    target: 'olive-vine',
    type: 'hub-spoke',
    label: 'Stewardship & Care Mandate',
  },
  {
    id: 'hub-hur-on',
    source: 'bezalel',
    target: 'hur-on',
    type: 'hub-spoke',
    label: 'Capability & Leadership Standard',
  },
  {
    id: 'hub-mustard-seed',
    source: 'bezalel',
    target: 'mustard-seed',
    type: 'hub-spoke',
    label: 'Commercial Multiplication',
  },
  {
    id: 'hub-phroneo',
    source: 'bezalel',
    target: 'phroneo',
    type: 'hub-spoke',
    label: 'Fiduciary & Statutory Anchor',
  },
  // Cross-Venture Orbital Synergy Ring Connections
  {
    id: 'syn-olive-huron',
    source: 'olive-vine',
    target: 'hur-on',
    type: 'synergy',
    label: 'Inner Wellbeing → Leadership',
  },
  {
    id: 'syn-huron-mustard',
    source: 'hur-on',
    target: 'mustard-seed',
    type: 'synergy',
    label: 'Team Alignment → Brand Growth',
  },
  {
    id: 'syn-mustard-phroneo',
    source: 'mustard-seed',
    target: 'phroneo',
    type: 'synergy',
    label: 'Brand IP → Statutory Protection',
  },
  {
    id: 'syn-phroneo-olive',
    source: 'phroneo',
    target: 'olive-vine',
    type: 'synergy',
    label: 'Enduring Structure → Safe Harbor',
  },
];

export const InteractiveEcosystemMap: React.FC<InteractiveEcosystemMapProps> = ({
  onOpenInquiry,
  className = '',
  initialSelectedId = 'bezalel',
}) => {
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [selectedId, setSelectedId] = useState<string>(initialSelectedId);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isOrbiting, setIsOrbiting] = useState<boolean>(true);
  const [filterSphere, setFilterSphere] = useState<'all' | 'human' | 'enterprise'>('all');

  // Refs used inside D3 force & timer loop to avoid stale closures
  const selectedIdRef = useRef<string>(selectedId);
  const hoveredIdRef = useRef<string | null>(hoveredId);
  const isOrbitingRef = useRef<boolean>(isOrbiting);
  const filterSphereRef = useRef<'all' | 'human' | 'enterprise'>(filterSphere);
  const orbitAngleRef = useRef<number>(0);

  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);

  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  useEffect(() => {
    isOrbitingRef.current = isOrbiting;
  }, [isOrbiting]);

  useEffect(() => {
    filterSphereRef.current = filterSphere;
  }, [filterSphere]);

  const activeNodeData = useMemo(
    () =>
      INITIAL_NODES.find((n) => n.id === (hoveredId || selectedId)) ||
      INITIAL_NODES[0],
    [selectedId, hoveredId]
  );

  const activeEntity = useMemo(() => {
    if (activeNodeData.id === 'bezalel') return PARENT_COMPANY;
    return (
      BUSINESS_ENTITIES.find((b) => b.id === activeNodeData.id) ||
      PARENT_COMPANY
    );
  }, [activeNodeData]);

  // Initialize and run D3 Force-Directed Orbital Graph
  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const width = 760;
    const height = 680;
    const centerX = width / 2;
    const centerY = height / 2;

    // Deep clone nodes and links for D3 mutation
    const nodes: EcosystemD3Node[] = INITIAL_NODES.map((n) => {
      if (n.id === 'bezalel') {
        return { ...n, x: centerX, y: centerY, fx: centerX, fy: centerY };
      }
      const rad = (n.baseAngleDeg * Math.PI) / 180;
      return {
        ...n,
        x: centerX + Math.cos(rad) * n.orbitRadius,
        y: centerY + Math.sin(rad) * n.orbitRadius,
      };
    });

    const links: EcosystemD3Link[] = INITIAL_LINKS.map((l) => ({ ...l }));

    const svg = d3.select(svgElement);
    svg.selectAll('*').remove();

    // 1. SVG DEFS: Gradients, Glow Filters & Arrow Markers
    const defs = svg.append('defs');

    const glowFilter = defs
      .append('filter')
      .attr('id', 'd3-gold-glow')
      .attr('x', '-35%')
      .attr('y', '-35%')
      .attr('width', '170%')
      .attr('height', '170%');
    glowFilter
      .append('feGaussianBlur')
      .attr('stdDeviation', '5')
      .attr('result', 'blur');
    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'blur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const hubAura = defs
      .append('radialGradient')
      .attr('id', 'd3-hub-aura')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');
    hubAura
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#F5CE68')
      .attr('stop-opacity', 0.36);
    hubAura
      .append('stop')
      .attr('offset', '55%')
      .attr('stop-color', '#E6B94D')
      .attr('stop-opacity', 0.12);
    hubAura
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#0D120B')
      .attr('stop-opacity', 0);

    // Architectural House Silhouette Background Layer (Subtle Blueprint Frame)
    const bgLayer = svg.append('g').attr('class', 'blueprint-layer');

    // Subtle Architectural Gable House Roofline enclosing the orbital ecosystem
    bgLayer
      .append('path')
      .attr(
        'd',
        `M ${centerX} 48 L ${centerX + 305} 230 L ${centerX + 305} 605 L ${centerX - 305} 605 L ${centerX - 305} 230 Z`
      )
      .attr('fill', 'rgba(26, 36, 18, 0.18)')
      .attr('stroke', 'rgba(230, 185, 77, 0.16)')
      .attr('stroke-width', 1.25)
      .attr('stroke-dasharray', '6 6');

    // Architectural Blueprint Label at Roof Peak
    bgLayer
      .append('text')
      .attr('x', centerX)
      .attr('y', 36)
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgba(230, 185, 77, 0.55)')
      .attr('font-size', '9.5px')
      .attr('font-family', 'Plus Jakarta Sans, monospace')
      .attr('letter-spacing', '0.2em')
      .text('ARCHITECTURAL ECOSYSTEM ROOF · ONE HOUSE');

    // Concentric D3 Orbital Rings
    const orbitRadii = [115, 215, 290];
    bgLayer
      .selectAll('circle.orbit-ring')
      .data(orbitRadii)
      .join('circle')
      .attr('class', 'orbit-ring')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', (d) => d)
      .attr('fill', 'none')
      .attr('stroke', (_, i) =>
        i === 1 ? 'rgba(230, 185, 77, 0.35)' : 'rgba(163, 184, 108, 0.14)'
      )
      .attr('stroke-width', (_, i) => (i === 1 ? 1.5 : 1))
      .attr('stroke-dasharray', (_, i) => (i === 1 ? '8 6' : '3 7'));

    // Central Hub Ambient Aura
    bgLayer
      .append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', 135)
      .attr('fill', 'url(#d3-hub-aura)');

    // 2. LINKS LAYER (Hub Spokes + Cross-Venture Synergy Arcs)
    const linkLayer = svg.append('g').attr('class', 'links-layer');

    const linkPaths = linkLayer
      .selectAll<SVGPathElement, EcosystemD3Link>('path.d3-link')
      .data(links, (d) => d.id)
      .join('path')
      .attr('class', 'd3-link')
      .attr('fill', 'none')
      .attr('stroke-linecap', 'round');

    // Animated Bi-Directional Flow Particles along Hub-Spoke Links
    const hubLinks = links.filter((l) => l.type === 'hub-spoke');
    const particleGroup = svg.append('g').attr('class', 'particles-layer');

    const outboundParticles = particleGroup
      .selectAll<SVGCircleElement, EcosystemD3Link>('circle.particle-out')
      .data(hubLinks, (d) => d.id)
      .join('circle')
      .attr('class', 'particle-out')
      .attr('r', 3.5)
      .attr('fill', '#FFF8DC')
      .attr('filter', 'url(#d3-gold-glow)')
      .style('pointer-events', 'none');

    const inboundParticles = particleGroup
      .selectAll<SVGCircleElement, EcosystemD3Link>('circle.particle-in')
      .data(hubLinks, (d) => d.id)
      .join('circle')
      .attr('class', 'particle-in')
      .attr('r', 2.8)
      .attr('fill', '#A3B86C')
      .style('pointer-events', 'none');

    // 3. NODES LAYER
    const nodeLayer = svg.append('g').attr('class', 'nodes-layer');

    const nodeGroups = nodeLayer
      .selectAll<SVGGElement, EcosystemD3Node>('g.d3-node')
      .data(nodes, (d) => d.id)
      .join('g')
      .attr('class', 'd3-node')
      .style('cursor', 'grab');

    // Outer Halo Pulse Circle on each node
    nodeGroups
      .append('circle')
      .attr('class', 'node-halo')
      .attr('r', (d) => d.nodeRadius + 9)
      .attr('fill', 'none')
      .attr('stroke', (d) => d.accentColor)
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', (d) => (d.id === 'bezalel' ? '4 4' : 'none'))
      .attr('opacity', 0.45);

    // Main Node Circle Body
    nodeGroups
      .append('circle')
      .attr('class', 'node-core')
      .attr('r', (d) => d.nodeRadius)
      .attr('fill', (d) => (d.id === 'bezalel' ? '#162011' : '#10170C'))
      .attr('stroke', (d) => d.accentColor)
      .attr('stroke-width', (d) => (d.id === 'bezalel' ? 3 : 2));

    // Inner Cream Medallion Plate for crisp brand logo legibility
    nodeGroups
      .append('circle')
      .attr('class', 'node-plate')
      .attr('r', (d) => (d.id === 'bezalel' ? 30 : 23))
      .attr('cy', (d) => (d.id === 'bezalel' ? -8 : -6))
      .attr('fill', '#FAF8F4')
      .attr('stroke', 'rgba(230, 185, 77, 0.45)')
      .attr('stroke-width', 1);

    // Venture / Parent Logo inside the medallion plate
    nodeGroups
      .append('image')
      .attr('href', (d) => d.logo)
      .attr('x', (d) => (d.id === 'bezalel' ? -18 : -16))
      .attr('y', (d) => (d.id === 'bezalel' ? -26 : -22))
      .attr('width', (d) => (d.id === 'bezalel' ? 36 : 32))
      .attr('height', (d) => (d.id === 'bezalel' ? 36 : 32))
      .attr('preserveAspectRatio', 'xMidYMid contain')
      .style('pointer-events', 'none');

    // Number Pill Badge at Top-Right of Node
    const badgeGroup = nodeGroups
      .append('g')
      .attr('transform', (d) => {
        const offset = d.nodeRadius * 0.72;
        return `translate(${offset}, ${-offset})`;
      });

    badgeGroup
      .append('circle')
      .attr('r', 11)
      .attr('fill', (d) => (d.id === 'bezalel' ? '#E6B94D' : '#1E2918'))
      .attr('stroke', '#FAF8F4')
      .attr('stroke-width', 1.5);

    badgeGroup
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', (d) => (d.id === 'bezalel' ? '#141812' : '#F5CE68'))
      .attr('font-size', '9px')
      .attr('font-family', 'Plus Jakarta Sans, monospace')
      .attr('font-weight', '700')
      .text((d) => d.number);

    // Role / Short Title inside bottom arc of node
    nodeGroups
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('y', (d) => (d.id === 'bezalel' ? 36 : 28))
      .attr('fill', '#FAF8F4')
      .attr('font-size', (d) => (d.id === 'bezalel' ? '9.5px' : '8.5px'))
      .attr('font-family', 'Plus Jakarta Sans, sans-serif')
      .attr('font-weight', '700')
      .attr('letter-spacing', '0.06em')
      .text((d) => (d.id === 'bezalel' ? 'CENTRAL HUB' : d.roleLabel.toUpperCase()));

    // Floating Architectural Label Plaque below each Node
    const labelGroup = nodeGroups
      .append('g')
      .attr('transform', (d) => `translate(0, ${d.nodeRadius + 24})`);

    labelGroup
      .append('rect')
      .attr('class', 'label-bg')
      .attr('x', (d) => (d.id === 'bezalel' ? -78 : -74))
      .attr('y', -13)
      .attr('width', (d) => (d.id === 'bezalel' ? 156 : 148))
      .attr('height', 26)
      .attr('rx', 8)
      .attr('fill', 'rgba(13, 18, 11, 0.92)')
      .attr('stroke', 'rgba(230, 185, 77, 0.4)')
      .attr('stroke-width', 1);

    labelGroup
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.32em')
      .attr('fill', '#FAF8F4')
      .attr('font-size', '11px')
      .attr('font-family', 'Fraunces, Georgia, serif')
      .attr('font-weight', '600')
      .text((d) => d.shortName);

    // 4. D3 FORCE SIMULATION
    const simulation = d3
      .forceSimulation<EcosystemD3Node>(nodes)
      .force(
        'link',
        d3
          .forceLink<EcosystemD3Node, EcosystemD3Link>(links)
          .id((d) => d.id)
          .distance((l) => (l.type === 'hub-spoke' ? 215 : 304))
          .strength((l) => (l.type === 'hub-spoke' ? 0.35 : 0.08))
      )
      .force(
        ' radialX',
        d3
          .forceX<EcosystemD3Node>((d) => {
            if (d.id === 'bezalel') return centerX;
            const rad =
              ((d.baseAngleDeg + orbitAngleRef.current) * Math.PI) / 180;
            return centerX + Math.cos(rad) * d.orbitRadius;
          })
          .strength(0.65)
      )
      .force(
        'radialY',
        d3
          .forceY<EcosystemD3Node>((d) => {
            if (d.id === 'bezalel') return centerY;
            const rad =
              ((d.baseAngleDeg + orbitAngleRef.current) * Math.PI) / 180;
            return centerY + Math.sin(rad) * d.orbitRadius;
          })
          .strength(0.65)
      )
      .force(
        'collide',
        d3.forceCollide<EcosystemD3Node>((d) => d.nodeRadius + 28).strength(0.9)
      )
      .alphaDecay(0.02);

    // 5. INTERACTIVE D3 DRAG & CLICK EVENTS
    const dragBehavior = d3
      .drag<SVGGElement, EcosystemD3Node>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.35).restart();
        if (d.id !== 'bezalel') {
          d.fx = d.x;
          d.fy = d.y;
        }
      })
      .on('drag', (event, d) => {
        if (d.id !== 'bezalel') {
          d.fx = Math.max(85, Math.min(width - 85, event.x));
          d.fy = Math.max(75, Math.min(height - 75, event.y));
        }
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.08);
        if (d.id !== 'bezalel') {
          // Update the node's baseAngleDeg to match where the user dropped it, then release pin
          const dx = (d.x ?? centerX) - centerX;
          const dy = (d.y ?? centerY) - centerY;
          const droppedAngle =
            ((Math.atan2(dy, dx) * 180) / Math.PI -
              orbitAngleRef.current +
              360) %
            360;
          d.baseAngleDeg = droppedAngle;
          d.fx = null;
          d.fy = null;
        }
      });

    nodeGroups
      .call(dragBehavior)
      .on('mouseenter', (_, d) => {
        hoveredIdRef.current = d.id;
        setHoveredId(d.id);
      })
      .on('mouseleave', () => {
        hoveredIdRef.current = null;
        setHoveredId(null);
      })
      .on('click', (event, d) => {
        event.stopPropagation();
        selectedIdRef.current = d.id;
        setSelectedId(d.id);
      });

    // 6. SIMULATION TICK & CONTINUOUS ORBITAL PHASE LOOP
    let particlePhase = 0;

    const updateVisualStyles = () => {
      const currentFocus = hoveredIdRef.current || selectedIdRef.current;
      const isHubActive = currentFocus === 'bezalel';
      const currentSphere = filterSphereRef.current;

      // Style Links
      linkPaths
        .attr('d', (l) => {
          const s = l.source as EcosystemD3Node;
          const t = l.target as EcosystemD3Node;
          const sx = s.x ?? centerX;
          const sy = s.y ?? centerY;
          const tx = t.x ?? centerX;
          const ty = t.y ?? centerY;

          if (l.type === 'hub-spoke') {
            return `M ${sx} ${sy} L ${tx} ${ty}`;
          }
          // Subtle outward curve for synergy ring links
          const dx = tx - sx;
          const dy = ty - sy;
          const dr = Math.sqrt(dx * dx + dy * dy) * 1.15;
          return `M ${sx} ${sy} A ${dr} ${dr} 0 0 1 ${tx} ${ty}`;
        })
        .attr('stroke', (l) => {
          const s = l.source as EcosystemD3Node;
          const t = l.target as EcosystemD3Node;
          const isConnected =
            isHubActive || s.id === currentFocus || t.id === currentFocus;
          if (l.type === 'hub-spoke') {
            return isConnected ? '#F5CE68' : 'rgba(230, 185, 77, 0.35)';
          }
          return isConnected ? 'rgba(163, 184, 108, 0.65)' : 'rgba(255, 255, 255, 0.12)';
        })
        .attr('stroke-width', (l) => {
          const s = l.source as EcosystemD3Node;
          const t = l.target as EcosystemD3Node;
          const isConnected =
            isHubActive || s.id === currentFocus || t.id === currentFocus;
          if (l.type === 'hub-spoke') {
            return isConnected ? 2.6 : 1.4;
          }
          return isConnected ? 1.6 : 1;
        })
        .attr('stroke-dasharray', (l) =>
          l.type === 'hub-spoke' ? 'none' : '5 6'
        )
        .attr('opacity', (l) => {
          const s = l.source as EcosystemD3Node;
          const t = l.target as EcosystemD3Node;
          if (
            currentSphere !== 'all' &&
            ((s.sphere !== 'hub' && s.sphere !== currentSphere) ||
              (t.sphere !== 'hub' && t.sphere !== currentSphere))
          ) {
            return 0.1;
          }
          return 1;
        });

      // Position bi-directional energy particles along hub-spoke links
      outboundParticles
        .attr('cx', (l, idx) => {
          const s = l.source as EcosystemD3Node;
          const t = l.target as EcosystemD3Node;
          const progress = (particlePhase + idx * 0.25) % 1;
          return (s.x ?? centerX) + ((t.x ?? centerX) - (s.x ?? centerX)) * progress;
        })
        .attr('cy', (l, idx) => {
          const s = l.source as EcosystemD3Node;
          const t = l.target as EcosystemD3Node;
          const progress = (particlePhase + idx * 0.25) % 1;
          return (s.y ?? centerY) + ((t.y ?? centerY) - (s.y ?? centerY)) * progress;
        })
        .attr('opacity', (l) => {
          const t = l.target as EcosystemD3Node;
          return isHubActive || t.id === currentFocus ? 0.95 : 0.35;
        });

      inboundParticles
        .attr('cx', (l, idx) => {
          const s = l.source as EcosystemD3Node;
          const t = l.target as EcosystemD3Node;
          const progress = 1 - ((particlePhase + idx * 0.25 + 0.5) % 1);
          return (s.x ?? centerX) + ((t.x ?? centerX) - (s.x ?? centerX)) * progress;
        })
        .attr('cy', (l, idx) => {
          const s = l.source as EcosystemD3Node;
          const t = l.target as EcosystemD3Node;
          const progress = 1 - ((particlePhase + idx * 0.25 + 0.5) % 1);
          return (s.y ?? centerY) + ((t.y ?? centerY) - (s.y ?? centerY)) * progress;
        })
        .attr('opacity', (l) => {
          const t = l.target as EcosystemD3Node;
          return isHubActive || t.id === currentFocus ? 0.85 : 0.25;
        });

      // Position and style Node Groups
      nodeGroups
        .attr('transform', (d) => `translate(${d.x ?? centerX}, ${d.y ?? centerY})`)
        .attr('opacity', (d) => {
          if (
            currentSphere !== 'all' &&
            d.sphere !== 'hub' &&
            d.sphere !== currentSphere
          ) {
            return 0.25;
          }
          return 1;
        });

      nodeGroups
        .select('circle.node-core')
        .attr('stroke', (d) =>
          d.id === currentFocus
            ? '#F5CE68'
            : isHubActive
            ? '#E6B94D'
            : d.accentColor
        )
        .attr('stroke-width', (d) =>
          d.id === currentFocus ? 3.5 : d.id === 'bezalel' ? 3 : 2
        );

      nodeGroups
        .select('circle.node-halo')
        .attr('opacity', (d) =>
          d.id === currentFocus ? 0.95 : isHubActive ? 0.55 : 0.25
        )
        .attr('r', (d) =>
          d.id === currentFocus ? d.nodeRadius + 13 : d.nodeRadius + 8
        );

      nodeGroups
        .select('rect.label-bg')
        .attr('stroke', (d) =>
          d.id === currentFocus
            ? '#F5CE68'
            : isHubActive
            ? 'rgba(230, 185, 77, 0.55)'
            : 'rgba(255, 255, 255, 0.18)'
        )
        .attr('fill', (d) =>
          d.id === currentFocus
            ? 'rgba(28, 39, 20, 0.96)'
            : 'rgba(13, 18, 11, 0.9)'
        );
    };

    simulation.on('tick', updateVisualStyles);

    const timer = d3.timer(() => {
      particlePhase = (particlePhase + 0.0045) % 1;

      if (isOrbitingRef.current && !hoveredIdRef.current) {
        orbitAngleRef.current = (orbitAngleRef.current + 0.14) % 360;

        // Re-evaluate radial targets smoothly as orbit angle advances
        simulation
          .force(
            'radialX',
            d3
              .forceX<EcosystemD3Node>((d) => {
                if (d.id === 'bezalel') return centerX;
                const rad =
                  ((d.baseAngleDeg + orbitAngleRef.current) * Math.PI) / 180;
                return centerX + Math.cos(rad) * d.orbitRadius;
              })
              .strength(0.65)
          )
          .force(
            'radialY',
            d3
              .forceY<EcosystemD3Node>((d) => {
                if (d.id === 'bezalel') return centerY;
                const rad =
                  ((d.baseAngleDeg + orbitAngleRef.current) * Math.PI) / 180;
                return centerY + Math.sin(rad) * d.orbitRadius;
              })
              .strength(0.65)
          );
        simulation.alpha(0.12).restart();
      } else {
        updateVisualStyles();
      }
    });

    return () => {
      timer.stop();
      simulation.stop();
    };
  }, []);

  const handleResetPositions = () => {
    orbitAngleRef.current = 0;
    setSelectedId('bezalel');
    setFilterSphere('all');
    setIsOrbiting(true);
  };

  return (
    <div
      className={`relative w-full rounded-3xl bg-[#0D120B] border border-[#E6B94D]/30 text-[#FAF8F4] overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.65)] select-none ${className}`}
    >
      {/* Top Control & Filter Bar */}
      <div className="relative z-20 px-5 sm:px-7 py-4 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#11180E]/90 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E6B94D]/15 border border-[#E6B94D]/40 flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 text-[#E6B94D]" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-[#E6B94D] uppercase font-bold">
              D3.JS INTERACTIVE FORCE-ORBITAL GRAPH
            </div>
            <h3 className="font-display text-lg sm:text-xl font-medium text-[#FAF8F4] tracking-tight">
              Bezalel Inc Central Hub &amp; Connected Operating Ventures
            </h3>
          </div>
        </div>

        {/* Interactive Sphere Filter & Orbit Physics Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Node Selector Pills */}
          <div className="flex items-center bg-white/[0.06] p-1 rounded-xl border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => {
                setFilterSphere('all');
                setSelectedId('bezalel');
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                filterSphere === 'all'
                  ? 'bg-[#E6B94D] text-[#141812] font-semibold shadow-xs'
                  : 'text-[#EAE4D7]/75 hover:text-white'
              }`}
            >
              All Connected (Hub + 4)
            </button>
            <button
              type="button"
              onClick={() => setFilterSphere('human')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                filterSphere === 'human'
                  ? 'bg-[#E6B94D] text-[#141812] font-semibold shadow-xs'
                  : 'text-[#EAE4D7]/75 hover:text-white'
              }`}
            >
              Human Core (01–02)
            </button>
            <button
              type="button"
              onClick={() => setFilterSphere('enterprise')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                filterSphere === 'enterprise'
                  ? 'bg-[#E6B94D] text-[#141812] font-semibold shadow-xs'
                  : 'text-[#EAE4D7]/75 hover:text-white'
              }`}
            >
              Enterprise Core (03–04)
            </button>
          </div>

          {/* Orbit Play/Pause & Reset */}
          <div className="flex items-center gap-1 bg-white/[0.06] p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setIsOrbiting((prev) => !prev)}
              className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-xs font-mono text-[#FAF8F4] flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              title={isOrbiting ? 'Pause Orbital Motion' : 'Resume Orbital Motion'}
            >
              {isOrbiting ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#E6B94D]" />
                  <span>Orbiting</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#A3B86C]" />
                  <span>Paused</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleResetPositions}
              aria-label="Reset ecosystem map"
              className="p-1.5 rounded-lg hover:bg-white/10 text-[#FAF8F4]/80 hover:text-white transition-colors cursor-pointer"
              title="Reset Center Hub & Node Positions"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Left D3 Interactive Graph (7 Cols) + Right Connected Dossier (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* LEFT 7 COLUMNS: D3.js Interactive SVG Stage */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center p-3 sm:p-5 border-b lg:border-b-0 lg:border-r border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(45,58,30,0.32),rgba(13,18,11,0.95)_75%)]">
          {/* Interactive Hint Pill */}
          <div className="w-full flex items-center justify-between px-2 pt-1 pb-2 text-[11px] font-mono text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5 text-[#E6B94D]" />
              <span>Drag any venture node or click to inspect</span>
            </span>
            <span className="text-[#E6B94D]">
              {activeNodeData.id === 'bezalel'
                ? '00 · All 4 Spokes Active'
                : `${activeNodeData.number} · Connected to Bezalel Hub`}
            </span>
          </div>

          <div className="w-full max-w-[680px] aspect-[760/680] relative flex items-center justify-center">
            <svg
              ref={svgRef}
              viewBox="0 0 760 680"
              className="w-full h-full overflow-visible"
              role="img"
              aria-label="D3 Interactive Ecosystem Map positioning Bezalel Inc in the center with four orbiting venture nodes"
            />
          </div>

          {/* Quick Bottom Node Switcher Pills */}
          <div className="w-full flex flex-wrap items-center justify-center gap-1.5 pt-2 pb-1">
            {INITIAL_NODES.map((node) => {
              const isSelected = activeNodeData.id === node.id;
              return (
                <button
                  key={`pill-${node.id}`}
                  type="button"
                  onClick={() => setSelectedId(node.id)}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#E6B94D] text-[#141812] border-[#E6B94D] font-bold shadow-xs'
                      : 'bg-white/5 text-white/75 border-white/10 hover:border-[#E6B94D]/50 hover:text-white'
                  }`}
                >
                  <span>{node.number}</span>
                  <span>{node.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: Live Synchronized Node & Hub Connection Dossier */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-[#11180E]/90 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNodeData.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              {/* Top Node Status Header */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#E6B94D]/20 border border-[#E6B94D]/40 text-[#F5CE68] font-mono text-[11px] font-bold">
                    {activeNodeData.id === 'bezalel'
                      ? 'CENTRAL HUB 00'
                      : `ORBITING NODE ${activeNodeData.number}`}
                  </span>
                  <span className="text-xs font-mono text-[#A3B86C]">
                    {activeNodeData.wingLabel}
                  </span>
                </div>
              </div>

              {/* Brand Logo Stage */}
              <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E6B94D]/30 flex items-center justify-between gap-4 shadow-inner">
                <img
                  src={activeEntity.logo}
                  alt={activeEntity.name}
                  referrerPolicy="no-referrer"
                  className="h-12 sm:h-14 w-auto max-w-[65%] object-contain"
                />
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#405329] font-bold">
                    {activeNodeData.roleLabel}
                  </div>
                  <div className="text-[11px] font-sans text-[#52584E] mt-0.5">
                    {activeNodeData.id === 'bezalel'
                      ? 'Parent Holding Group'
                      : 'Connected to Bezalel Inc'}
                  </div>
                </div>
              </div>

              {/* Title, Tagline & Summary */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#E6B94D] font-semibold">
                  {activeNodeData.category}
                </div>
                <h4 className="font-display text-2xl font-medium text-white leading-snug">
                  {activeNodeData.name}
                </h4>
                <p className="font-display italic text-sm text-[#F5CE68]">
                  "{activeNodeData.tagline}"
                </p>
                <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed pt-1">
                  {activeNodeData.summary}
                </p>
              </div>

              {/* Quantitative Proof Strip */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {activeNodeData.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3 rounded-xl bg-white/[0.04] border border-white/10"
                  >
                    <div className="font-display text-base sm:text-lg font-semibold text-[#F5CE68] tabular-nums">
                      {m.value}
                    </div>
                    <div className="text-[10px] font-mono text-white/60 uppercase tracking-wider mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hub Connection & Synergy Explanation Box */}
              <div className="p-4 rounded-2xl bg-[#1A2413]/90 border border-[#E6B94D]/30 space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#F5CE68] font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#E6B94D]" />
                  <span>
                    {activeNodeData.id === 'bezalel'
                      ? 'How the Central Hub Anchors the 4 Ventures'
                      : 'How This Node Connects to Bezalel Inc'}
                  </span>
                </div>
                <p className="text-xs text-white/85 leading-relaxed">
                  {activeNodeData.synergyNote}
                </p>
              </div>

              {/* Core Focus Areas */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#A3B86C] font-bold">
                  Core Capabilities &amp; Deliverables
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {activeEntity.focusAreas.slice(0, 4).map((area) => (
                    <div
                      key={area}
                      className="flex items-start gap-2 text-xs text-white/85"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A3B86C] shrink-0 mt-0.5" />
                      <span className="leading-snug">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Action Buttons */}
          <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
            {activeNodeData.id === 'bezalel' ? (
              <button
                type="button"
                onClick={() => navigate('/story')}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#E6B94D] hover:bg-[#F5CE68] text-[#141812] text-xs font-semibold transition-all cursor-pointer shadow-md"
              >
                <span>Explore Bezalel Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate(`/company/${activeNodeData.id}`)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#E6B94D] hover:bg-[#F5CE68] text-[#141812] text-xs font-semibold transition-all cursor-pointer shadow-md"
              >
                <span>Open {activeNodeData.shortName} Page</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onOpenInquiry && (
              <button
                type="button"
                onClick={() =>
                  onOpenInquiry(
                    activeNodeData.id === 'bezalel'
                      ? undefined
                      : activeNodeData.id
                  )
                }
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Book Consultation</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#E6B94D]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveEcosystemMap;
