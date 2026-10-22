import { Github, Linkedin, Mail, MessageCircle, type LucideIcon } from 'lucide-react';
import { emailComposeUrl, profile, socials, type SocialLink } from '../data/portfolio';
import ContactButton from './ContactButton';
import FadeIn from './FadeIn';

const SOCIAL_ICONS: Record<SocialLink['id'], LucideIcon> = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  whatsapp: MessageCircle,
};

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-20 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-10 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-28"
    >
      <div className="flex flex-col items-center text-center">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
            Contact
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} y={20} className="mt-6 sm:mt-8">
          <p className="font-light text-[#D7E2EA] text-[clamp(1rem,2vw,1.35rem)]">
            Have a project in mind? Let&apos;s talk.
          </p>
        </FadeIn>

        <FadeIn delay={0.25} y={20} className="mt-10 sm:mt-14">
          <ContactButton href={emailComposeUrl} newTab />
        </FadeIn>

        <FadeIn delay={0.35} y={20} className="mt-12 sm:mt-16">
          <ul className="flex items-center gap-8 sm:gap-10">
            {socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.id];
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target={social.id === 'mail' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="inline-flex text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
                  >
                    <Icon size={26} strokeWidth={1.6} />
                  </a>
                </li>
              );
            })}
          </ul>
        </FadeIn>

        <FadeIn delay={0.45} y={20} className="mt-14 sm:mt-20">
          <p className="text-xs font-light tracking-wide text-[#D7E2EA]/60 sm:text-sm">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
