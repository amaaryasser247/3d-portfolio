// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH
// All personal copy, links and image paths live in this file — components
// never hardcode them. Local media lives under /public/images; if a file is
// missing, every <img> swaps to its `fallbackSrc` via onError, so the page
// still renders.
// ─────────────────────────────────────────────────────────────────────────────

export interface ImageAsset {
  /** Local asset path under /public/images (drop your own file there). */
  src: string;
  /** Backup image rendered by onError if `src` fails to load. */
  fallbackSrc: string;
  alt: string;
}

export interface Profile {
  name: string;
  nameArabic: string;
  role: string;
  heroTitle: string;
  tagline: string;
  ctaLabel: string;
  email: string;
  location: string;
  portrait: ImageAsset;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  index: string;
  title: string;
  description: string;
}

export interface Project {
  index: string;
  name: string;
  category: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  /** [left column top, left column bottom, right column tall image] */
  images: [ImageAsset, ImageAsset, ImageAsset];
}

export interface SocialLink {
  id: 'mail' | 'github' | 'linkedin' | 'whatsapp';
  label: string;
  href: string;
}

export const profile: Profile = {
  name: 'Amaar Yasser',
  nameArabic: 'عمار ياسر السيد التملي',
  role: 'Front-End Developer (React)',
  heroTitle: "Hi, i'm amaar",
  tagline: 'a front-end developer building fast, animated and unforgettable web experiences',
  ctaLabel: 'Contact Me',
  email: 'amaaryasser88@gmail.com',
  location: 'Egypt',
  portrait: {
    src: '/images/me-cartoon.webp',
    fallbackSrc: '/images/me-cartoon.png',
    alt: 'Cartoon portrait of Amaar Yasser',
  },
};

/** Gmail compose link — works in the browser even without a desktop mail app. */
export const emailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  profile.email,
)}&su=${encodeURIComponent('Project inquiry from your portfolio')}`;

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const aboutText =
  "I'm a computer science graduate and front-end developer from Egypt with hands-on React experience. I build responsive, animated interfaces with React, TypeScript, Tailwind, Framer Motion, GSAP and Three.js, and I enjoy turning complex ideas, like an AI-powered interior design platform, into clean, fast products. Let's build something incredible together!";

export const services: Service[] = [
  {
    index: '01',
    title: 'Frontend Development',
    description:
      'Building fast, accessible and maintainable interfaces with React, TypeScript and Tailwind CSS, from small landing pages to full applications.',
  },
  {
    index: '02',
    title: 'Responsive UI',
    description:
      'Turning designs into pixel-accurate, fluid layouts that look great on every screen, from mobile to ultra-wide.',
  },
  {
    index: '03',
    title: 'API Integration',
    description:
      'Connecting frontends to real backends: REST APIs, Axios interceptors, JWT authentication, CORS and proxy setup, with proper error and loading states.',
  },
  {
    index: '04',
    title: 'Motion & 3D',
    description:
      'Smooth, purposeful animations with Framer Motion and GSAP, plus interactive 3D scenes with Three.js, that add personality and polish to every interaction.',
  },
  {
    index: '05',
    title: 'E-commerce Apps',
    description:
      'Product catalogs, carts, wishlists, forms with validation and persistent state, built for a premium shopping experience.',
  },
];

// ── Marquee (21 tiles: row 1 = first 11, row 2 = remaining 10) ───────────────

const MOTION_SITES_GIFS = [
  'hero-space-voyage-preview-eECLH3Yc.gif',
  'hero-codenest-preview-Cgppc2qV.gif',
  'hero-vex-ventures-preview-BczMFIiw.gif',
  'hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'hero-asme-preview-B_nGDnTP.gif',
  'hero-transform-data-preview-Cx5OU29N.gif',
  'hero-vitara-preview-Cjz2QYyU.gif',
  'hero-terra-preview-BFjrCr7T.gif',
  'hero-skyelite-preview-DHaZIgUv.gif',
  'hero-aethera-preview-DknSlcTa.gif',
  'hero-designpro-preview-D8c5_een.gif',
  'hero-stellar-ai-preview-D3HL6bw1.gif',
  'hero-xportfolio-preview-D4A8maiC.gif',
  'hero-orbit-web3-preview-BXt4OttD.gif',
  'hero-nexora-preview-cx5HmUgo.gif',
  'hero-evr-ventures-preview-DZxeVFEX.gif',
  'hero-planet-orbit-preview-DWAP8Z1P.gif',
  'hero-new-era-preview-CocuDUm9.gif',
  'hero-wealth-preview-B70idl_u.gif',
  'hero-luminex-preview-CxOP7ce6.gif',
  'hero-celestia-preview-0yO3jXO8.gif',
] as const;

const pad = (value: number) => String(value).padStart(2, '0');

export const marqueeImages: ImageAsset[] = MOTION_SITES_GIFS.map((file, i) => ({
  src: `/images/marquee/${pad(i + 1)}.webp`,
  fallbackSrc: `https://motionsites.ai/assets/${file}`,
  alt: `Website animation preview ${pad(i + 1)}`,
}));

