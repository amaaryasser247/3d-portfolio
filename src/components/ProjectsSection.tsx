import { useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { projects, type Project } from '../data/portfolio';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';
import SmartImage from './SmartImage';

interface ProjectCardProps {
  project: Project;
  index: number;
  progress: MotionValue<number>;
}

function ProjectCard({ project, index, progress }: ProjectCardProps) {
  const total = projects.length;
  const targetScale = 1 - (total - 1 - index) * 0.03;
  // Card scales down as you scroll past it (card stacking effect).
  const scale = useTransform(progress, [index * 0.25, 1], [1, targetScale]);

  const offsetStyle = { '--card-offset': `${index * 28}px` } as CSSProperties;

  return (
    <div className="z-auto h-[85vh]" style={offsetStyle}>
      <motion.article
        className="project-sticky sticky rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 will-change-transform sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{ scale, transformOrigin: 'top' }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 sm:gap-6">
          <span className="font-black leading-[0.85] text-[#D7E2EA] text-[clamp(3rem,10vw,140px)]">
            {project.index}
          </span>

          <div className="min-w-[220px] flex-1 sm:max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
              {project.category}
            </p>
            <h3 className="mt-1 font-medium uppercase leading-tight text-[#D7E2EA] text-[clamp(1.15rem,2.6vw,2.2rem)]">
              {project.name}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-[#D7E2EA]/70 px-2.5 py-0.5 text-[10px] font-light uppercase tracking-wider text-[#D7E2EA]/70 sm:text-xs"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <p className="mt-3 max-w-2xl font-light leading-relaxed text-[#D7E2EA]/80 text-[clamp(0.85rem,1.6vw,1.25rem)]">
              {project.description}
            </p>
          </div>

          <LiveProjectButton href={project.liveUrl || '#'} />
        </div>

        <div className="mt-6 flex flex-1 gap-3 sm:mt-8 sm:gap-4">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4">
            <SmartImage
              asset={project.images[0]}
              className="h-[clamp(130px,16vw,230px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
            <SmartImage
              asset={project.images[1]}
              className="h-[clamp(160px,22vw,340px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
          <SmartImage
            asset={project.images[2]}
            className="h-auto min-h-[clamp(302px,38vw,586px)] w-[60%] rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
          />
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Progress across the whole card stack ('start start' → 'end end').
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-4 pb-24 pt-16 sm:-mt-12 sm:rounded-t-[50px] sm:px-6 sm:pb-28 md:-mt-14 md:rounded-t-[60px] md:px-8 md:pb-32"
    >
      <FadeIn delay={0} y={40} className="mb-16 text-center sm:mb-20 md:mb-28">
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
          Projects
        </h2>
      </FadeIn>

      <div ref={containerRef} className="flex flex-col">
        {projects.map((project, index) => (
          <ProjectCard key={project.index} project={project} index={index} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
