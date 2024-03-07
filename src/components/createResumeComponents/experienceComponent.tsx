"use client";

import React, { useEffect, useState } from "react";
import { StepsLinks as Steps } from "@/data/resume-step";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import ExperienceForm from "../forms/experienceForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {};

function Experience({}: Props) {
  const [showResume, setShowResume] = useState<boolean>(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    console.log("experiences", experiences);
  }, [experiences]);

  return (
    <div className=" my-[9rem] min-h-screen w-full">
      <div className="mb-20 flex flex-col items-center justify-center">
        <h2 className="mb-3 text-center text-3xl font-bold">{Steps[3].name}</h2>
        <p>{Steps[3].desc}</p>
      </div>

      <div className="container flex min-h-screen w-full flex-col-reverse items-center justify-center gap-5 lg:flex-row lg:items-stretch">
        <section className="relative flex w-full max-w-xl flex-col items-center justify-start rounded-lg border-2 border-primary bg-white p-5 pt-10 lg:w-1/2 lg:max-w-none ">
          <div
            className="absolute right-0 top-0 cursor-pointer p-2"
            onClick={() => setShowResume(!showResume)}
          >
            <Button className="grainy-gradient2 group flex p-3 text-primary transition-all hover:border-primary hover:bg-[rgba(0,0,0,0.2)]">
              {showResume ? (
                <>
                  <EyeOff size="18" />
                </>
              ) : (
                <>
                  <Eye size="18" />
                </>
              )}
            </Button>
          </div>

          <h3 className="flex items-center justify-center text-center text-2xl font-medium">
            Edit Your Experience
          </h3>

          <div className="flex w-full flex-col items-center justify-evenly gap-5">
            <section className="container mt-10 flex w-5/6 flex-col gap-5">
              <h4 className="flex items-center justify-between text-lg font-medium">
                Experience
              </h4>
              <ExperienceForm
                experiences={experiences}
                setExperience={setExperiences}
              />
            </section>
          </div>

          <div className="mt-10 flex w-full items-center justify-center">
            {experiences.length > 0 ? (
              <div>
                <h3 className="text-2xl font-medium">Preview</h3>

                <Carousel className="mt-5 w-full max-w-xs sm:max-w-sm md:max-w-md">
                  <CarouselContent>
                    {experiences.map((item, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardHeader>
                              <CardTitle>
                                {item.position} at {item.company}
                              </CardTitle>
                              <CardDescription>
                                <p>at {item.location}</p>
                                <p>
                                  {new Date(
                                    item.startDate,
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(item.endDate).toLocaleDateString()}
                                </p>
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p>{item.description}</p>
                            </CardContent>
                            <CardFooter>
                              <Button className="bg-destructive text-destructive-foreground">
                                Delete
                              </Button>
                            </CardFooter>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            ) : null}
          </div>

          <Button className="mt-5 w-full max-w-md">Save</Button>
        </section>
        <section
          className={`relative max-w-xl overflow-hidden rounded-lg border-primary transition-all lg:max-w-none ${
            showResume
              ? "h-screen w-full max-w-xl border-2 p-1 lg:h-auto lg:w-1/2"
              : "h-0 max-w-xl lg:h-auto lg:w-0"
          }`}
        ></section>
      </div>
    </div>
  );
}

export default Experience;
