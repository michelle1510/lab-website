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

const articles: Article[] = articlesData;
const profiles: Profile[] = profileData;

export default function Home() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-background">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="min-h-screen w-full">
      {/* Navigation */}
      <div id="hero" className="relative flex h-[clamp(400px,50vh,720px)] w-full justify-center bg-primary">
        <aside 
          className={`fixed left-0 top-0 z-40 w-56 transition-transform duration-300 ease-in-out ${
          navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar/>
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="absolute right-5 top-2 z-50 text-accent text-accent transition-all hover:[text-shadow:0_0_5px_#D4C2FC,0_0_15px_#D4C2FC]">
            x
          </button>
        </aside>
        <button 
          onClick={() => setNavOpen(!navOpen)}
          className="absolute left-5 top-2 z-50 text-accent">
            {!navOpen && <span className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl transition-all hover:[text-shadow:0_0_5px_#D4C2FC,0_0_15px_#D4C2FC]">
            &#9776;
            </span>}
        </button>
        {/* Title */}
        <div className={`flex w-full min-h-[50vh] items-center justify-between gap-4 transition-all duration-300 ease-in-out ${
          navOpen
            ? "pl-[16.5rem] pr-10 sm:pl-[16.5rem] sm:pr-10 lg:pl-[19rem] lg:pr-20"
            : "px-10 sm:px-10 lg:px-20"
        }`}>
          <h1 className="text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-white">
            The Human Signals Lab
          </h1>
          {/* Image */}
            <Image
              className="h-auto w-[20%] max-w-sm object-fit"
              src="/logo.svg"
              alt="Nav graphic"
              width={50}
              height={50}
            />
        </div>
      </div>

      {/* Main content */}
      <main className="flex w-full flex-1 flex-col items-center bg-background">
        {/* About */}
        <div id="about" className={`flex flex-col w-full gap-6 py-30 text-center sm:items-start sm:text-left pl-16 transition-all duration-300 ease-in-out sm:items-start ${
        navOpen
          ? "px-4 pl-[15rem] sm:px-8 sm:pl-[16rem] lg:px-16 lg:pl-[18rem]"
          : "px-0"
        }`}>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-primary">
            About
          </h2>
          <p className="max-w-xl text-lg leading-8 text-foreground">
            Exploring how people perceive, process, and interact with
            information through eye-tracking and computational methods.
          </p>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <Button href="">Our Research</Button>
            <Button href="" variant="secondary">Contact Us</Button>
          </div>
        {/* Gallery */}
        <div className="w-full pt-50">
          <Carousel/>
        </div>
        </div>
        {/* Publications */}
        <div id="publications" className={`flex flex-col w-full py-30 pl-16 gap-6 text-center sm:items-start sm:text-left transition-all duration-300 ease-in-out sm:items-start ${
          navOpen
            ? "px-4 pl-[15rem] sm:px-8 sm:pl-[16rem] lg:px-16 lg:pl-[18rem]"
            : "px-0"
          }`}>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-primary">
            Publications
          </h2>
          <p className="max-w-xl text-lg leading-8 text-foreground">
            Our research spans machine-learning, politics, etc
          </p>
          <h1 className="text-xl text-primary">
            Featured
          </h1>
          <div className="flex w-full flex-wrap items-center gap-4">
            <FeatureCard article={articlesData[0]}/>
            <FeatureCard article={articlesData[1]}/>
            <FeatureCard article={articlesData[2]}/>
            <Link className="ml-4 self-end hover:underline" href="#publications">Explore more {'>'}</Link>
          </div>
        </div>
        {/* People */}
        <div id="people" className={`flex flex-col w-full py-30 pl-16 gap-6 text-center sm:items-start sm:text-left transition-all duration-300 ease-in-out sm:items-start ${
          navOpen
            ? "px-4 pl-[15rem] sm:px-8 sm:pl-[16rem] lg:px-16 lg:pl-[18rem]"
            : "px-0"
          }`}>
          <h2 className="max-w-2xl text-3xl font-semibold pb-4 leading-tight tracking-tight text-primary">
            People
          </h2>
          <div className="flex w-full flex-wrap items-center gap-2">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
        {/* Contact */}
        <div id="contact" className={`flex flex-col w-full py-30 pl-16 gap-6 text-center sm:items-start sm:text-left transition-all duration-300 ease-in-out sm:items-start ${
          navOpen
            ? "px-4 pl-[15rem] sm:px-8 sm:pl-[16rem] lg:px-16 lg:pl-[18rem]"
            : "px-0"
          }`}>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-primary">
            Contact
          </h2>
        </div>
      </main>

      {/* Footer */}
      <div className="relative flex min-h-[200px] h-[30vh] w-full justify-center bg-primary">
      </div>
      </div>
    </div>
  );
}
