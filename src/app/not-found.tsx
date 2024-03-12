import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <main>
      <BackgroundGradientAnimation
        containerClassName="absolute inset-0 grainy-gradient"
        gradientBackgroundStart="rgb(143, 211, 244, 0.5)"
        gradientBackgroundEnd="rgb(132, 250, 176, 0.5)"
        firstColor="32, 250, 176"
        secondColor="255, 147, 130"
        thirdColor="17, 178, 172"
        fourthColor="107, 226, 244"
        fifthColor="143, 211, 244"
        pointerColor="95, 239, 225"
      />
      <div className="relative z-10 flex h-screen flex-col items-center justify-center gap-4">
        <h1 className=" text-[10rem] font-bold leading-[6rem]">404</h1>
        <h2 className="font-lobster text-7xl font-bold">Not Found</h2>
        <Link href="/">
          <Button size="lg" className="min-w-[200px]">
            Go Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
