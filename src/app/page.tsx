'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import { getYourResume } from '@/data/step';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { type CarouselApi } from '@/components/ui/carousel';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Home() {
  // this is the state for the carousel current step
  const [selectStep, setSelectStep] = useState<number>(0);

  // this is the state for the carousel api
  const [api, setApi] = useState<CarouselApi>();

  // this is the state for the steps animation
  const stepParentRef = useRef<HTMLUListElement>(null);

  //this is the state for the hiding mouse while on button and links
  const [enterOn, setEnterOn] = useState<number>(0);

  //* this is the state for the scroll snap of thenavbar this make navbar show its background on scroll only
  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
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
          start: 'top 80%',
          trigger: stepParentRef.current,
        },
      }
    );
  });

  return (
    <>
      <main className="relative  w-full">
        <Navbar />
        <HeroSection enterNoState={{ enterOn, setEnterOn }} />

        <div
          className="container flex snap-center flex-col-reverse items-center justify-between lg:h-screen lg:flex-row"
          onMouseEnter={() => setEnterOn(1)}>
          <section className="flex h-full w-full flex-col justify-center lg:w-1/2">
            <h2 className="text-3xl font-medium lg:text-5xl ">
              Get your resume in 3 steps
            </h2>

            <ul className="mt-20 flex flex-col gap-14" ref={stepParentRef}>
              {getYourResume.map((step, index) => (
                <li
                  className={`steps flex cursor-pointer items-center  gap-5 rounded-md p-3 transition-all `}
                  key={index}
                  onMouseOver={() => setSelectStep(index)}>
                  <div className="grid h-[35px] w-[35px] items-center rounded-full bg-foreground text-center text-xl text-background md:h-[50px] md:w-[50px] md:text-2xl">
                    {step.stepNo}
                  </div>

                  <div className="flex  flex-col gap-4 overflow-hidden transition-all duration-500">
                    <span
                      className={`text-xl font-normal lg:text-3xl ${
                        selectStep === index && 'underline underline-offset-4'
                      }`}>
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
        <Footer />
      </main>
    </>
  );
}
