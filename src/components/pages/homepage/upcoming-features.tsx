import React from "react";
import { BackgroundGradientAnimation } from "../../ui/background-gradient-animation";
import { BackgroundGradient } from "../../ui/background-gradient";
import { Button } from "../../ui/button";
import Image from "next/image";

type Props = {};

function UpcomingFeatures({}: Props) {
  return (
    <>
      {" "}
      <div className="mb-20 mt-32 flex min-h-screen w-full flex-col items-center justify-center sm:mt-0">
        <h2 className="text-center text-5xl font-semibold leading-tight sm:leading-none md:text-6xl lg:text-7xl">
          Upcoming{" "}
          <div className="inline-block bg-gradient-to-r from-[#84fab0] from-5% via-[#8fd3f4] to-[#ff9382] bg-clip-text text-transparent">
            Features
          </div>
        </h2>
        <div className="mt-32 h-full w-full">
          <section className="container grid gap-5 sm:grid-cols-3 md:w-[85%] lg:w-[75%] xl:w-[60%] 2xl:w-1/2">
            <div className="h-[230px] w-full rounded-md">
              <BackgroundGradient
                containerClassName="w-full h-full rounded-xl"
                className="flex h-full flex-col items-center justify-center gap-5 rounded-md bg-white p-4"
              >
                <span className="text-center text-5xl font-semibold">AI</span>
                <Button className="grainy-gradient2 flex items-center justify-center gap-2 border-2 border-transparent p-6 text-2xl text-primary hover:border-black hover:bg-white">
                  <span>Generate </span>
                  <Image
                    src="images/spark.svg"
                    alt="spark"
                    width={25}
                    height={25}
                  />
                </Button>
                <p className="text-center text-xs font-normal">
                  Making it more better and faster
                </p>
              </BackgroundGradient>
            </div>
            <div className="h-[230px] w-full rounded-lg bg-primary px-10 py-8 text-primary-foreground sm:col-span-2">
              <h4 className="text-left text-2xl font-medium">
                Resume Applied Management
              </h4>
              <ul className="mt-5 flex list-inside list-disc flex-col gap-1 text-base font-light">
                <li>Track your resume</li>
                <li>
                  Get keep track when your resume is viewed, shortlisted and
                  rejected
                </li>
                <li>Get suggestions on how to improve your resume</li>
              </ul>
            </div>
            <div className="h-[230px] w-full rounded-lg border-[3px] border-black px-10 py-8 sm:col-span-2">
              <h4 className="text-left text-2xl font-medium">
                New Resume Templetes
              </h4>
              <ul className="mt-5 flex list-inside list-disc flex-col gap-1 text-base font-light">
                <li>More Classic Templetes</li>
                <li>Google Docs Templetes</li>
                <li>
                  More templetes for different industries like IT, Marketing,
                  Sales
                </li>
              </ul>
            </div>
            <div
              className="flex h-[230px] w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-[#FFDD00]  shadow-[0px_0px_30px_0px_#FFDD00] transition-all duration-500 hover:shadow-[0px_0px_30px_5px_#FFDD00]"
              onClick={() => window.open("https://www.buymeacoffee.com/akg007")}
            >
              <Image
                alt="Buy me a coffee"
                src="https://media.giphy.com/media/TDQOtnWgsBx99cNoyH/giphy.gif"
                width={130}
                height={130}
              />
              <span className="font-lobster text-3xl font-semibold">
                Buy me a coffee
              </span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default UpcomingFeatures;
