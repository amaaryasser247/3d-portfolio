import { useEffect, useRef, useState, type ReactNode } from 'react';

interface MagnetProps {
  children: ReactNode;
  className?: string;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}

/**
 * Mouse-following magnetic effect. Tracks the cursor relative to the element
 * center, applies a translate3d offset divided by `strength`, and activates
 * when the cursor is within `padding` px of the element's edges.
 */
export default function Magnet({
  children,
  className,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const withinX = Math.abs(deltaX) <= rect.width / 2 + padding;
      const withinY = Math.abs(deltaY) <= rect.height / 2 + padding;
      if (withinX && withinY) {
        setActive(true);
        setOffset({ x: deltaX / strength, y: deltaY / strength });
      } else {
        setActive(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: active ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
