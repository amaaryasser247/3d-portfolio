import { navLinks, profile } from '../data/portfolio';
import FadeIn from './FadeIn';
import Magnet from './Magnet';
import SmartImage from './SmartImage';

export default function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col overflow-x-clip bg-[#0C0C0C]">
      {/* Navbar */}
      <FadeIn y={-20} delay={0}>
        <nav className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Massive gradient headline */}
      <div className="overflow-hidden">
        <FadeIn y={40} delay={0.15}>
          <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-center font-black uppercase leading-none tracking-tight text-[15vw] sm:mt-4 md:-mt-5">
            Hi, i&apos;m amaar
          </h1>
        </FadeIn>
      </div>

      {/* Portrait with magnetic hover */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:translate-y-0">
        <FadeIn y={30} delay={0.6} className="flex">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[460px]"
          >
            <SmartImage
              asset={profile.portrait}
              loading="eager"
              className="h-auto w-full select-none"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn y={20} delay={0.35}>
          <p className="max-w-[160px] font-light uppercase tracking-wide leading-snug text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px] text-[clamp(0.75rem,1.4vw,1.5rem)]">
            {profile.tagline}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
