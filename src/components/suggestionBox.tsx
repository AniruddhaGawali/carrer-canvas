import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  carouselClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
};

function SuggestionBox({ children, className, carouselClassName }: Props) {
  return (
    <div
      className={twMerge(
        "container mb-10 flex w-full flex-col items-start justify-start gap-3 rounded-md  bg-white p-5  text-center  text-primary md:w-[95%] md:border-2",
        className,
      )}
    >
      <h4 className="text-start text-lg font-semibold text-primary">
        Suggestions ✨
      </h4>

      <Carousel
        opts={{
          align: "start",
        }}
        className={twMerge("m-auto w-[90%] xl:w-[95%] ", carouselClassName)}
      >
        <CarouselContent>{children}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default SuggestionBox;
