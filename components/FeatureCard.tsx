'use client';

import {Article} from '@/app/types/article';
import Image from 'next/image';
import { imagePath } from '@/lib/paths';
import { formatDate } from '@/lib/date';

interface FeatureCardProps {
    article: Article;
}

export default function FeatureCard({article}: FeatureCardProps) {
  const date = formatDate(article.date);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-accent/20">
        <Image
          src={imagePath(article.img)}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <ul className="flex flex-wrap gap-2" aria-label="Themes">
          {article.themes.map((theme) => (
            <li
              key={theme}
              className="rounded-full bg-accent/40 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {theme}
            </li>
          ))}
        </ul>
        <h4 className="text-lg font-semibold leading-snug text-primary">{article.title}</h4>
        <p className="text-sm text-foreground/70">{article.authors.join(", ")}</p>
        <time
          dateTime={date.iso}
          className="mt-auto pt-2 text-xs font-medium uppercase tracking-wider text-foreground/50"
        >
          {date.label}
        </time>
      </div>
    </article>
  );
}
