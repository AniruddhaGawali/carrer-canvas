"use client";

import React, { useEffect, useState } from "react";
import { StepsLinks as Steps } from "@/data/resume-step";
import { Button } from "../ui/button";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import ExperienceForm from "@/components/forms/experienceForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as action from "@/actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CarouselItem } from "@/components/ui/carousel";
import useResume from "@/redux/dispatch/useResume";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import SuggestionBox from "../suggestionBox";
import LoadingButton from "../loadingButton";
import { Separator } from "../ui/separator";
import PdfDoc from "../pdfView";

type Props = {};

export default function Experience({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const experienceFormSchema = z.object({
    company: z.string().min(2, {
      message: "Company name must be at least 2 characters.",
    }),
    jobTitle: z.string().min(2, {
      message: "Job title must be at least 2 characters.",
    }),
    location: z.string(),
    description: z
      .string()
      .min(10, {
        message: "Bio must be at least 10 characters.",
      })
      .max(160, {
        message: "Bio must not be longer than 30 characters.",
      }),
  });

  const form = useForm<z.infer<typeof experienceFormSchema>>({
    resolver: zodResolver(experienceFormSchema),
    values: {
      company: "",
      jobTitle: "",
      description: "",
      location: "",
    },
  });

  const { data: session, status } = useSession();
  const {
    resumeState,
    pushResume,
    setResumeStateById,
    setResumeToDefaultState,
  } = useResume();
  const [showResume, setShowResume] = useState<boolean>(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [suggestions, setSuggestions] = useState<Experience[]>([]);
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<
    string | null
  >(null);
  const [disabledSaveButton, setDisabledSaveButton] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  async function fetchSuggestions() {
    if (session) {
      const res = await action.getExperiences(session);
      if (res) {
        setSuggestions(res as unknown as Experience[]);
      }
    }
  }

  function handleSubmitForm(data: {
    jobTitle: string;
    company: string;
    description: string;
    location: string;
  }) {
    const newExperience: Experience = {
      id: selectedSuggestionId ?? experiences.length.toString(),
      company: data.company,
      position: data.jobTitle,
      startDate: startDate?.toISOString() ?? "",
      endDate: endDate?.toISOString() ?? "",
      description: data.description,
      location: data.location,
    };

    setExperiences((prev) => [...prev, newExperience]);
  }

  async function addExperiences() {
    setDisabledSaveButton(true);
    await action.setExperiences(experiences, session!);
    const newResume: Resume = {
      ...resumeState,
      exprerience: experiences,
    };
    pushResume(newResume, session);
    setDisabledSaveButton(false);
  }

  useEffect(() => {
    console.log(resumeState);
  }, [resumeState]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (resumeState.id == "" && id != null) {
      setResumeStateById(id, session);
    }
    if (resumeState.id == "" && session) setResumeToDefaultState();
    fetchSuggestions();
  }, [session]);

  if (status == "unauthenticated") {
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
                    experiences.find((exp) => item.id == exp.id) &&
                    "grainy-gradient2 "
                  }`}
                >
                  <div
                    className="flex h-full w-full flex-col gap-1 rounded-md bg-white text-xs"
                    onClick={() => {
                      if (!experiences.includes(item)) {
                        form.setValue("company", item.company);
                        form.setValue("jobTitle", item.position);
                        form.setValue("location", item.location);
                        form.setValue("description", item.description);
                        setSelectedSuggestionId(item.id);
                        setStartDate(new Date(item.startDate));
                        setEndDate(new Date(item.endDate));
                      }
                    }}
                  >
                    <CardHeader>
                      <CardTitle>{item.company}</CardTitle>
                      <CardDescription>
                        <p className="text-base font-medium">
                          {item.position}{" "}
                        </p>
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
            <section className="container mt-10 flex w-11/12  flex-col gap-5 rounded-md bg-secondary/60 p-10">
              <h4 className="flex items-center justify-between text-lg font-medium">
                Experience
              </h4>
              <ExperienceForm
                form={form}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                startDate={startDate}
                endDate={endDate}
                handleSubmitForm={handleSubmitForm}
              />
            </section>
          </div>

          <div className="mt-10 flex w-full items-center justify-center">
            {experiences.length > 0 ? (
              <div className="w-full max-w-sm">
                <h3 className="text-2xl font-medium">Preview</h3>

                {experiences.map((item, index) => (
                  <div className="relative w-full p-1" key={index}>
                    <Card className="relative w-full cursor-pointer  text-start">
                      <CardHeader>
                        <CardTitle>{item.company}</CardTitle>
                        <CardDescription>
                          <p className="text-base font-medium">
                            {item.position}{" "}
                          </p>
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

                      <span
                        className="absolute right-2 top-2"
                        onClick={() => {
                          const newExperiences = experiences.filter(
                            (exp, i) => i !== index,
                          );
                          setExperiences(newExperiences);
                        }}
                      >
                        <Trash2 size={20} />
                      </span>
                    </Card>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <Separator
            orientation="horizontal"
            className="my-5 w-full border-t-2 border-primary"
          />

          <LoadingButton
            className="mt-5 w-full max-w-md"
            onClick={addExperiences}
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
        >
          <div
            className="relative flex h-full w-full items-center justify-center bg-white"
            // id="pdf"
          >
            <PdfDoc
              personalInfo={resumeState.personalInfo}
              skills={resumeState.skills}
              social={resumeState.social}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
