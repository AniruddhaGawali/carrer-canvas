import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getYourResume } from "@/data/slider";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {};

function Features({}: Props) {
  // this is the state for the carousel current step
  const [selectStep, setSelectStep] = useState<number>(0);

  // this is the state for the carousel api
  const [api, setApi] = useState<CarouselApi>();

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

  return (
    <div className="relative mt-32 flex w-full flex-col items-center justify-center lg:h-screen">
      <h2 className="text-center text-5xl font-semibold leading-tight sm:leading-none md:text-6xl lg:text-7xl">
        Get your{" "}
        <div className="inline-block bg-gradient-to-r from-[#84fab0]  from-5% via-[#8fd3f4] to-[#ff9382] bg-clip-text text-transparent">
          Resume
        </div>{" "}
        in 3 steps
      </h2>

      <div className="container flex snap-center flex-col-reverse items-center justify-between lg:flex-row">
        <section className="flex h-full w-full flex-col justify-center lg:w-1/2">
          <ul className=" flex flex-col gap-14">
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
  );
}

export default Features;
