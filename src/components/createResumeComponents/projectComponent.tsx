"use client";

import React, { useEffect, useState } from "react";
import { StepsLinks as Steps } from "@/data/resume-step";
import { Button } from "../ui/button";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import ProjectForm from "../forms/projectForm";
import * as action from "@/actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { useSession } from "next-auth/react";
import useResume from "@/redux/dispatch/useResume";
import SuggestionBox from "../suggestionBox";
import { CarouselItem } from "../ui/carousel";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

type Props = {};

export default function ProjectComponent({}: Props) {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const {
    resumeState,
    pushResume,
    setResumeStateById,
    setResumeToDefaultState,
  } = useResume();
  const [showResume, setShowResume] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [suggestions, setSuggestions] = useState<Project[]>([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<Project[]>([]);

  async function addProjects() {
    await action.setProjects(projects, session);
    const newResume: Resume = { ...resumeState, project: projects };
    pushResume(newResume, session);
  }

  async function fetchSuggestions() {
    if (session) {
      const res = await action.getProjects(session);
      if (res) {
        setSuggestions(res as unknown as Project[]);
      }
    }
  }

  useEffect(() => {
    if (resumeState.project) {
      setProjects(resumeState.project);
    }
  }, [resumeState.project]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (resumeState.id == "" && id != null) {
      setResumeStateById(id, session);
    }
    if (resumeState.id == "" && session) setResumeToDefaultState();
    fetchSuggestions();
  }, [session]);

  return (
    <div className=" my-[9rem] min-h-screen w-full">
      <div className="mb-20 flex flex-col items-center justify-center">
        <h2 className="mb-3 text-center text-3xl font-bold">{Steps[4].name}</h2>
        <p>{Steps[4].desc}</p>
      </div>

      {suggestions.length > 0 && (
        <SuggestionBox>
          {suggestions.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="relative w-full p-1" key={index}>
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
                        setProjects((prev) => [...prev, item]);
                      }
                    }}
                  >
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>
                        <p className="text-base font-medium">
                          {item.projectType}{" "}
                        </p>
                        <p>link: {item.link}</p>
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
                      toast.promise(action.deleteProject(item.id), {
                        loading: "Deleting...",
                        success: () => {
                          fetchSuggestions();
                          return "Deleted Successfully";
                        },
                        error: "Error Deleting",
                      });
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
            Edit Your Projects
          </h3>

          <div className="mt-10 flex w-11/12 flex-col items-center justify-evenly gap-5 rounded-md bg-secondary/60 p-10">
            <section className="container flex w-full flex-col gap-5">
              <h4 className="flex items-center justify-between text-lg font-medium">
                Projects
              </h4>
              <ProjectForm projects={projects} setProjects={setProjects} />
            </section>
          </div>

          <Separator
            orientation="horizontal"
            className="my-5 w-full border-t border-primary"
          />

          <div className="">
            <h3 className="container mt-10 text-2xl font-medium">Preview</h3>
            {projects.length > 0 ? (
              <div className="m-auto mt-5 flex w-11/12 flex-col items-center justify-center rounded-md bg-secondary/60 p-10">
                {projects.map((item, index) => (
                  <div className="relative  p-1" key={index}>
                    <Card className="relative w-full cursor-pointer  text-start">
                      <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>
                          <p className="text-base font-medium">
                            {item.projectType}{" "}
                          </p>
                          <p>link: {item.link}</p>
                          <p>
                            {new Date(item.startDate).toLocaleDateString()} -{" "}
                            {new Date(item.endDate).toLocaleDateString()}
                          </p>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-2 flex flex-wrap gap-2">
                          {item.tech.map((tech, index) => (
                            <span
                              key={index}
                              className="rounded-md bg-primary/70 p-1 px-2 text-xs font-medium text-white"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <p>{item.description}</p>
                      </CardContent>

                      <span
                        className="absolute right-2 top-2"
                        onClick={() => {
                          const newExperiences = projects.filter(
                            (exp, i) => i !== index,
                          );
                          setProjects(newExperiences);
                          if (selectedSuggestions.includes(item)) {
                            const newSelectedSuggestions =
                              selectedSuggestions.filter(
                                (exp) => exp.id !== item.id,
                              );
                            setSelectedSuggestions(newSelectedSuggestions);
                          }
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
          <Button
            className="group mt-5 flex w-full max-w-md p-3 transition-all"
            onClick={addProjects}
          >
            <span>Save</span>
          </Button>
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
