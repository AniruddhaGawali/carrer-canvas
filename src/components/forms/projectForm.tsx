"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

type Props = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};

export default function ProjectForm({ projects, setProjects }: Props) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tech, setTech] = useState<string[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);

  async function fetchGithubRepoData(user: string, repo: string) {
    const res = await fetch(`https://api.github.com/repos/${user}/${repo}`);
    // https://api.github.com/repos/AniruddhaGawali/Spend-Wise
    const techRes = await fetch(
      `https://api.github.com/repos/${user}/${repo}/languages`,
    );
    // https://api.github.com/repos/AniruddhaGawali/Spend-Wise/languages
    const data = await res.json();
    const techData = await techRes.json();

    const techUse = Object.keys(techData);

    const projectData = {
      name: data.name,
      projectType: data.topics[0] + " | " + data.language,
      link: data.homepage.length > 0 ? data.homepage : data.html_url,
      description: data.description,
      startDate: data.created_at,
      endDate: data.updated_at,
      tech: techUse,
    };
    console.log(projectData);

    return projectData;
  }

  const projectFormSchema = z.object({
    name: z.string().min(2, {
      message: "Project name must be at least 2 characters.",
    }),
    projectType: z.string().min(2, {
      message: "Project type must be at least 2 characters.",
    }),
    link: z.string().url({
      message: "Please enter a valid URL.",
    }),

    description: z
      .string()
      .min(10, {
        message: "Description must be at least 10 characters.",
      })
      .max(350, {
        message: "Description must not be longer than 30 characters.",
      }),
  });

  const githubLinkFormSchema = z.object({
    githubLink: z.string().url({
      message: "Please enter a valid URL.",
    }),
  });

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    values: {
      name: "",
      projectType: "",
      link: "",
      description: "",
    },
  });

  const githubLinkForm = useForm<z.infer<typeof githubLinkFormSchema>>({
    resolver: zodResolver(githubLinkFormSchema),
    values: {
      githubLink: "",
    },
  });

  return (
    <>
      <Form {...githubLinkForm}>
        <form
          onSubmit={githubLinkForm.handleSubmit(async (data) => {
            setFetching(true);
            console.log(data);
            const splitLink = data.githubLink.split("/");
            const user = splitLink[3];
            const repo = splitLink[4];
            // const projectData = await fetchGithubRepoData(user, repo);
            const projectData = {
              name: "Spend-Wise",
              projectType: "showcase | Dart",
              link: "https://github.com/AniruddhaGawali/Spend-Wise",
              description:
                "Spend Wise is the essential expense management app that simplifies the task of tracking and categorizing your transactions, helping you gain control over your finances. With a streamlined user experience, it focuses on key functionalities that are perfect for users who want to start managing their expenses right away.",
              startDate: "2023-10-09T02:44:49Z",
              endDate: "2023-11-24T07:38:58Z",
              tech: [
                "Dart",
                "JavaScript",
                "CSS",
                "Swift",
                "Kotlin",
                "Objective-C",
              ],
            };
            console.log(projectData);
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
            console.log(project);
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

          <div className="flex flex-col gap-5 xl:flex-row">
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
                      <Calendar
                        mode="single"
                        selected={startDate ?? undefined}
                        onSelect={(e) => setStartDate(e ?? null)}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
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
                      <Calendar
                        mode="single"
                        selected={endDate ?? undefined}
                        onSelect={(e) => setEndDate(e ?? null)}
                        disabled={(date) =>
                          date > new Date() ||
                          date < (startDate ?? new Date("1900-01-01"))
                        }
                        initialFocus
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
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    //   className="resize-none"
                    {...field}
                  />
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
      </Form>
    </>
  );
}
