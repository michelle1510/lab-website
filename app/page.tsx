"use client";

import Image from "next/image";
import Sidebar from '@/components/Sidebar';
import {useState} from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import FeatureCard from "@/components/FeatureCard";
import ProfileCard from "@/components/ProfileCard";
import articlesData from "@/data/articles.json";
import profileData from "@/data/profiles.json";
import type { Article } from "@/app/types/article";
import type { Profile } from "@/app/types/profile";
import Carousel from "@/components/Carousel";
import { imagePath } from "@/lib/paths";

const articles: Article[] = articlesData;
const profiles: Profile[] = profileData;

export default function Home() {
  const [navOpen, setNavOpen] = useState(false)

  // On phones the sidebar slides over the page; from md up it pushes content aside.
  const sectionPad = `px-6 sm:px-10 lg:px-20 transition-all duration-300 ease-in-out ${
    navOpen ? "md:pl-[16rem] lg:pl-[18rem]" : ""
  }`;
  const sectionClass = `flex flex-col w-full gap-6 py-16 md:py-30 text-center sm:items-start sm:text-left ${sectionPad}`;

  // Close the menu after tapping a link, but only on small screens.
  const closeOnMobile = () => {
    if (window.innerWidth < 768) setNavOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="min-h-screen w-full">
      {/* Navigation */}
      <aside
        className={`fixed left-0 top-0 z-40 w-56 transition-transform duration-300 ease-in-out ${
        navOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onNavigate={closeOnMobile}/>
        <button
          onClick={() => setNavOpen(false)}
          aria-label="Close menu"
          className="absolute right-2 top-2 z-50 flex size-11 items-center justify-center text-2xl text-accent transition-all hover:[text-shadow:0_0_5px_#D4C2FC,0_0_15px_#D4C2FC]">
          ×
        </button>
      </aside>
      {/* Dims the page behind the menu on phones; tap to close */}
      {navOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setNavOpen(false)}
          aria-hidden="true"
        />
      )}
      {!navOpen && (
        <button
          onClick={() => setNavOpen(true)}
          aria-label="Open menu"
          className="absolute left-3 top-3 z-50 flex size-11 items-center justify-center text-4xl text-accent transition-all hover:[text-shadow:0_0_5px_#D4C2FC,0_0_15px_#D4C2FC] lg:text-5xl">
          &#9776;
        </button>
      )}

      <div id="hero" className="relative flex h-[clamp(320px,50vh,720px)] w-full justify-center bg-primary">
        {/* Title */}
        <div className={`flex w-full items-center justify-between gap-4 ${sectionPad}`}>
          <h1 className="text-[clamp(1.5rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-white">
            The Human Signals Lab
          </h1>
          {/* Image */}
            <Image
              className="h-auto w-[25%] max-w-sm object-fit sm:w-[20%]"
              src={imagePath("/logo.svg")}
              alt="Nav graphic"
              width={50}
              height={50}
            />
        </div>
      </div>

      {/* Main content */}
      <main className="flex w-full flex-1 flex-col items-center bg-background">
        {/* About */}
        <div id="about" className={sectionClass}>
          <h2 className="max-w-2xl text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-primary">
            About
          </h2>
          <p className="max-w-xl text-base leading-7 sm:text-lg sm:leading-8 text-foreground">
            Exploring how people perceive, process, and interact with
            information through eye-tracking and computational methods.
          </p>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <Button href="#publications">Our Research</Button>
            <Button href="#contact" variant="secondary">Contact Us</Button>
          </div>
        {/* Gallery */}
        <div className="w-full pt-12 md:pt-50">
          <Carousel/>
        </div>
        </div>
        {/* Publications */}
        <div id="publications" className={sectionClass}>
          <h2 className="max-w-2xl text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-primary">
            Publications
          </h2>
          <p className="max-w-xl text-base leading-7 sm:text-lg sm:leading-8 text-foreground">
            Our research spans machine-learning, politics, etc
          </p>
          <h3 className="text-lg sm:text-xl text-primary">
            Featured
          </h3>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard article={articles[0]}/>
            <FeatureCard article={articles[1]}/>
            <FeatureCard article={articles[2]}/>
          </div>
          <Link className="self-center hover:underline sm:self-end" href="#publications">Explore more {'>'}</Link>
        </div>
        {/* People */}
        <div id="people" className={sectionClass}>
          <h2 className="max-w-2xl text-2xl sm:text-3xl font-semibold pb-4 leading-tight tracking-tight text-primary">
            People
          </h2>
          <div className="flex w-full flex-wrap justify-center gap-4 sm:justify-start">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
        {/* Contact */}
        <div id="contact" className={sectionClass}>
          <h2 className="max-w-2xl text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-primary">
            Contact
          </h2>
          <div className="grid w-full gap-8 text-base leading-7 sm:text-lg sm:leading-8 text-foreground md:grid-cols-[2fr_1fr] md:gap-12">
            <p className="max-w-xl">
              The Human Signals Lab is a research laboratory within the School of Communication at The Ohio State University in Columbus, OH.
            </p>
            <address className="flex flex-col gap-6 not-italic">
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-foreground/60">Location</div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=242+W+18th+Avenue+Columbus+OH+43210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary hover:underline"
                >
                  Building 046<br />
                  242 W 18th Avenue<br />
                  Columbus, OH 43210
                </a>
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-foreground/60">Email</div>
                <a href="mailto:email@osu.edu" className="hover:text-secondary hover:underline">
                  email@osu.edu
                </a>
              </div>
            </address>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="relative flex min-h-[200px] h-[30vh] w-full justify-center bg-primary">
      </div>
      </div>
    </div>
  );
}
