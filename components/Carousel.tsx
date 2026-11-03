'use client';

import Image from 'next/image';
import { imagePath } from '@/lib/paths';

const images = [
  '/gallery/images-1.jpeg',
  '/gallery/images-2.jpeg',
  '/gallery/images-3.jpeg',
  '/gallery/images-4.jpg',
];

// Each set must be wider than the widest screen, or the end of the loop shows a blank gap.
// 4 images × 240px ≈ 960px, so repeating 3× gives ~2880px per set.
const REPEATS = 3;
const strip = Array.from({ length: REPEATS }, () => images).flat();

export default function Carousel() {
    return (
        // Max width = one set (12 images × 240px), so the loop never shows a gap, even on huge screens or when zoomed out.
        <div className="group relative mx-auto w-full max-w-[2880px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          {/* Two identical image sets; sliding by -50% lands exactly on the start of the second set, so the loop is seamless.
              A CSS animation runs off the main thread, so it stays smooth while the page is busy. */}
          <div className="flex w-max animate-marquee will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[0, 1].map((group) => (
              <div key={group} className="flex shrink-0 gap-4 pr-4" aria-hidden={group === 1}>
                {strip.map((src, index) => (
                  <div
                    key={`${group}-${index}`}
                    className="flex size-56 shrink-0 items-center justify-center overflow-hidden"
                  >
                    <Image
                      src={imagePath(src)}
                      alt={group === 0 && index < images.length ? 'Gallery image' : ''}
                      width={500}
                      height={375}
                      loading="eager"
                      draggable={false}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
    );
}
