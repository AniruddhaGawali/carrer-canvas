"use client";

import React, { useState } from "react";
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

type Props = {};

export default function ProjectComponent({}: Props) {
  const { data: session } = useSession();
  const { resumeState, setResumeState } = useResume();
  const [showResume, setShowResume] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);

  async function addProjects() {
    console.log("projects", projects);
    if (!session) return;
    const resProject = await action.setProjects(projects, session);
    console.log("resProject", resProject);

    if (resProject) {
      setProjects(resProject);
      console.log("resProject", resProject, projects);
      const res = action.setProjectsInResume(resProject, resumeState.id);

      if (!res) return;

      const newResume: Resume = { ...resumeState, project: resProject };

      setResumeState(newResume);
    }
  }

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
            Edit Your Projects
          </h3>

          <div className="flex w-full flex-col items-center justify-evenly gap-5">
            <section className="container mt-10 flex w-5/6 flex-col gap-5">
              <h4 className="flex items-center justify-between text-lg font-medium">
                Experience
              </h4>
              <ProjectForm projects={projects} setProjects={setProjects} />
            </section>
          </div>

          <Separator
            orientation="horizontal"
            className="my-5 w-full border-t border-primary"
          />

          <div className=" flex w-full items-center justify-center">
            {projects.length > 0 ? (
              <div className="w-full max-w-sm">
                <h3 className="text-2xl font-medium">Preview</h3>

                {projects.map((item, index) => (
                  <div className="relative w-full p-1" key={index}>
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
                        <p>{item.description}</p>
                      </CardContent>

                      <span
                        className="absolute right-2 top-2"
                        onClick={() => {
                          const newExperiences = projects.filter(
                            (exp, i) => i !== index,
                          );
                          setProjects(newExperiences);
                          // if (suggestions.includes(item)) {
                          //   const newSuggestions = suggestions.filter(
                          //     (exp) => exp.id !== item.id,
                          //   );
                          //   setSuggestions(newSuggestions);
                          // }
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