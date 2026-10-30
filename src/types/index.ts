export interface Scene {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string; // e.g. "46:18"
  durationSeconds: number;
  releaseDate: string;
  rating: number; // 4.9
  votesCount: number;
  viewsCount: string;
  resolution: '4K UHD' | '1080p HD' | 'VR 180°';
  fps: number; // 60
  isExclusive: boolean;
  isFeatured: boolean;
  categories: string[];
  models: {
    id: string;
    name: string;
    role?: string;
  }[];
  chapters: {
    time: string;
    title: string;
    seconds: number;
  }[];
  downloadSizes: {
    uhd4k: string; // "8.4 GB"
    hd1080: string; // "3.1 GB"
    sd720: string; // "1.2 GB"
  };
  previewFrames: string[]; // Gradient or SVG style seeds for scrub simulation
  accentGradient: string;
  photoCount: number;
}

export interface Model {
  id: string;
  name: string;
  country: string;
  sceneCount: number;
  photoSetCount: number;
  rating: number;
  bio: string;
  stats: {
    height: string;
    measurements: string;
    ethnicity: string;
    hairColor: string;
    debutYear: number;
  };
  avatarGradient: string;
  popularCategory: string;
  isStudioExclusive: boolean;
}

export interface PhotoSet {
  id: string;
  title: string;
  modelName: string;
  photoCount: number;
  resolution: string;
  releaseDate: string;
  coverGradient: string;
  images: {
    id: number;
    title: string;
    aspect: string;
    gradient: string;
  }[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tagline: string;
  period: string; // "1 Month", "3 Months", "1 Year"
  pricePerMonth: number;
  totalBilled: number;
  billingFrequency: string; // "Billed $29.95 monthly"
  savingsPercent?: number;
  isPopular?: boolean;
  isBestValue?: boolean;
  features: string[];
}

export type ViewTab = 'tour' | 'scenes' | 'models' | 'photos' | 'pricing' | 'perks';
