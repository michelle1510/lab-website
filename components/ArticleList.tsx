'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { Article } from '@/app/types/article';
import { imagePath } from '@/lib/paths';
import { formatDate } from '@/lib/date';

interface ArticleListProps {
  articles: Article[];
}

// MM/DD/YYYY -> sortable number (YYYYMMDD).
function sortKey(date: string) {
  const [m, d, y] = date.split('/').map(Number);
  return (y || 0) * 10000 + (m || 0) * 100 + (d || 0);
}

export default function ArticleList({ articles }: ArticleListProps) {
  const [selected, setSelected] = useState<string[]>([]);

  // Every theme used by at least one article, alphabetized.
  const keywords = useMemo(
    () => [...new Set(articles.flatMap((a) => a.themes))].sort((a, b) => a.localeCompare(b)),
    [articles],
  );

  // Newest first; an article shows if it has any of the selected keywords.
  const visible = useMemo(() => {
    const sorted = [...articles].sort((a, b) => sortKey(b.date) - sortKey(a.date));
    if (selected.length === 0) return sorted;
    return sorted.filter((a) => a.themes.some((t) => selected.includes(t)));
  }, [articles, selected]);

  const toggle = (keyword: string) =>
    setSelected((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword],
    );

  const chipBase =
    'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2';
  const chipOn = 'border-primary bg-primary text-white';
  const chipOff = 'border-primary/20 bg-white text-primary hover:bg-accent/40';

  return (
    <div className="flex w-full flex-col gap-10">
      {/* Keyword filters */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-foreground/60">
          Filter by keyword
        </h2>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles by keyword">
          <button
            type="button"
            onClick={() => setSelected([])}
            aria-pressed={selected.length === 0}
            className={`${chipBase} ${selected.length === 0 ? chipOn : chipOff}`}
          >
            All
          </button>
          {keywords.map((keyword) => {
            const on = selected.includes(keyword);
            return (
              <button
                key={keyword}
                type="button"
                onClick={() => toggle(keyword)}
                aria-pressed={on}
                className={`${chipBase} ${on ? chipOn : chipOff}`}
              >
                {keyword}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-foreground/60" aria-live="polite">
          Showing {visible.length} of {articles.length} articles
        </p>
      </div>

      {/* Article list */}
      {visible.length === 0 ? (
        <p className="py-12 text-center text-foreground/60">No articles match these keywords.</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {visible.map((article) => {
            const date = formatDate(article.date);
            return (
              <li key={article.id}>
                <article className="group flex flex-row overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <div className="relative w-28 shrink-0 overflow-hidden bg-accent/20 sm:w-56 lg:w-72">
                    <Image
                      src={imagePath(article.img)}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 18rem, (min-width: 640px) 14rem, 7rem"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex min-h-36 flex-1 flex-col gap-2 p-4 sm:min-h-44 sm:gap-3 sm:p-6">
                    <ul className="flex flex-wrap gap-2" aria-label="Themes">
                      {article.themes.map((theme) => (
                        <li
                          key={theme}
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium text-primary ${
                            selected.includes(theme) ? 'bg-accent' : 'bg-accent/40'
                          }`}
                        >
                          {theme}
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-lg font-semibold leading-snug text-primary sm:text-xl">
                      {article.title}
                    </h3>
                    <p className="text-sm text-foreground/70">{article.authors.join(', ')}</p>
                    <time
                      dateTime={date.iso}
                      className="mt-auto pt-2 text-xs font-medium uppercase tracking-wider text-foreground/50"
                    >
                      {date.label}
                    </time>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
