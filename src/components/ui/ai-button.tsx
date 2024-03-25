"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./button";
import { twMerge } from "tailwind-merge";
import { generateText } from "@/actions";

type Props = {
  className?: React.ButtonHTMLAttributes<HTMLButtonElement>["className"];
  prompt: string;
  onClick: () => void;
  setText: (text: string) => void;
};

function AIButton({ className, prompt, onClick, setText }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <Button
      className={twMerge(
        "flex h-8 w-8 items-center justify-center p-[5px] text-primary ",
        className,
      )}
      variant={"default"}
      type="button"
      onClick={async () => {
        onClick();
        setIsLoading(true);
        const text = await generateText(prompt);
        setText(text);
        setIsLoading(false);
      }}
    >
      <Image
        src="/images/spark_color.svg"
        alt="AI"
        width={200}
        height={20}
        style={{
          fill: "#fff",
          marginBottom: "-3px",
        }}
        className={isLoading ? "animate-pulse" : ""}
      />
    </Button>
  );
}

export default AIButton;
