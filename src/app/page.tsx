"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { getYourResume } from "@/data/slider";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { type CarouselApi } from "@/components/ui/carousel";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { set } from "date-fns";

export default function Home() {
  const [loadPage, setLoadPage] = useState<boolean>(false);
  // this is the state for the carousel current step
  const [selectStep, setSelectStep] = useState<number>(0);

  // this is the state for the carousel api
  const [api, setApi] = useState<CarouselApi>();

  // this is the state for the steps animation
  const stepParentRef = useRef<HTMLUListElement>(null);

  const [enterOn, setEnterOn] = useState<number>(0);
  //this is the state for the hiding mouse while on button and links

  //* this is the state for the scroll snap of thenavbar this make navbar show its background on scroll only
  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setSelectStep(api.selectedScrollSnap());
    });
    api.scrollTo(selectStep);
  }, [selectStep, api]);

  // this gsap  hook animates the steps
  useGSAP(() => {
    gsap.from(
      stepParentRef.current,

      {
        y: 100,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          start: "top 80%",
          trigger: stepParentRef.current,
        },
      },
    );
  });

  useEffect(() => {
    if (!loadPage && typeof window !== "undefined") {
      return setLoadPage(true);
    }
  });

  if (!loadPage) return null;

  return (
    <>
      <main className="relative  w-full">
        <Navbar />
        <HeroSection enterNoState={{ enterOn, setEnterOn }} />

        <div className="relative lg:h-screen">
          <h2 className="mt-20 text-center text-3xl font-semibold  lg:text-7xl">
            Get your{" "}
            <div className="from-5%% inline-block bg-gradient-to-r  from-[#84fab0] via-[#8fd3f4] to-[#ff9382] bg-clip-text text-transparent">
              Resume
            </div>{" "}
            in 3 steps
          </h2>

          <div
            className="container flex snap-center flex-col-reverse items-center justify-between lg:flex-row"
            onMouseEnter={() => setEnterOn(1)}
          >
            <section className="flex h-full w-full flex-col justify-center lg:w-1/2">
              <ul className=" flex flex-col gap-14" ref={stepParentRef}>
                {getYourResume.map((step, index) => (
                  <li
                    className={`steps flex cursor-pointer items-center  gap-5 rounded-md p-3 transition-all `}
                    key={index}
                    onMouseOver={() => setSelectStep(index)}
                  >
                    <div className="grid h-[35px] w-[35px] items-center rounded-full bg-foreground text-center text-xl text-background md:h-[50px] md:w-[50px] md:text-2xl">
                      {step.stepNo}
                    </div>

                    <div className="flex  flex-col gap-4 overflow-hidden transition-all duration-500">
                      <span
                        className={`text-xl font-normal lg:text-3xl ${
                          selectStep === index && "underline underline-offset-4"
                        }`}
                      >
                        {step.title}
                      </span>

                      <span>
                        {selectStep === index && getYourResume[selectStep].desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="w-full min-w-[400px] max-w-[60%] p-20 lg:ml-10 lg:w-1/2">
              <Carousel setApi={setApi}>
                <CarouselContent>
                  {getYourResume.map((step, index) => (
                    <CarouselItem key={index}>
                      <Image
                        src={step.image}
                        alt={step.title}
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="grainy-gradient h-auto w-full rounded-lg bg-blend-multiply shadow-xl"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </section>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
