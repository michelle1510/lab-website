import type { Metadata } from "next";
import Link from "next/link";
import ArticleList from "@/components/ArticleList";
import articlesData from "@/data/articles.json";
import type { Article } from "@/app/types/article";

export const metadata: Metadata = {
  title: "Articles · The Human Signals Lab",
  description: "Publications and articles from The Human Signals Lab.",
};

const articles: Article[] = articlesData;

export default function ArticlesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="w-full bg-primary bg-[radial-gradient(ellipse_at_80%_20%,color-mix(in_srgb,var(--secondary)_70%,transparent),transparent_60%)] px-6 py-12 sm:px-10 sm:py-16 lg:px-20">
        <Link
          href="/#publications"
          className="group inline-flex items-center gap-1 text-sm font-medium text-accent transition-all hover:[text-shadow:0_0_5px_#D4C2FC,0_0_15px_#D4C2FC]"
        >
          <span aria-hidden="true" className="inline-block transition-transform group-hover:-translate-x-1">←</span>
          Back to home
        </Link>
        <h1 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight text-white">
          Articles
        </h1>
        <p className="mt-3 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
          Browse our publications. Pick one or more keywords to narrow the list.
        </p>
      </header>

      <main className="flex w-full flex-1 flex-col px-6 py-12 sm:px-10 sm:py-16 lg:px-20">
        <ArticleList articles={articles} />
      </main>

      <footer className="h-[20vh] min-h-[120px] w-full bg-primary" />
    </div>
  );
}
