import { useEffect, useRef, useState, type ReactNode } from 'react';

interface MagnetProps {
  children: ReactNode;
  className?: string;
  padding?: number;
  strength?: number;
  /** Max px the portrait can follow a touch drag on mobile. */
  touchMaxOffset?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}

/**
 * Magnetic hero portrait.
 * — Desktop (fine pointer): follows the cursor within `padding` and eases back.
 * — Touch devices: drag anywhere on the screen and it follows your finger
 *    (1:1, clamped to `touchMaxOffset`), then springs back on release.
 */
export default function Magnet({
  children,
  className,
  padding = 150,
  strength = 3,
  touchMaxOffset = 110,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Desktop: mouse-following magnet.
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

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

  // Touch: drag to move the portrait with the finger.
  useEffect(() => {
    if (!window.matchMedia('(pointer: coarse)').matches) return;

    let start: { x: number; y: number } | null = null;
    const clamp = (value: number) =>
      Math.max(-touchMaxOffset, Math.min(touchMaxOffset, value));

    const reset = () => {
      start = null;
      setDragging(false);
      setActive(false);
      setOffset({ x: 0, y: 0 });
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      const node = ref.current;
      if (!touch || !node) return;

      // Only react while the hero portrait is on screen and the drag starts
      // on the portrait itself (with a little breathing room).
      const rect = node.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const margin = 24;
      const onPortrait =
        touch.clientX >= rect.left - margin &&
        touch.clientX <= rect.right + margin &&
        touch.clientY >= rect.top - margin &&
        touch.clientY <= rect.bottom + margin;
      if (!onPortrait) return;

      start = { x: touch.clientX, y: touch.clientY };
      setDragging(true);
      setActive(true);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!start) return;
      const touch = event.touches[0];
      if (!touch) return;
      setOffset({
        x: clamp(touch.clientX - start.x),
        y: clamp(touch.clientY - start.y),
      });
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', reset, { passive: true });
    window.addEventListener('touchcancel', reset, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', reset);
      window.removeEventListener('touchcancel', reset);
    };
  }, [touchMaxOffset]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: dragging
          ? 'transform 0.05s linear'
          : active
            ? activeTransition
            : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
