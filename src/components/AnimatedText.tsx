import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Character({ char, progress, range }: CharacterProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block whitespace-pre" aria-hidden="true">
      {/* Invisible placeholder keeps the layout; the animated copy overlays it. */}
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

interface AnimatedTextProps {
  text: string;
  className?: string;
}

/**
 * Character-by-character scroll-reveal: each character fades from 0.2 to 1
 * based on the paragraph's scroll progress (offset ['start 0.8', 'end 0.2']).
 * Characters are grouped into word wrappers so lines only break between words.
 */
export default function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const total = Array.from(text).length;
  const words = text.split(' ');
  let charIndex = 0;

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-pre" aria-hidden="true">
          {Array.from(word).map((char) => {
            const index = charIndex++;
            return (
              <Character
                key={index}
                char={char}
                progress={scrollYProgress}
                range={[index / total, (index + 1) / total]}
              />
            );
          })}
          {wordIndex < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}
