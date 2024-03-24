"use client";

import { useState, useEffect } from "react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/pages/homepage/hero";

import UpcomingFeatures from "@/components/pages/homepage/upcoming-features";
import Features from "@/components/pages/homepage/features";

export default function Home() {
  const [loadPage, setLoadPage] = useState<boolean>(false);

  const [enterOn, setEnterOn] = useState<number>(0);
  //this is the state for the hiding mouse while on button and links

  useEffect(() => {
    if (!loadPage && typeof window !== "undefined") {
      return setLoadPage(true);
    }
  });

  if (!loadPage) return null;

  return (
    <>
      <main className="relative w-full">
        <Navbar />
        <HeroSection enterNoState={{ enterOn, setEnterOn }} />
        <Features />
        <UpcomingFeatures />
        <Footer />
      </main>
    </>
  );
}
