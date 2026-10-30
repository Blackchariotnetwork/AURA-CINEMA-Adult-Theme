import { Scene, Model, PhotoSet, SubscriptionPlan } from '../types';

export const MOCK_MODELS: Model[] = [
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    country: 'France',
    sceneCount: 28,
    photoSetCount: 42,
    rating: 4.96,
    bio: 'Award-winning European headliner celebrated for sultry cinematic performances and captivating screen charisma. Aura exclusive since 2024.',
    stats: {
      height: '5\'8" (173cm)',
      measurements: '34D - 24 - 36',
      ethnicity: 'Caucasian / French',
      hairColor: 'Brunette',
      debutYear: 2022
    },
    avatarGradient: 'from-rose-900 via-stone-900 to-black',
    popularCategory: 'Feature Film / Glamour',
    isStudioExclusive: true
  },
  {
    id: 'sophia-cruz',
    name: 'Sophia Cruz',
    country: 'Spain',
    sceneCount: 34,
    photoSetCount: 50,
    rating: 4.98,
    bio: 'Recognized for high-energy passion, natural elegance, and an expressive screen presence that regularly commands top-rated community leaderboards.',
    stats: {
      height: '5\'6" (168cm)',
      measurements: '32C - 23 - 35',
      ethnicity: 'Hispanic / Iberian',
      hairColor: 'Deep Auburn',
      debutYear: 2021
    },
    avatarGradient: 'from-amber-900 via-stone-900 to-black',
    popularCategory: 'Solo & Duo Cinema',
    isStudioExclusive: true
  },
  {
    id: 'chloe-duval',
    name: 'Chloe Duval',
    country: 'Monaco',
    sceneCount: 19,
    photoSetCount: 31,
    rating: 4.92,
    bio: 'Former haute couture model turned cinematic muse known for opulent bedroom aesthetic and hypnotic slow-burn scenes.',
    stats: {
      height: '5\'10" (178cm)',
      measurements: '34B - 24 - 34',
      ethnicity: 'Western European',
      hairColor: 'Platinum Blonde',
      debutYear: 2023
    },
    avatarGradient: 'from-indigo-950 via-slate-900 to-black',
    popularCategory: 'Haute Glamour',
    isStudioExclusive: false
  },
  {
    id: 'anya-sterling',
    name: 'Anya Sterling',
    country: 'United Kingdom',
    sceneCount: 22,
    photoSetCount: 36,
    rating: 4.94,
    bio: 'Renowned for intense, chemistry-driven duos and razor-sharp dramatic staging in 4K high dynamic range.',
    stats: {
      height: '5\'7" (170cm)',
      measurements: '34DD - 25 - 37',
      ethnicity: 'British / Celtic',
      hairColor: 'Raven Black',
      debutYear: 2023
    },
    avatarGradient: 'from-violet-950 via-zinc-900 to-black',
    popularCategory: 'Duos & Featurettes',
    isStudioExclusive: true
  },
  {
    id: 'maya-lin',
    name: 'Maya Lin',
    country: 'Canada',
    sceneCount: 16,
    photoSetCount: 25,
    rating: 4.89,
    bio: 'Contemporary artist whose intimate solo explorations and avant-garde lighting design create unforgettable video experiences.',
    stats: {
      height: '5\'5" (165cm)',
      measurements: '32B - 22 - 34',
      ethnicity: 'East Asian / Canadian',
      hairColor: 'Midnight Black',
      debutYear: 2024
    },
    avatarGradient: 'from-teal-950 via-zinc-900 to-black',
    popularCategory: 'Sensual Solo',
    isStudioExclusive: false
  },
  {
    id: 'marcus-thorne',
    name: 'Marcus Thorne',
    country: 'United States',
    sceneCount: 45,
    photoSetCount: 20,
    rating: 4.91,
    bio: 'Industry leading male lead praised for attentiveness, stamina, and seamless screen synergy with Aura\'s top contract roster.',
    stats: {
      height: '6\'2" (188cm)',
      measurements: 'Athletic 42R',
      ethnicity: 'American',
      hairColor: 'Dark Brown',
      debutYear: 2019
    },
    avatarGradient: 'from-neutral-900 via-stone-900 to-black',
    popularCategory: 'Duos & Featurettes',
    isStudioExclusive: false
  }
];

