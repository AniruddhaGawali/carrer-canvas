"use client";

import React, { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, Info, Loader2, X } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";
import { Label } from "@radix-ui/react-label";
import TagsInputForm from "./tagsInputForm";
import { Separator } from "../ui/separator";
import { UseFormReturn } from "react-hook-form";
import AIButton from "../ui/ai-button";
import { toast } from "sonner";
import DatePicker from "../ui/date-picker";

type Props = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  form: UseFormReturn<
    {
      name: string;
      link: string;
      projectType: string;
      description: string;
    },
    any,
    {
      name: string;
      link: string;
      projectType: string;
      description: string;
    }
  >;
  githubLinkForm: UseFormReturn<
    {
      githubLink: string;
    },
    any,
    {
      githubLink: string;
    }
  >;
  fetchGithubRepoData(
    user: string,
    repo: string,
  ): Promise<{
    name: any;
    projectType: string;
    link: any;
    description: any;
    startDate: any;
    endDate: any;
    tech: string[];
  }>;
  setTech: React.Dispatch<React.SetStateAction<string[]>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  tech: string[];
  startDate: Date | null;
  endDate: Date | null;
};

export default function ProjectForm({
  projects,
  setProjects,
  form,
  githubLinkForm,
  fetchGithubRepoData,
  setEndDate,
  setStartDate,
  setTech,
  tech,
  startDate,
  endDate,
}: Props) {
  const [fetching, setFetching] = useState<boolean>(false);

  return (
    <>
      <Form {...githubLinkForm}>
        <form
          onSubmit={githubLinkForm.handleSubmit(async (data) => {
            setFetching(true);

            const splitLink = data.githubLink.split("/");
            const user = splitLink[3];
            const repo = splitLink[4];
            const projectData = await fetchGithubRepoData(user, repo);
            // const projectData = {
            //   name: "Spend-Wise",
            //   projectType: "showcase | Dart",
            //   link: "https://github.com/AniruddhaGawali/Spend-Wise",
            //   description:
            //     "Spend Wise is the essential expense management app that simplifies the task of tracking and categorizing your transactions, helping you gain control over your finances. With a streamlined user experience, it focuses on key functionalities that are perfect for users who want to start managing their expenses right away.",
            //   startDate: "2023-10-09T02:44:49Z",
            //   endDate: "2023-11-24T07:38:58Z",
            //   tech: [
            //     "Dart",
            //     "JavaScript",
            //     "CSS",
            //     "Swift",
            //     "Kotlin",
            //     "Objective-C",
            //   ],
            // };

            form.setValue("name", projectData.name);
            form.setValue("projectType", projectData.projectType);
            form.setValue("link", projectData.link);
            form.setValue("description", projectData.description);
            setTech(projectData.tech);
            setStartDate(new Date(projectData.startDate));
            setEndDate(new Date(projectData.endDate));
            setFetching(false);
          })}
        >
          <FormField
            name="githubLink"
            control={githubLinkForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  GitHub Project Link <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3">
                    {fetching && <Loader2 className="animate-spin" />}{" "}
                    <Input placeholder="Github Project Link" {...field} />
                  </div>
                </FormControl>
                <FormDescription className="flex items-center gap-1">
                  <Info size={15} />
                  Enter GitHub repo URL for project details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="flex items-center justify-center gap-5">
        <Separator className="shrink bg-primary" />
        OR
        <Separator className="shrink bg-primary" />
      </div>

      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit((data) => {
            const project: Project = {
              id: projects.length.toString(),
              name: data.name,
              projectType: data.projectType,
              link: data.link,
              description: data.description,
              startDate: startDate?.toISOString() ?? "",
              endDate: endDate?.toISOString() ?? "",
              tech: tech,
            };

            setProjects((prev) => [...prev, project]);
          })}
          id="project-form"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project Name"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project Type"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription className="flex items-center gap-1">
                  <Info size={15} />
                  Like Web, Android, ML, etc.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project Link"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription className="flex items-center gap-1">
                  <Info size={15} />
                  Github Repo or Live Project URL
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-5">
            <FormField
              name="startDate"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Start Date <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !startDate && "text-muted-foreground",
                          )}
                        >
                          {startDate ? (
                            format(startDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <DatePicker
                        value={startDate ?? new Date()}
                        onChange={(e) => setStartDate(e)}
                        maxDate={new Date()}
                        minDate={new Date("1900-01-01")}
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="endDate"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    End Date <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !endDate && "text-muted-foreground",
                          )}
                        >
                          {endDate ? (
                            format(endDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <DatePicker
                        value={endDate ?? new Date()}
                        onChange={(e) => setEndDate(e)}
                        maxDate={new Date()}
                        minDate={startDate ?? new Date("1900-01-01")}
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      //   className="resize-none"
                      {...field}
                    />
                    <AIButton
                      className="absolute bottom-2 right-2"
                      onClick={() => {
                        if (
                          form.getValues("name").length <= 0 &&
                          form.getValues("projectType").length <= 0
                        ) {
                          toast.error(
                            "Please enter atleast project name and project type to generate description",
                          );
                          return;
                        }
                      }}
                      prompt={
                        "give the Description for a project in max 150 charaters strickly (include space and use pagragraph only no points) of a project " +
                        form.getValues("name") +
                        " project is of type " +
                        form.getValues("projectType") +
                        (form.getValues("link") &&
                        form.getValues("link").length > 0
                          ? " its live link or github repo link" +
                            form.getValues("link")
                          : "") +
                        (form.getValues("description") &&
                        form.getValues("description").length > 0
                          ? " like " + form.getValues("description")
                          : "")
                      }
                      setText={(text) => form.setValue("description", text)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>

        <TagsInputForm tags={tech} setTags={setTech} />

        {tech.length > 0 && (
          <section>
            <Label className="text-sm font-medium text-gray-700">
              Tech Stack List
            </Label>
            <div className="flex flex-wrap gap-1 rounded-md border p-3">
              {tech.map((t, i) => (
                <span
                  key={i}
                  className="flex cursor-pointer items-center justify-center gap-1 rounded-md bg-primary p-1 px-2 text-white hover:bg-primary/80"
                  onClick={() => {
                    setTech(tech.filter((_, index) => index !== i));
                  }}
                >
                  {t}
                  <X size={18} className="" />
                </span>
              ))}
            </div>
          </section>
        )}

        <Button type="submit" form="project-form">
          Add
        </Button>

        <Button
          variant={"outline"}
          onClick={() => {
            form.reset();
            setTech([]);
            setStartDate(null);
            setEndDate(null);
          }}
          type="reset"
          form="project-form"
        >
          Reset
        </Button>
      </Form>
    </>
  );
}
