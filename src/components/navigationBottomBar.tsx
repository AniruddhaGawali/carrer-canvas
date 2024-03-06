"use client";

import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useRouter } from "next/navigation";
import { StepsLinks } from "@/data/resume-step";
import useResume from "@/redux/dispatch/useResume";

type Props = {
  currentStep: number;
};

function BottonNavigationBar({ currentStep }: Props) {
  const router = useRouter();
  const { resumeState } = useResume();

  function prevStep(currentStep: number) {
    return StepsLinks[currentStep - 1].path + `?id=${resumeState.id}`;
  }

  async function nextStep(currentStep: number) {
    if (await StepsLinks[currentStep].validation(resumeState)) {
      return StepsLinks[currentStep + 1].path + `?id=${resumeState.id}`;
    }
    return "";
  }

  return (
    <div className="sticky bottom-5 left-[50%] mb-5 flex w-[95%] translate-x-[-2.5%] items-center justify-between gap-2  rounded-lg border-2 bg-[rgba(255,255,255,0.5)] px-2 py-3 text-center backdrop-blur-sm sm:px-14">
      <Button
        className="flex gap-3"
        disabled={currentStep == 0}
        onClick={() => router.push(prevStep(currentStep))}
      >
        <ChevronLeft />
        Prev
      </Button>

      <span>
        {currentStep + 1}/{StepsLinks.length}
        <span className="mx-2">|</span>
        {StepsLinks[currentStep].name}
      </span>

      <Button
        className="flex gap-3"
        disabled={currentStep == StepsLinks.length - 1}
        onClick={async () => router.push(await nextStep(currentStep))}
      >
        Next
        <ChevronRight />
      </Button>
    </div>
  );
}

export default BottonNavigationBar;