export const MOCK_SCENES: Scene[] = [
  {
    id: 'scene-penthouse-velvet',
    title: 'Velvet Nocturne: Midnight Penthouse Suite',
    slug: 'velvet-nocturne-midnight-penthouse',
    description: 'Shot in a private skyline duplex overlooking the city lights. Elena Vance commands a lavish scene featuring custom architectural mood lighting, 10-bit color grading, and intimate multi-angle camera coverage.',
    duration: '48:32',
    durationSeconds: 2912,
    releaseDate: 'October 26, 2026',
    rating: 4.98,
    votesCount: 3840,
    viewsCount: '184.2K',
    resolution: '4K UHD',
    fps: 60,
    isExclusive: true,
    isFeatured: true,
    categories: ['4K Ultra HD', 'Feature Film', 'Duos & Featurettes', 'Exclusive Backstage'],
    models: [
      { id: 'elena-vance', name: 'Elena Vance' },
      { id: 'marcus-thorne', name: 'Marcus Thorne' }
    ],
    chapters: [
      { time: '00:00', title: 'Skyline Terrace Prelude', seconds: 0 },
      { time: '11:45', title: 'Velvet Lounge Intimacy', seconds: 705 },
      { time: '28:10', title: 'Chamber Spotlight', seconds: 1690 },
      { time: '41:20', title: 'The Grand Climax & Afterglow', seconds: 2480 }
    ],
    downloadSizes: {
      uhd4k: '9.4 GB (ProRes/H.265)',
      hd1080: '3.6 GB (High Profile MP4)',
      sd720: '1.4 GB (Mobile Ready)'
    },
    previewFrames: [
      '#1a0b12', '#2d0f1f', '#3b1228', '#1c0915', '#4a1130'
    ],
    accentGradient: 'from-rose-950 via-red-950/40 to-neutral-950',
    photoCount: 68
  },
  {
    id: 'scene-sanctuary-azure',
    title: 'Azure Horizon: Private Balearic Villa',
    slug: 'azure-horizon-balearic-villa',
    description: 'Sun-drenched Mediterranean luxury. Sophia Cruz basks in natural seaside breeze and sheer silk curtains, transitioning from an expansive terrace lounger to the marble-lined bath.',
    duration: '42:15',
    durationSeconds: 2535,
    releaseDate: 'October 21, 2026',
    rating: 4.95,
    votesCount: 2910,
    viewsCount: '142.9K',
    resolution: '4K UHD',
    fps: 60,
    isExclusive: true,
    isFeatured: true,
    categories: ['4K Ultra HD', 'Solo Sensations', 'Glamour'],
    models: [
      { id: 'sophia-cruz', name: 'Sophia Cruz' }
    ],
    chapters: [
      { time: '00:00', title: 'Morning Salt Air', seconds: 0 },
      { time: '14:20', title: 'Sunbed Silk Warmth', seconds: 860 },
      { time: '29:40', title: 'Marble Bath Finale', seconds: 1780 }
    ],
    downloadSizes: {
      uhd4k: '8.1 GB',
      hd1080: '2.9 GB',
      sd720: '1.1 GB'
    },
    previewFrames: [
      '#0d1b2a', '#1b263b', '#253d5b', '#1e3048', '#0b1622'
    ],
    accentGradient: 'from-amber-950/80 via-stone-900 to-neutral-950',
    photoCount: 52
  },
  {
    id: 'scene-vr-intimate-soiree',
    title: 'Nocturne VR: Spatial 180° Immersive Rendezvous',
    slug: 'nocturne-vr-spatial-180-rendezvous',
    description: 'Filmed on dual 8K stereoscopic VR cameras at 60fps. Chloe Duval invites the viewer into an unscripted, head-tracking enabled encounter with directional binaural spatial audio.',
    duration: '39:50',
    durationSeconds: 2390,
    releaseDate: 'October 16, 2026',
    rating: 4.97,
    votesCount: 4210,
    viewsCount: '210.5K',
    resolution: 'VR 180°',
    fps: 60,
    isExclusive: true,
    isFeatured: true,
    categories: ['VR Experience', '4K Ultra HD', 'Solo Sensations'],
    models: [
      { id: 'chloe-duval', name: 'Chloe Duval' }
    ],
    chapters: [
      { time: '00:00', title: 'Direct Eye Contact & Welcome', seconds: 0 },
      { time: '12:00', title: 'Slow Approach & Whispers', seconds: 720 },
      { time: '26:30', title: 'Spatial Immersion Peak', seconds: 1590 }
    ],
    downloadSizes: {
      uhd4k: '14.2 GB (8K Stereo VR)',
      hd1080: '5.8 GB (4K VR)',
      sd720: '2.4 GB (Headset Stream)'
    },
    previewFrames: [
      '#13111c', '#201b33', '#2d2449', '#19152b', '#0c0a13'
    ],
    accentGradient: 'from-purple-950 via-zinc-950 to-neutral-950',
    photoCount: 44
  },
  {
    id: 'scene-london-after-dark',
    title: 'Mayfair Confidential: Private Club After Hours',
    slug: 'mayfair-confidential-club-after-hours',
    description: 'Behind locked double mahogany doors in central London. Anya Sterling and Marcus Thorne share an intense, chemistry-heavy duet captured with anamorphic glass and raw uninhibited audio.',
    duration: '54:10',
    durationSeconds: 3250,
    releaseDate: 'October 11, 2026',
    rating: 4.93,
    votesCount: 3105,
    viewsCount: '169.8K',
    resolution: '4K UHD',
    fps: 60,
    isExclusive: false,
    isFeatured: true,
    categories: ['4K Ultra HD', 'Duos & Featurettes', 'Feature Film'],
    models: [
      { id: 'anya-sterling', name: 'Anya Sterling' },
      { id: 'marcus-thorne', name: 'Marcus Thorne' }
    ],
    chapters: [
      { time: '00:00', title: 'The Speakeasy Vault', seconds: 0 },
      { time: '16:30', title: 'Leather & Lace Staging', seconds: 990 },
      { time: '34:10', title: 'Passionate Unison', seconds: 2050 },
      { time: '48:00', title: 'Uncensored Release', seconds: 2880 }
    ],
    downloadSizes: {
      uhd4k: '10.8 GB',
      hd1080: '4.2 GB',
      sd720: '1.6 GB'
    },
    previewFrames: [
      '#1f140e', '#361e12', '#4d2a17', '#25160d', '#130a05'
    ],
    accentGradient: 'from-amber-950 via-zinc-950 to-neutral-950',
    photoCount: 75
  },
  {
    id: 'scene-neon-noir-studio',
    title: 'Tokyo Chromatics: Neon Atelier Solo',
    slug: 'tokyo-chromatics-neon-atelier',
    description: 'High-contrast cyberpunk noir stylization. Maya Lin surrounded by ambient soft magenta tubes and deep violet shadows in a Tokyo loft, accompanied by a custom synth analog score.',
    duration: '36:45',
    durationSeconds: 2205,
    releaseDate: 'October 05, 2026',
    rating: 4.88,
    votesCount: 1980,
    viewsCount: '98.4K',
    resolution: '4K UHD',
    fps: 60,
    isExclusive: true,
    isFeatured: false,
    categories: ['4K Ultra HD', 'Solo Sensations', 'Glamour'],
    models: [
      { id: 'maya-lin', name: 'Maya Lin' }
    ],
    chapters: [
      { time: '00:00', title: 'Rain on the Skylight', seconds: 0 },
      { time: '13:15', title: 'Magenta Shadows', seconds: 795 },
      { time: '25:50', title: 'Sensual Climax', seconds: 1550 }
    ],
    downloadSizes: {
      uhd4k: '7.2 GB',
      hd1080: '2.6 GB',
      sd720: '1.0 GB'
    },
    previewFrames: [
      '#1b0d24', '#2d143c', '#431958', '#220b2d', '#0d0412'
    ],
    accentGradient: 'from-fuchsia-950 via-zinc-950 to-neutral-950',
    photoCount: 40
  },
  {
    id: 'scene-behind-scenes-unmasked',
    title: 'Aura Unmasked: Studio Backstage & Bloopers Vol. IV',
    slug: 'aura-unmasked-studio-backstage-vol-4',
    description: 'Go behind the scenes with Elena Vance, Sophia Cruz, and the Aura production crew. Raw rehearsal banter, wardrobe fittings, candid laughs, and unedited bonus takes.',
    duration: '31:20',
    durationSeconds: 1880,
    releaseDate: 'September 29, 2026',
    rating: 4.91,
    votesCount: 1650,
    viewsCount: '112.0K',
    resolution: '1080p HD',
    fps: 60,
    isExclusive: true,
    isFeatured: false,
    categories: ['Behind The Scenes', 'Exclusive Backstage'],
    models: [
      { id: 'elena-vance', name: 'Elena Vance' },
      { id: 'sophia-cruz', name: 'Sophia Cruz' }
    ],
    chapters: [
      { time: '00:00', title: 'Wardrobe & Pre-Production', seconds: 0 },
      { time: '10:15', title: 'Director\'s Cut Commentary', seconds: 615 },
      { time: '22:30', title: 'Outtakes & Blooper Reel', seconds: 1350 }
    ],
    downloadSizes: {
      uhd4k: '5.8 GB',
      hd1080: '2.1 GB',
      sd720: '820 MB'
    },
    previewFrames: [
      '#161616', '#252525', '#333333', '#1e1e1e', '#101010'
    ],
    accentGradient: 'from-stone-900 via-zinc-950 to-neutral-950',
    photoCount: 35
  },
  {
    id: 'scene-chateau-romance',
    title: 'Château Privé: The Bordeaux Estate Rendezvous',
    slug: 'chateau-prive-bordeaux-estate',
    description: 'An expansive historic French estate estate. High ceilings, crackling fireplace, and an unforgettable pairing between Elena Vance and Anya Sterling.',
    duration: '51:04',
    durationSeconds: 3064,
    releaseDate: 'September 22, 2026',
    rating: 4.99,
    votesCount: 5410,
    viewsCount: '278.4K',
    resolution: '4K UHD',
    fps: 60,
    isExclusive: true,
    isFeatured: false,
    categories: ['4K Ultra HD', 'Duos & Featurettes', 'Feature Film'],
    models: [
      { id: 'elena-vance', name: 'Elena Vance' },
      { id: 'anya-sterling', name: 'Anya Sterling' }
    ],
    chapters: [
      { time: '00:00', title: 'Fireplace Salon Prelude', seconds: 0 },
      { time: '15:20', title: 'Silk Robes Discarded', seconds: 920 },
      { time: '32:45', title: 'Double Star Synchronicity', seconds: 1965 },
      { time: '44:10', title: 'Euphoric Conclusion', seconds: 2650 }
    ],
    downloadSizes: {
      uhd4k: '10.2 GB',
      hd1080: '3.9 GB',
      sd720: '1.5 GB'
    },
    previewFrames: [
      '#240e11', '#3b161c', '#541f27', '#2e1115', '#140608'
    ],
    accentGradient: 'from-rose-950 via-zinc-950 to-neutral-950',
    photoCount: 80
  },
  {
    id: 'scene-golden-hour-coastal',
    title: 'Capri Solitude: Coastal Cliffside Retreat',
    slug: 'capri-solitude-coastal-cliffside',
    description: 'Dramatic limestone cliffs of Capri captured at golden hour. Sophia Cruz revels in the warm Mediterranean breeze in full 4K 60FPS clarity.',
    duration: '38:15',
    durationSeconds: 2295,
    releaseDate: 'September 15, 2026',
    rating: 4.92,
    votesCount: 2230,
    viewsCount: '131.2K',
    resolution: '4K UHD',
    fps: 60,
    isExclusive: false,
    isFeatured: false,
    categories: ['4K Ultra HD', 'Solo Sensations', 'Glamour'],
    models: [
      { id: 'sophia-cruz', name: 'Sophia Cruz' }
    ],
    chapters: [
      { time: '00:00', title: 'Cliffside Infinity Pool', seconds: 0 },
      { time: '14:30', title: 'Golden Hour Glow', seconds: 870 },
      { time: '27:10', title: 'Twilight Climax', seconds: 1630 }
    ],
    downloadSizes: {
      uhd4k: '7.8 GB',
      hd1080: '2.8 GB',
      sd720: '1.1 GB'
    },
    previewFrames: [
      '#1b1811', '#2f2717', '#46381e', '#292011', '#140f07'
    ],
    accentGradient: 'from-amber-950 via-zinc-950 to-neutral-950',
    photoCount: 48
  }
];

