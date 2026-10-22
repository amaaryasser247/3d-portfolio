import { aboutDecorations, aboutText } from '../data/portfolio';
import AnimatedText from './AnimatedText';
import FadeIn from './FadeIn';
import SmartImage from './SmartImage';

interface DecorationPlacement {
  position: string;
  width: string;
  delay: number;
  x: number;
}

// Corner decorations: positions, sizes, delays and directions per the spec.
const DECORATIONS: DecorationPlacement[] = [
  {
    position: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%]',
    width: 'w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    position: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]',
    width: 'w-[100px] sm:w-[140px] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    position: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%]',
    width: 'w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    position: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]',
    width: 'w-[130px] sm:w-[170px] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10"
    >
      {DECORATIONS.map((decoration, index) => (
        <div
          key={aboutDecorations[index].src}
          className={`pointer-events-none absolute select-none ${decoration.position} ${decoration.width}`}
        >
          <FadeIn delay={decoration.delay} x={decoration.x} y={0} duration={0.9}>
            <SmartImage asset={aboutDecorations[index]} className="w-full" />
          </FadeIn>
        </div>
      ))}

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-center font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
            About me
          </h2>
        </FadeIn>
        <AnimatedText
          text={aboutText}
          className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA] text-[clamp(1rem,2vw,1.35rem)]"
        />
      </div>
    </section>
  );
}
