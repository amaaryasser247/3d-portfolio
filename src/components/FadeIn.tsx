import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const MotionDiv = motion.create('div');

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

/** Scroll-into-view fade/slide wrapper (fires once). */
export default function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) {
  return (
    <MotionDiv
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionDiv>
  );
}
