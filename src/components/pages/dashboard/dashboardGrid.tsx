"use client";

import React, { useState } from "react";
import PdfDoc from "@/components/pdfView";

import { useRouter } from "next/navigation";
import * as action from "@/actions";

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../../ui/button";
import { Download, Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import useResume from "@/redux/dispatch/useResume";
import DownloadPDF from "../../downloadPDF";
import { Classic1 } from "@/templates/classic/default";
import { toast } from "sonner";
import useResumeList from "@/redux/dispatch/useResumeList";

import ResumeTemplete from "@/data/resume-templete";
type Props = {
  resumes: Resume[];
};

function DashboardGrid({ resumes }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data: session, status } = useSession();
  const router = useRouter();
  const { setResumeState } = useResume();
  const [open, setOpen] = useState(false);
  const { fetchResumesList, deleteResume, addResume } = useResumeList();

  const [resumeSeleted, setResumeSeleted] = React.useState<Resume | null>(null);

  if (isDesktop) {
    return (
      <Dialog open={open} defaultOpen={false} onOpenChange={setOpen}>
        <div className="container my-20 grid grid-cols-1 items-center justify-center gap-20 md:grid-cols-2 lg:grid-cols-3">
          <>
            {resumes.map((item, index) => {
              console.log(item.template);
              return (
                <div className="group relative" key={index}>
                  <div className="grainy-gradient-hover group relative m-auto h-96 w-full min-w-min max-w-sm cursor-pointer rounded-lg border-[3px] bg-secondary p-5 shadow-md transition-all duration-500 hover:border-black">
                    <DialogTrigger
                      asChild
                      onClick={() => {
                        setResumeSeleted(item);
                      }}
                    >
                      <Button
                        className="absolute right-14 top-2 z-20"
                        variant={"default"}
                        size={"icon"}
                      >
                        <Eye />
                      </Button>
                    </DialogTrigger>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="absolute right-2 top-2 z-20">
                        <Button variant={"default"} size={"icon"}>
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent aria-label="submenu">
                        <DropdownMenuItem
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${process.env.NEXT_PUBLIC_SITE_URL}/share/${item.id}`,
                            );
                            toast("Link Copied to Clipboard");
                          }}
                        >
                          Share Link
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={async () => {
                            const resume = await action.copyResume(
                              item,
                              session,
                            );
                            if (resume) {
                              toast.success("Resume Copied");
                              addResume(resume);
                            }
                          }}
                        >
                          Make a Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={async () => {
                            const deleteItem = await action.deleteResume(
                              item.id,
                              session,
                            );
                            if (deleteItem) deleteResume(item.id);
                          }}
                          className="text-destructive focus:bg-destructive/50"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="absolute -bottom-10 -right-0 z-20  hidden h-10 w-full items-center justify-between border-black px-3 pt-5 group-hover:flex">
                      <DownloadPDF
                        doc={
                          <Classic1
                            awardsAndCertifications={
                              item.awardsAndCertifications
                            }
                            education={item.education}
                            experience={item.experience}
                            social={item.social}
                            skills={item.skills}
                            projects={item.project}
                            personalInfo={item.personalInfo}
                          />
                        }
                        name={item.title}
                      >
                        <Button className="flex items-center justify-center gap-3 ">
                          <Download size={20} />
                          <span>Download</span>
                        </Button>
                      </DownloadPDF>
                      <Button
                        variant={"secondary"}
                        onClick={() => {
                          setResumeState(item);
                          router.push("/create-resume");
                        }}
                        className="flexitems-center justify-center gap-3  hover:bg-primary/20"
                      >
                        <Edit size={20} />
                        <span>Edit</span>
                      </Button>
                    </div>

                    <div className="h-2/3 min-h-[300px] w-full rounded-md bg-white shadow-inner transition-all duration-300">
                      <PdfDoc
                        typeOfTemplate={
                          ResumeTemplete[item.template ?? 0].templeteName
                        }
                        typeOfView={"WithoutToolTip"}
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
              );
            })}
          </>
        </div>

        <DialogContent
          className="h-3/4
         min-w-[60%]"
        >
          <div className="relative flex h-full w-full flex-col  justify-center bg-white">
            <DialogHeader className="mb-5 flex ">
              <DialogTitle>{resumeSeleted?.title}</DialogTitle>
              <div className="flex w-full items-center gap-5">
                <DownloadPDF
                  doc={
                    <Classic1
                      awardsAndCertifications={
                        resumeSeleted?.awardsAndCertifications
                      }
                      education={resumeSeleted?.education}
                      experience={resumeSeleted?.experience}
                      social={resumeSeleted?.social}
                      skills={resumeSeleted?.skills}
                      projects={resumeSeleted?.project}
                      personalInfo={resumeSeleted?.personalInfo}
                    />
                  }
                  name={resumeSeleted?.title ?? "resume"}
                >
                  <Button className="w-fit space-x-3">
                    <Download size={20} />
                    <span>Download</span>
                  </Button>
                </DownloadPDF>
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    if (resumeSeleted) setResumeState(resumeSeleted);
                    router.push("/create-resume");
                  }}
                  className="space-x-3 hover:bg-primary/20"
                >
                  <Edit size={20} />
                  <span>Edit</span>
                </Button>
              </div>
            </DialogHeader>
            <div
              className="relative flex h-full w-full items-center justify-center bg-white"
              id="pdf"
            >
              {resumeSeleted != null ? (
                <PdfDoc
                  typeOfTemplate={
                    ResumeTemplete[resumeSeleted.template ?? 0].templeteName ??
                    "Classic"
                  }
                  typeOfView={"WithoutToolTip"}
                  awardsAndCertifications={
                    resumeSeleted?.awardsAndCertifications
                  }
                  education={resumeSeleted?.education}
                  experience={resumeSeleted?.experience}
                  social={resumeSeleted?.social}
                  skills={resumeSeleted?.skills}
                  projects={resumeSeleted?.project}
                  personalInfo={resumeSeleted?.personalInfo}
                />
              ) : null}
            </div>
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
                <DialogTrigger
                  asChild
                  onClick={() => {
                    setResumeSeleted(item);
                  }}
                >
                  <Button
                    className="absolute right-14 top-2 z-20"
                    variant={"default"}
                    size={"icon"}
                  >
                    <Eye />
                  </Button>
                </DialogTrigger>

                <DropdownMenu>
                  <DropdownMenuTrigger className="absolute right-2 top-2 z-20">
                    <Button variant={"default"} size={"icon"}>
                      <MoreVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent aria-label="submenu">
                    <DropdownMenuItem>
                      <DownloadPDF
                        doc={
                          <Classic1
                            awardsAndCertifications={
                              item.awardsAndCertifications
                            }
                            education={item.education}
                            experience={item.experience}
                            social={item.social}
                            skills={item.skills}
                            projects={item.project}
                            personalInfo={item.personalInfo}
                          />
                        }
                        name={item.title}
                      >
                        Download
                      </DownloadPDF>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${process.env.NEXT_PUBLIC_SITE_URL}/share/${item.id}`,
                        );
                        toast("Link Copied to Clipboard");
                      }}
                    >
                      Share Link
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setResumeState(item);
                        router.push("/create-resume");
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        const resume = await action.copyResume(item, session);
                        if (resume) {
                          toast.success("Resume Copied");
                          addResume(resume);
                        }
                      }}
                    >
                      Make a Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        const deleteItem = await action.deleteResume(
                          item.id,
                          session,
                        );
                        if (deleteItem) deleteResume(item.id);
                      }}
                      className="text-destructive focus:bg-destructive/50"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-full w-full rounded-md bg-white shadow-inner transition-all duration-300">
                  {resumeSeleted != null ? (
                    <PdfDoc
                      typeOfTemplate={
                        ResumeTemplete[resumeSeleted?.template ?? 0]
                          .templeteName ?? "Classic"
                      }
                      typeOfView={"WithoutToolTip"}
                      awardsAndCertifications={item.awardsAndCertifications}
                      education={item.education}
                      experience={item.experience}
                      social={item.social}
                      skills={item.skills}
                      projects={item.project}
                      personalInfo={item.personalInfo}
                    />
                  ) : null}
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
        <div>
          <DrawerHeader className="text-left">
            <DrawerTitle>{resumeSeleted?.title}</DrawerTitle>
            <DownloadPDF
              doc={
                <Classic1
                  awardsAndCertifications={
                    resumeSeleted?.awardsAndCertifications
                  }
                  education={resumeSeleted?.education}
                  experience={resumeSeleted?.experience}
                  social={resumeSeleted?.social}
                  skills={resumeSeleted?.skills}
                  projects={resumeSeleted?.project}
                  personalInfo={resumeSeleted?.personalInfo}
                />
              }
              name={resumeSeleted?.title ?? "resume"}
            >
              <Button className="w-full space-x-3">
                <Download size={20} />
                <span>Download</span>
              </Button>
            </DownloadPDF>
            <Button
              variant={"secondary"}
              onClick={() => {
                if (resumeSeleted) setResumeState(resumeSeleted);
                router.push("/create-resume");
              }}
              className="space-x-3 hover:bg-primary/20"
            >
              <Edit size={20} />
              <span>Edit</span>
            </Button>
          </DrawerHeader>

          <div className="h-2/3 min-h-[300px] w-full rounded-md bg-white shadow-inner transition-all duration-300">
            {resumeSeleted != null ? (
              <PdfDoc
                typeOfTemplate={
                  ResumeTemplete[resumeSeleted?.template ?? 0].templeteName ??
                  "Classic"
                }
                typeOfView={"WithoutToolTip"}
                awardsAndCertifications={resumeSeleted?.awardsAndCertifications}
                education={resumeSeleted?.education}
                experience={resumeSeleted?.experience}
                social={resumeSeleted?.social}
                skills={resumeSeleted?.skills}
                projects={resumeSeleted?.project}
                personalInfo={resumeSeleted?.personalInfo}
              />
            ) : null}
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default DashboardGrid;