// ── About corner decorations (top-left, bottom-left, top-right, bottom-right) ─

const FIGMA_DECORATIONS =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7';

export const aboutDecorations: ImageAsset[] = [
  {
    src: '/images/about/moon.png',
    fallbackSrc: `${FIGMA_DECORATIONS}/moon_icon.11395d36.png`,
    alt: 'Decorative 3D moon icon',
  },
  {
    src: '/images/about/object.png',
    fallbackSrc: `${FIGMA_DECORATIONS}/p59_1.4659672e.png`,
    alt: 'Decorative abstract object',
  },
  {
    src: '/images/about/lego.png',
    fallbackSrc: `${FIGMA_DECORATIONS}/lego_icon-1.703bb594.png`,
    alt: 'Decorative 3D lego icon',
  },
  {
    src: '/images/about/group.png',
    fallbackSrc: `${FIGMA_DECORATIONS}/Group_134-1.2e04f3ce.png`,
    alt: 'Decorative 3D shape group',
  },
];

// ── Projects ─────────────────────────────────────────────────────────────────

const projectImages = (
  prefix: string,
  alts: [string, string, string],
): Project['images'] => {
  const shot = (position: number) => `/images/projects/${prefix}-${position}.jpg`;
  return [
    { src: shot(1), fallbackSrc: shot(2), alt: alts[0] },
    { src: shot(2), fallbackSrc: shot(3), alt: alts[1] },
    { src: shot(3), fallbackSrc: shot(1), alt: alts[2] },
  ];
};

export const projects: Project[] = [
  {
    index: '01',
    name: 'CasaMood',
    category: 'Graduation Project',
    description:
      'AI-powered interior cost estimator: upload a 2D room design, detect furniture automatically, match each item with verified Egyptian vendors, and generate instant cost breakdowns and print-ready catalogs.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Axios', 'JWT', '.NET API'],
    liveUrl: 'https://gradproject-gules.vercel.app/',
    repoUrl: 'https://github.com/amaaryasser247/gradproject',
    images: projectImages('casamood', [
      'CasaMood landing page hero',
      'CasaMood how it works section',
      'CasaMood featured vendors section',
    ]),
  },
  {
    index: '02',
    name: 'MRWOOD',
    category: 'Client Project',
    description:
      'Bilingual digital showroom for a Cairo woodworking workshop founded in 1995 — brand story, interactive before/after comparison, filterable door collection and a WhatsApp-first inquiry flow.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Framer Motion', 'Lucide'],
    liveUrl: 'https://mrwood-eta.vercel.app/',
    repoUrl: 'https://github.com/amaaryasser247/MRWOOD',
    images: projectImages('mrwood', [
      'MRWOOD landing page hero',
      'MRWOOD before and after door comparison',
      'MRWOOD handcrafted doors collection',
    ]),
  },
  {
    index: '03',
    name: 'VELO',
    category: 'Personal Project',
    description:
      'Premium sneaker storefront built on a build-time snapshot of real Nike listings — product catalog, wishlist, size selection and a fully bilingual English/Arabic UI with GSAP-driven motion.',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP', 'React Router', 'i18next'],
    liveUrl: 'https://amaaryasser247.github.io/velo-store/',
    repoUrl: 'https://github.com/amaaryasser247/velo-store',
    images: projectImages('velo', [
      'VELO landing page hero',
      'VELO new arrivals product grid',
      'VELO highest rated product grid',
    ]),
  },
];

export const socials: SocialLink[] = [
  { id: 'mail', label: 'Email', href: `mailto:${profile.email}` },
  { id: 'github', label: 'GitHub', href: 'https://github.com/amaaryasser247' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/amaar-yasser-bb9632284' },
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/201280320487' },
];
