"use client";

import React, { useState } from "react";
import PdfDoc, { PdfDocWithoutToolTip } from "@/components/pdfView";

import { useRouter } from "next/navigation";
import * as action from "@/actions";

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import useResume from "@/redux/dispatch/useResume";

type Props = {
  resumes: Resume[];
  fetchResumes(): Promise<void>;
};

function DashboardGrid({ resumes, fetchResumes }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data: session, status } = useSession();
  const router = useRouter();
  const { setResumeState } = useResume();
  const [open, setOpen] = useState(false);

  const [resumeSeleted, setResumeSeleted] = React.useState<Resume>();

  if (isDesktop) {
    return (
      <Dialog open={open} defaultOpen={false} onOpenChange={setOpen}>
        <div className="juc container my-20 grid grid-cols-1 items-center justify-center gap-20 md:grid-cols-2 lg:grid-cols-3">
          <>
            {resumes.map((item, index) => (
              <div className="group relative" key={index}>
                <div className="grainy-gradient-hover group relative m-auto h-96 w-full min-w-min max-w-sm cursor-pointer rounded-lg border-[3px] bg-secondary p-5 shadow-md transition-all duration-500 hover:border-black">
                  <DialogTrigger
                    asChild
                    onClick={() => {
                      setResumeSeleted(item);
                    }}
                  >
                    <Button
                      className="absolute right-2 top-2 z-20"
                      variant={"default"}
                      size={"icon"}
                    >
                      <Eye />
                    </Button>
                  </DialogTrigger>

                  <div className="absolute -bottom-10 -right-0 z-20  hidden h-10 w-full items-center justify-between border-black px-3 pt-5 group-hover:flex">
                    <Button
                      variant={"destructive"}
                      onClick={() => {
                        action.deleteResume(item.id, session);
                        fetchResumes();
                      }}
                      className="flex  items-center justify-center gap-3 bg-destructive/80"
                    >
                      <Trash2 /> Delete
                    </Button>
                    <Button
                      variant={"secondary"}
                      onClick={() => {
                        setResumeState(item);
                        router.push("/create-resume");
                      }}
                      className="flexitems-center justify-center gap-3 hover:bg-primary/20"
                    >
                      <Edit size={20} /> Edit
                    </Button>
                  </div>

                  <div className="h-2/3 min-h-[300px] w-full rounded-md bg-white shadow-inner transition-all duration-300">
                    <PdfDocWithoutToolTip
                      awardsAndCertifications={item.awardsAndCertifications}
                      education={item.education}
                      experience={item.experience}
                      social={item.social}
                      skills={item.skills}
                      projects={item.project}
                      personalInfo={item.personalInfo}
                    />
                  </div>
                  <div className="mt-5  w-full">
                    <h1 className="text-center text-2xl font-bold group-hover:underline">
                      {item.title}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </>
        </div>
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>{resumeSeleted?.title}</DialogTitle>
          </DialogHeader>
          <div
            className="relative flex h-full w-full items-center justify-center bg-white"
            id="pdf"
          >
            <PdfDoc
              awardsAndCertifications={resumeSeleted?.awardsAndCertifications}
              education={resumeSeleted?.education}
              experience={resumeSeleted?.experience}
              social={resumeSeleted?.social}
              skills={resumeSeleted?.skills}
              projects={resumeSeleted?.project}
              personalInfo={resumeSeleted?.personalInfo}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="juc container my-20 grid grid-cols-1 items-center justify-center gap-20 md:grid-cols-2 lg:grid-cols-3">
        <>
          {resumes.map((item, index) => (
            <div className="group relative" key={index}>
              <div className="grainy-gradient-hover group relative m-auto h-96 w-full min-w-min max-w-sm cursor-pointer rounded-lg border-[3px] bg-secondary p-5 shadow-md transition-all duration-500 hover:border-black">
                <DrawerTrigger
                  asChild
                  onClick={() => {
                    setResumeSeleted(item);
                  }}
                >
                  <Button
                    className="absolute right-2 top-2 z-20"
                    variant={"default"}
                    size={"icon"}
                  >
                    <Eye />
                  </Button>
                </DrawerTrigger>

                <div className="absolute -bottom-10 -right-0 z-20  hidden h-10 w-full items-center justify-between border-black px-3 pt-5 group-hover:flex">
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      action.deleteResume(item.id, session);
                      fetchResumes();
                    }}
                    className="flex  items-center justify-center gap-3 bg-destructive/80"
                  >
                    <Trash2 /> Delete
                  </Button>
                  <Button
                    variant={"secondary"}
                    onClick={() => {
                      setResumeState(item);
                      router.push("/create-resume");
                    }}
                    className="flexitems-center justify-center gap-3 hover:bg-primary/20"
                  >
                    <Edit size={20} /> Edit
                  </Button>
                </div>

                <div className="h-2/3 min-h-[300px] w-full rounded-md bg-white shadow-inner transition-all duration-300">
                  <PdfDocWithoutToolTip
                    awardsAndCertifications={item.awardsAndCertifications}
                    education={item.education}
                    experience={item.experience}
                    social={item.social}
                    skills={item.skills}
                    projects={item.project}
                    personalInfo={item.personalInfo}
                  />
                </div>
                <div className="mt-5  w-full">
                  <h1 className="text-center text-2xl font-bold group-hover:underline">
                    {item.title}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </>
      </div>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{resumeSeleted?.title}</DrawerTitle>
        </DrawerHeader>
        <PdfDoc
          awardsAndCertifications={resumeSeleted?.awardsAndCertifications}
          education={resumeSeleted?.education}
          experience={resumeSeleted?.experience}
          social={resumeSeleted?.social}
          skills={resumeSeleted?.skills}
          projects={resumeSeleted?.project}
          personalInfo={resumeSeleted?.personalInfo}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DashboardGrid;
