import React, { useRef, useState } from "react";
import useMousePosition from "@/hooks/useMousePosition";

import { Button } from "../../ui/button";
import { ArrowRight, ChevronsDown, NotepadTextDashed } from "lucide-react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { BackgroundGradientAnimation } from "../../ui/background-gradient-animation";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  enterNoState: {
    enterOn: number;
    setEnterOn: React.Dispatch<React.SetStateAction<number>>;
  };
};

function HeroSection({ enterNoState }: Props) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const cursor = useMousePosition();
  const { data: session } = useSession();
  const router = useRouter();

  const tl = useRef<gsap.core.Timeline>();

  useGSAP(() => {
    tl.current = gsap
      .timeline({ delay: 0.5 })
      .from(mainRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.5,
      })
      .from(aboutRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.5,
      });
  });

  return (
    <div
      className="relative flex
 w-full snap-center flex-col items-start sm:h-screen lg:items-center"
      onMouseEnter={() => enterNoState.setEnterOn(0)}
    >
      <BackgroundGradientAnimation
        containerClassName="absolute w-full inset-0 grainy-gradient"
        gradientBackgroundStart="rgb(143, 211, 244, 0.5)"
        gradientBackgroundEnd="rgb(132, 250, 176, 0.5)"
        firstColor="32, 250, 176"
        secondColor="255, 147, 130"
        thirdColor="17, 178, 172"
        fourthColor="107, 226, 244"
        fifthColor="143, 211, 244"
        pointerColor="95, 239, 225"
      />
      <div
        className={`${
          enterNoState.enterOn !== 0 || remove ? "hidden" : "hidden md:block"
        } /*  opacity: 0; */ font-size:  2rem;     position: absolute; top: 66%;
        left: 12%;
        transform: translate(-50%,
        -50%); z-index:
        -1; pointer-events-none
        absolute z-50 rounded-full
        bg-[rgb(255,255,255,.8)] transition-[width,height]
    `}
        ref={cursorRef}
        style={{
          width: isHover ? "100px" : "0px",
          height: isHover ? "100px" : "0px",
          mixBlendMode: isHover ? "difference" : "normal",
          top: isHover
            ? cursor.clientY + window.scrollY
            : cursor.clientY + window.scrollY + 20,
          left: isHover ? cursor.clientX : cursor.clientX,
          transform: "translate(-50%,-50%)",
        }}
      />

      <section
        className="left-[3%] top-[13%] mt-32 p-10 lg:absolute lg:mt-0"
        ref={mainRef}
      >
        <h3 className="subtitle text-xl font-medium sm:text-2xl md:pl-6 md:text-3xl">
          Craft. Create. Captivate.
          <br />
          Elevate Yourself with
        </h3>
        <h1
          className="relative font-lobster text-6xl font-medium sm:text-7xl md:text-8xl lg:text-[8.5rem]"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <span>Career Canves</span>
          <span className="ester-egg">🤫</span>
          <span className="ester-egg2">👻</span>
        </h1>
        <Button
          className="group mt-5 flex h-14 w-[12rem] justify-between px-8 text-lg font-medium transition-all duration-100 hover:w-[12.5rem]"
          onMouseEnter={() => setRemove(true)}
          onMouseLeave={() => setRemove(false)}
          onClick={() => {
            if (session) {
              router.push("/dashboard");
            } else {
              router.push("/register");
            }
          }}
        >
          <span>Get Started</span> <ArrowRight className="animate-in-out" />
        </Button>
      </section>

      <section
        className="bottom-10 right-0  flex w-full flex-col items-start gap-8 p-10 px-10 lg:absolute  lg:w-3/5 lg:items-end lg:p-0 lg:pr-10 xl:w-1/3"
        ref={aboutRef}
      >
        <p className="text-base !leading-relaxed sm:text-lg sm:!leading-[2rem] lg:text-right">
          Welcome to Carrier Canvas – Your Gateway to Professional Success!
          Unleash your potential with our user-friendly resume-making platform.
          Craft captivating resumes effortlessly, showcasing your skills and
          achievements. Elevate your career prospects and make a lasting
          impression on employers. Join Carrier Canvas and embark on a journey
          towards your dream career today!
        </p>
        <Button
          className="flex w-fit gap-2 font-medium lg:px-10 lg:py-[1.6rem] lg:text-lg"
          onMouseEnter={() => setRemove(true)}
          onMouseLeave={() => setRemove(false)}
          onClick={() => {
            if (session) {
              router.push("/dashboard");
            } else {
              router.push("/register");
            }
          }}
        >
          <span> Create Your Resume</span>
          <NotepadTextDashed />
        </Button>
      </section>
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 cursor-pointer sm:flex">
        <ChevronsDown
          className="h-8 w-8 animate-bounce"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight + 80,
              behavior: "smooth",
            });
          }}
        />
      </div>
    </div>
  );
}

export default HeroSection;
