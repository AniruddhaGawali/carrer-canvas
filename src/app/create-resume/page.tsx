"use client";

import { Button } from "@/components/ui/button";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

function CreateResumePage({}: Props) {
  const router = useRouter();
  const [title, setTitle] = useState("");

  return (
    <div className="relative h-screen">
      <WavyBackground
        className="grainy-white absolute inset-0"
        backgroundFill="white"
        blur={10}
        colors={["#84FAB0", "#46D7B3", "#46D7B3", "#8FD3F4", "#6BE2F4"]}
      />
      <div className="absolute left-1/2 top-1/2 z-10  w-1/3 -translate-x-1/2 -translate-y-1/2">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submit");
            // router.push("create-resume/select-template");
          }}
          className="flex w-full flex-col items-center gap-5"
        >
          <input
            type="text"
            name="title"
            placeholder="Enter Your Title of Resume"
            className="w-full border-b-2 border-primary bg-transparent p-5 pb-2  text-2xl outline-none"
          />
          <Button
            onClick={() => {
              router.push("create-resume/select-template");
            }}
            size={"lg"}
            type="submit"
          >
            Create Resume
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateResumePage;
