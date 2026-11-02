// Run npm run then
// go to localhost:3000/component-test

import ProfileCard from "@/components/ProfileCard";
import profileData from "@/data/profiles.json";
import type { Profile } from "@/app/types/profile";


// import articlesData from "@/data/articles.json";
// import type { Article } from "@/app/types/article";

// const articles: Article[] = articlesData;

const profiles: Profile[] = profileData;

export default function ComponentPreview() {
  return (
    <main className="flex min-h-screen flex-wrap items-center justify-center gap-4 p-8">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </main>
  );
}