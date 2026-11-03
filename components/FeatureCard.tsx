'use client';

import {Article} from '@/app/types/article';
import Image from 'next/image';
import { imagePath } from '@/lib/paths';

interface FeatureCardProps {
    article: Article;
}

export default function FeatureCard({article}: FeatureCardProps) {
  return (
    <div className="w-full items-center justify-center p-4 rounded-md bg-gray-50 transition-all duration-200 hover:scale-[1.02]
            shadow-[0_0_10px_2px_color-mix(in_srgb,var(--accent)_50%,transparent)] hover:shadow-[0_0_15px_3px_color-mix(in_srgb,var(--accent)_65%,transparent)]">
      <div className="relative p-4">
        <Image
          src={imagePath(article.img)}
          alt={article.title}
          width={200}
          height={200}
          className="mx-auto h-auto w-full max-w-[200px] object-contain"
        />
      </div>
      <div className="px-4 text-primary">
        <div className="font-medium">{article.title}</div>
        <div className="font-small">{article.authors.join(", ")}</div>
      </div>
    </div>
  );
}
