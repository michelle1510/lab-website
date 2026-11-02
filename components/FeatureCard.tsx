'use client';

import {Article} from '@/app/types/article';
import Image from 'next/image';
import { imagePath } from '@/lib/paths';

interface FeatureCardProps {
    article: Article;
}

export default function FeatureCard({article}: FeatureCardProps) {
  return (
    <div className="items-center justify-center p-4 rounded-md bg-gray-50 transition-all duration-200 hover:scale-[1.02]
            shadow-[0_0_10px_2px_color-mix(in_srgb,var(--accent)_50%,transparent)] hover:shadow-[0_0_15px_3px_color-mix(in_srgb,var(--accent)_65%,transparent)]">
      <div className="relative p-4">
        <Image
          src={imagePath(article.img)}
          alt={article.title}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>
      <div className="px-4 bg-linear-to-r from-primary to-white bg-clip-text text-transparent">
        <div className="font-medium">{article.title}</div>
        <div className="font-small">{article.authors.join(", ")}</div>
      </div>
    </div>
  );
}
