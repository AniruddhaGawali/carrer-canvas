"use client";

import React, { useEffect, useState } from "react";
import { StepsLinks as Steps } from "@/data/resume-step";
import { Button } from "../ui/button";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import ExperienceForm from "@/components/forms/experienceForm";
import * as action from "@/actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CarouselItem } from "@/components/ui/carousel";
import useResume from "@/redux/dispatch/useResume";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SuggestionBox from "../suggestionBox";
import LoadingButton from "../loadingButton";

type Props = {};

export default function Experience({}: Props) {
  const router = useRouter();
  const [showResume, setShowResume] = useState<boolean>(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const { resumeState, setResumeState } = useResume();
  const { data: session } = useSession();
  const [suggestions, setSuggestions] = useState<Experience[]>([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<Experience[]>(
    [],
  );
  const [disabledSaveButton, setDisabledSaveButton] = useState<boolean>(false);

  async function fetchSuggestions() {
    if (session) {
      const res = await action.getExperiences(session);
      if (res) {
        setSuggestions(res as unknown as Experience[]);
      }
    }
  }

  useEffect(() => {
    console.log(resumeState);
  }, [resumeState]);

  useEffect(() => {
    fetchSuggestions();
  }, [session]);

  if (!session) {
    router.push("/register");
  }

  return (
    <div className=" my-[9rem] min-h-screen w-full">
      <div className="mb-20 flex flex-col items-center justify-center">
        <h2 className="mb-3 text-center text-3xl font-bold">{Steps[3].name}</h2>
        <p>{Steps[3].desc}</p>
      </div>

      {suggestions.length > 0 && (
        <SuggestionBox>
          {suggestions.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
              <div className="p-1">
                <Card
                  className={`relative cursor-pointer p-[3px] text-start ${
                    selectedSuggestions.includes(item) && "grainy-gradient2 "
                  }`}
                >
                  <div
                    className="flex h-full w-full flex-col gap-1 rounded-md bg-white text-xs"
                    onClick={() => {
                      if (!selectedSuggestions.includes(item)) {
                        const newSuggestions = [...selectedSuggestions, item];
                        setSelectedSuggestions(newSuggestions);
                        setExperiences((prev) => [...prev, item]);
                      }
                    }}
                  >
                    <CardHeader>
                      <CardTitle>{item.company}</CardTitle>
                      <CardDescription>
                        <h2 className="text-base font-medium">
                          {item.position}{" "}
                        </h2>
                        <p>at {item.location}</p>
                        <p>
                          {new Date(item.startDate).toLocaleDateString()} -{" "}
                          {new Date(item.endDate).toLocaleDateString()}
                        </p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{item.description}</p>
                    </CardContent>
                  </div>
                  <span
                    className="absolute right-2 top-2"
                    onClick={async () => {
                      await action.deleteExperience(item.id, session!);
                      const newSuggestions = suggestions.filter(
                        (exp) => exp.id !== item.id,
                      );
                      setSuggestions(newSuggestions);
                    }}
                  >
                    <Trash2 size={20} />
                  </span>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </SuggestionBox>
      )}

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

                {experiences.map((item, index) => (
                  <div className="p-1" key={index}>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {item.position} at {item.company}
                        </CardTitle>
                        <CardDescription>
                          <p>at {item.location}</p>
                          <p>
                            {new Date(item.startDate).toLocaleDateString()} -{" "}
                            {new Date(item.endDate).toLocaleDateString()}
                          </p>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{item.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="bg-destructive text-destructive-foreground"
                          onClick={() => {
                            const newExperiences = experiences.filter(
                              (exp, i) => i !== index,
                            );
                            setExperiences(newExperiences);
                            if (suggestions.includes(item)) {
                              const newSuggestions = suggestions.filter(
                                (exp) => exp.id !== item.id,
                              );
                              setSuggestions(newSuggestions);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <LoadingButton
            className="mt-5 w-full max-w-md"
            onClick={async () => {
              setDisabledSaveButton(true);
              const experiencesRes = await action.setExperiences(
                experiences,
                session!,
              );

              if (experiencesRes) {
                const res = await action.setExperiencesInResume(
                  experiencesRes as unknown as Experience[],
                  resumeState.id,
                  session!,
                );

                if (!res) return;

                const newResume: Resume = {
                  id: res.id,
                  title: res.title,
                  userId: res.userId,
                  personalInfo: res.personalInfo
                    ? {
                        address1: res.personalInfo.address1,
                        address2: res.personalInfo.address2,
                        email: res.personalInfo.email,
                        id: res.personalInfo.id,
                        jobTitle: res.personalInfo.jobTitle,
                        name: res.personalInfo.name,
                        phone: res.personalInfo.phone,
                        website: res.personalInfo.website ?? undefined,
                      }
                    : null,
                  skills: res.skills as Skill[],
                  social: res.social as Social,
                  template: res.template,
                  exprerience: res.experience as Experience[],
                };

                setResumeState(newResume);
              }
              setDisabledSaveButton(false);
            }}
            disabled={disabledSaveButton}
            loading={disabledSaveButton}
          >
            Save
          </LoadingButton>
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