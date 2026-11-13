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
import GazeTrail from "@/components/GazeTrail";
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

      <div
        id="hero"
        className="relative isolate flex min-h-[85svh] w-full items-center overflow-hidden bg-primary
          bg-[radial-gradient(ellipse_at_80%_20%,color-mix(in_srgb,var(--secondary)_70%,transparent),transparent_60%),radial-gradient(ellipse_at_10%_90%,color-mix(in_srgb,var(--accent)_25%,transparent),transparent_55%)]"
      >
        <GazeTrail />
        <div className={`flex w-full flex-col-reverse items-center gap-10 py-24 md:flex-row md:justify-between ${sectionPad}`}>
          {/* Text */}
          <div className="flex max-w-2xl flex-col items-center gap-6 text-center md:items-start md:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm">
              School of Communication · The Ohio State University
            </p>
            <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-white">
              The Human Signals Lab
            </h1>
            <p className="max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Exploring how people perceive, process, and interact with
              information through eye-tracking and computational methods.
            </p>
            <div className="flex flex-col gap-4 pt-2 text-base font-medium sm:flex-row">
              <Button href="#publications" variant="light">Our Research</Button>
              <Button href="#contact" variant="ghost">Contact Us</Button>
            </div>
          </div>
          {/* Logo */}
          <Image
            className="h-auto w-32 shrink-0 drop-shadow-[0_0_40px_color-mix(in_srgb,var(--accent)_45%,transparent)] sm:w-40 md:w-[22%] md:max-w-xs"
            src={imagePath("/logo.svg")}
            alt="The Human Signals Lab logo"
            width={50}
            height={50}
            preload
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
          <div className="flex max-w-2xl flex-col gap-4 text-base leading-7 sm:text-lg sm:leading-8 text-foreground">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
            </p>
          </div>
        {/* Gallery */}
        <div className="w-full pt-12">
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
          <Link className="group self-center font-medium text-primary hover:underline sm:self-end" href="/articles">
            Explore more <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
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
