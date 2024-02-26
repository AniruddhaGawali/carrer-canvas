"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useRouter } from "next/navigation";
import useResume from "@/redux/dispatch/useResume";

type Props = {};

function CreateResumePage({}: Props) {
  const router = useRouter();
  const { setResumeTitle } = useResume();

  return (
    <div className="relative h-screen">
      <WavyBackground
        className="grainy-white absolute inset-0"
        backgroundFill="white"
        blur={5}
        colors={["#84FAB0", "#46D7B3", "#46D7B3", "#8FD3F4", "#6BE2F4"]}
        speed="fast"
      />

      <div className="absolute left-1/2 top-1/2 z-10  w-1/3 -translate-x-1/2 -translate-y-1/2">
        <form
          action={(formData: FormData) => {
            const title = formData.get("title");
            if (typeof title === "string" && title.length > 0) {
              setResumeTitle(title);
              router.push("create-resume/select-template");
            }
          }}
          className="flex w-full flex-col items-center gap-5"
        >
          <input
            type="text"
            name="title"
            placeholder="Enter Your Title of Resume"
            className="w-full border-b-2 border-primary bg-transparent p-5 pb-2  text-2xl outline-none"
          />
          <Button size={"lg"} type="submit" className="text-lg">
            Create Resume
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateResumePage;