export const MOCK_PHOTO_SETS: PhotoSet[] = [
  {
    id: 'photo-set-elena-penthouse',
    title: 'Velvet Nocturne: Exclusive 4K Editorial Set',
    modelName: 'Elena Vance',
    photoCount: 68,
    resolution: '48 Megapixels (RAW to 4K)',
    releaseDate: 'October 26, 2026',
    coverGradient: 'from-rose-950 via-stone-900 to-black',
    images: [
      { id: 1, title: 'Skyline Silhouette', aspect: '16/9', gradient: 'from-rose-950 via-stone-900 to-neutral-950' },
      { id: 2, title: 'Velvet Recline', aspect: '4/3', gradient: 'from-red-950 via-zinc-900 to-neutral-950' },
      { id: 3, title: 'Chiaroscuro Portrait', aspect: '3/4', gradient: 'from-neutral-900 via-rose-950 to-black' },
      { id: 4, title: 'Floor-to-Ceiling Gaze', aspect: '16/9', gradient: 'from-stone-950 via-red-950 to-black' },
      { id: 5, title: 'Candlelight Micro Close-up', aspect: '1/1', gradient: 'from-rose-900 via-neutral-950 to-black' },
      { id: 6, title: 'Silk Unfurled', aspect: '4/3', gradient: 'from-red-900 via-stone-900 to-neutral-950' }
    ]
  },
  {
    id: 'photo-set-sophia-capri',
    title: 'Capri Golden Hour: Mediterranean High-Res Gallery',
    modelName: 'Sophia Cruz',
    photoCount: 52,
    resolution: '50 Megapixels Hasselblad',
    releaseDate: 'October 21, 2026',
    coverGradient: 'from-amber-950 via-stone-900 to-black',
    images: [
      { id: 1, title: 'Limestone Edge', aspect: '16/9', gradient: 'from-amber-950 via-stone-900 to-neutral-950' },
      { id: 2, title: 'Sun Kissed Profile', aspect: '3/4', gradient: 'from-yellow-950 via-zinc-900 to-black' },
      { id: 3, title: 'Azure Water Reflection', aspect: '4/3', gradient: 'from-blue-950 via-stone-900 to-neutral-950' },
      { id: 4, title: 'Breeze in the Linen', aspect: '16/9', gradient: 'from-amber-900 via-stone-950 to-black' }
    ]
  },
  {
    id: 'photo-set-chloe-monaco',
    title: 'Casino Privé: Midnight Monaco Glamour',
    modelName: 'Chloe Duval',
    photoCount: 45,
    resolution: '4K Ultra High-Res',
    releaseDate: 'October 16, 2026',
    coverGradient: 'from-indigo-950 via-stone-900 to-black',
    images: [
      { id: 1, title: 'Chandelier Glimmer', aspect: '16/9', gradient: 'from-indigo-950 via-zinc-900 to-black' },
      { id: 2, title: 'Silk Lounging', aspect: '4/3', gradient: 'from-blue-950 via-stone-900 to-neutral-950' },
      { id: 3, title: 'Balcony Overlook', aspect: '3/4', gradient: 'from-indigo-900 via-neutral-950 to-black' }
    ]
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-monthly',
    name: '1 Month Full Access',
    tagline: 'Flexible access with instant cancellation',
    period: 'Monthly Pass',
    pricePerMonth: 29.95,
    totalBilled: 29.95,
    billingFrequency: 'Billed $29.95 every 30 days',
    features: [
      'Unlimited 4K Ultra HD & 60FPS streaming',
      'Uncensored full studio releases',
      'Instant access on Mobile, Tablet & Smart TV',
      'Full high-res photo set galleries',
      '10 Offline DRM-free MP4 scene downloads/month',
      'Cancel online anytime with 1-click'
    ]
  },
  {
    id: 'plan-quarterly',
    name: '3 Months All-Access VIP',
    tagline: 'Most Popular · Save 33% on full library',
    period: 'Quarterly VIP',
    pricePerMonth: 19.95,
    totalBilled: 59.85,
    billingFrequency: 'Billed $59.85 every 3 months',
    savingsPercent: 33,
    isPopular: true,
    isBestValue: true,
    features: [
      'Everything in Monthly Pass included',
      'Unlimited offline 4K & 1080p downloads',
      'Full 8K / 4K Stereoscopic VR archive access',
      'Multi-angle camera switcher during scenes',
      'Exclusive backstage unmasked releases',
      'Priority 40Gbps streaming CDN edge routing',
      '30-Day discrete refund guarantee'
    ]
  },
  {
    id: 'plan-annual',
    name: '1 Year VIP Elite Pass',
    tagline: 'Maximum Savings · Save 55% + Exclusive Perks',
    period: 'Annual Elite',
    pricePerMonth: 12.95,
    totalBilled: 155.40,
    billingFrequency: 'Billed $155.40 annually',
    savingsPercent: 55,
    features: [
      'Everything in Quarterly VIP included',
      'Permanent lifetime download archive retention',
      'Direct live stream access to studio shoots',
      'Vote on upcoming performer casting & storylines',
      'VIP Concierge support with 1-hour SLA',
      'Discrete billing with guaranteed no-trace descriptors',
      'Complimentary physical studio gift pack (optional)'
    ]
  }
];

