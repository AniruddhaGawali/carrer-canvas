"use client";

import { useState, useEffect } from "react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/pages/homepage/hero";

import UpcomingFeatures from "@/components/pages/homepage/upcoming-features";
import Features from "@/components/pages/homepage/features";
import { ArrowBigLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        <div className="fixed -right-[5rem] bottom-10 z-50 flex h-10 cursor-pointer items-center justify-center gap-3 rounded-l-md bg-primary/80  px-2 text-center text-primary-foreground transition-all duration-300 hover:right-0">
          <ChevronLeft />
          <Link href="/feedback">
            <Button
              variant="link"
              className="m-0 p-0 text-primary-foreground transition-all hover:text-secondary/90"
            >
              Feedback
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    </>
  );
}
