import { useEffect, useRef, type RefObject } from 'react';
import { marqueeImages } from '../data/portfolio';
import SmartImage from './SmartImage';

const TILE_WIDTH = 420;
const TILE_HEIGHT = 270;
const TILE_GAP = 12; // gap-3
const ROW_1_COUNT = 11;
const ROW_2_COUNT = 10;
const SET_WIDTH_1 = (TILE_WIDTH + TILE_GAP) * ROW_1_COUNT;
const SET_WIDTH_2 = (TILE_WIDTH + TILE_GAP) * ROW_2_COUNT;

/**
 * Wraps a translateX value into one set period. The rows are tripled with
 * identical sets, so any multiple of the set width looks exactly the same —
 * this guarantees content always covers the viewport without gaps.
 */
const wrap = (value: number, setWidth: number) =>
  ((value % setWidth) + setWidth) % setWidth - setWidth;

interface MarqueeRowProps {
  assets: typeof marqueeImages;
  rowRef: RefObject<HTMLDivElement>;
}

function MarqueeRow({ assets, rowRef }: MarqueeRowProps) {
  return (
    <div
      ref={rowRef}
      className="flex w-max gap-3"
      style={{ willChange: 'transform' }}
    >
      {[...assets, ...assets, ...assets].map((asset, index) => (
        <div
          key={`${asset.src}-${index}`}
          className="shrink-0 overflow-hidden rounded-2xl"
          style={{ width: TILE_WIDTH, height: TILE_HEIGHT }}
        >
          <SmartImage asset={asset} className="h-full w-full rounded-2xl object-cover" />
        </div>
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);
  const sectionTopRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const applyRow = (row: HTMLDivElement | null, x: number, setWidth: number) => {
      if (!row) return;
      row.style.transform = `translate3d(${wrap(x, setWidth)}px, 0, 0)`;
    };

    const update = () => {
      const offset = (window.scrollY - sectionTopRef.current + window.innerHeight) * 0.3;
      // Row 1 moves RIGHT, row 2 moves LEFT on scroll.
      applyRow(row1Ref.current, offset - 200, SET_WIDTH_1);
      applyRow(row2Ref.current, -(offset - 200), SET_WIDTH_2);
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    const measure = () => {
      const section = sectionRef.current;
      if (section) {
        sectionTopRef.current = section.getBoundingClientRect().top + window.scrollY;
      }
      update();
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const row1 = marqueeImages.slice(0, ROW_1_COUNT);
  const row2 = marqueeImages.slice(ROW_1_COUNT);

  return (
    <section ref={sectionRef} className="overflow-x-clip bg-[#0C0C0C] pt-24 pb-10 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <MarqueeRow assets={row1} rowRef={row1Ref} />
        <MarqueeRow assets={row2} rowRef={row2Ref} />
      </div>
    </section>
  );
}