export const TOUR_PERKS = [
  {
    title: 'True 4K UHD at 60 FPS',
    description: 'Crisp 3840x2160 resolution mastered at 60 frames per second on cinema-grade RED and ARRI cameras. Zero pixelation, lifelike clarity.',
    category: 'Streaming Quality'
  },
  {
    title: 'Discreet Billing Guaranteed',
    description: 'All transactions appear anonymously on your credit card statement as "V-MEDIA SERVICES LLC". No adult references, 100% confidential.',
    category: 'Privacy & Security'
  },
  {
    title: 'Offline DRM-Free Downloads',
    description: 'Download full scenes in multiple formats (4K ProRes, 1080p MP4, Mobile 720p). Keep them on your local drive forever with zero DRM lock-in.',
    category: 'Member Liberty'
  },
  {
    title: 'Immersive 8K / 4K VR Archive',
    description: 'Compatible with Meta Quest 3, Apple Vision Pro, PSVR2, and Vive. Stereoscopic 180° spatial audio and high bitrate files.',
    category: 'Virtual Reality'
  },
  {
    title: 'Multi-Angle Scene Switching',
    description: 'Switch between Director\'s Cut, Close-up camera, and POV perspectives dynamically during full video playback.',
    category: 'Interactive Player'
  },
  {
    title: 'Ultra-Fast Dedicated CDN',
    description: 'Global Tier-1 edge nodes guarantee instant playback with zero buffering, regardless of your geographic location or connection speed.',
    category: 'Network Infrastructure'
  }
];

export const DISCRETE_BILLING_DESCRIPTORS = [
  { name: 'Credit / Debit Card', descriptor: 'V-MEDIA SERVICES LLC (800-555-0199)' },
  { name: 'Alternative Card Route', descriptor: 'N-TECH DIGITAL SOLUTIONS' },
  { name: 'Bank Wire / SEPA', descriptor: 'AURA DIGITAL STREAMING LTD' },
  { name: 'Cryptocurrency', descriptor: 'Direct on-chain BTC / ETH / USDT (Zero bank trace)' }
];
