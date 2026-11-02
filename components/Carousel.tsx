'use client';

import Image from 'next/image';
import * as motion from 'motion/react-client';
import { imagePath } from '@/lib/paths';

const images = [
  '/gallery/images-1.jpeg',
  '/gallery/images-2.jpeg',
  '/gallery/images-3.jpeg',
  '/gallery/images-4.jpg',
];

const duplicatedImages = [...images, ...images]

export default function Carousel() {
    return (
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            className="flex w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              ease: 'linear',
              duration: 10,
              repeat: Infinity,
            }}
          >
            {[0, 1].map((group) => (
              <div key={group} className="flex shrink-0 gap-4 pr-4">
                {images.map((src, index) => (
                  <div
                    key={`${group}-${index}`}
                    className="flex size-56 shrink-0 items-center justify-center overflow-hidden"
                  >
                    <Image
                      src={imagePath(src)}
                      alt="Gallery image"
                      width={600}
                      height={600}
                      preload={group === 0 && index === 0}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
    );
}
