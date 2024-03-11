"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { StepsLinks as Steps } from "@/data/resume-step";
import { Button } from "../ui/button";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import EducationForm from "../forms/educationForm";
import { Separator } from "../ui/separator";
import CertificationForm from "../forms/certificationForm";
import * as action from "@/actions";
import { useSession } from "next-auth/react";
import useResume from "@/redux/dispatch/useResume";
import LoadingButton from "../loadingButton";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

export default function EducationAndCertificationComponents({}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: session, status } = useSession();
  const {
    resumeState,
    pushResume,
    setResumeState,
    setResumeStateById,
    setResumeToDefaultState,
  } = useResume();
  const [showResume, setShowResume] = useState<boolean>(false);
  const [education, setEducation] = useState<Education[]>([]);
  const [certification, setCertification] = useState<AwardsAndCertifications[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const educationAndCertification = [...education, ...certification];
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [completedDate, setCompletedDate] = useState<Date | null>(null);

  const certificationFormSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    description: z
      .string()
      .min(10, {
        message: "Description must be at least 10 characters.",
      })
      .max(160, {
        message: "Description must not be longer than 160 characters.",
      }),
  });

  const certificationForm = useForm<z.infer<typeof certificationFormSchema>>({
    resolver: zodResolver(certificationFormSchema),
    values: {
      name: "",
      description: "",
    },
  });

  const educationFormSchema = z.object({
    college: z.string().min(2, {
      message: "College name must be at least 2 characters.",
    }),
    degree: z.string().min(2, {
      message: "Degree must be at least 2 characters.",
    }),
    description: z
      .string()
      .min(10, {
        message: "Description must be at least 10 characters.",
      })
      .max(160, {
        message: "Description must not be longer than 160 characters.",
      }),
  });

  const educationForm = useForm<z.infer<typeof educationFormSchema>>({
    resolver: zodResolver(educationFormSchema),
    values: {
      college: "",
      degree: "",
      description: "",
    },
  });

  async function addEducationAndCertification() {
    if (session) {
      await action.setEducation(education, session);
      await action.setAwardsAndCertifications(certification, session);

      const newResume: Resume = {
        ...resumeState,
        education: education,
        awardsAndCertifications: certification,
      };
      await pushResume(newResume, session);
    }
  }

  useEffect(() => {
    const id = searchParams.get("id");
    if (resumeState.id == "" && id != null) {
      setResumeStateById(id, session);
    }
    if (resumeState.id == "" && session) setResumeToDefaultState();
  }, [session]);

  useEffect(() => {
    if (resumeState.education) {
      setEducation(resumeState.education);
    }
    if (resumeState.awardsAndCertifications) {
      setCertification(resumeState.awardsAndCertifications);
    }
  }, [resumeState]);

  useEffect(() => {
    console.log(education);
    console.log(certification);
  }, [education, certification]);

  if (status == "unauthenticated") {
    router.push("/register");
  }

  return (
    <div className=" my-[9rem] min-h-screen w-full">
      <div className="mb-20 flex flex-col items-center justify-center">
        <h2 className="mb-3 text-center text-3xl font-bold">{Steps[5].name}</h2>
        <p>{Steps[5].desc}</p>
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
            Edit Your Education and Certification
          </h3>

          <div className="flex w-full flex-col items-center justify-evenly gap-5">
            <section className="container mt-10 flex w-11/12 flex-col gap-5 rounded-md bg-secondary/60 p-10">
              <h4 className="flex items-center justify-between text-lg font-medium">
                Education
              </h4>
              <EducationForm
                education={education}
                setEducation={setEducation}
                form={educationForm}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </section>

            {education.length > 0 ? (
              <div className="container flex w-full flex-col items-center">
                <h3 className="mt-10 w-full text-start text-2xl font-medium">
                  Preview
                </h3>

                <div className="m-auto mt-5 flex w-full flex-col items-center justify-center rounded-md bg-secondary/60 p-10">
                  {education.map((item, index) => (
                    <div className="relative w-full p-1" key={index}>
                      <Card className="relative w-full cursor-pointer  text-start">
                        <CardHeader>
                          <CardTitle>{item.degree}</CardTitle>
                          <CardDescription>
                            <p className="text-base font-medium">
                              {item.college}{" "}
                            </p>

                            <p>
                              {new Date(item.startDate).toLocaleDateString()} -{" "}
                              {new Date(item.endDate).toLocaleDateString()}
                            </p>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div>{item.description}</div>
                        </CardContent>

                        <span className="absolute right-2 top-2">
                          <Trash2 size={20} />
                        </span>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <Separator
              orientation="horizontal"
              className="my-5 w-full border-t border-primary"
            />

            <section className="container mt-5 flex w-11/12 flex-col gap-5 rounded-md bg-secondary/60 p-10">
              <h4 className="flex items-center justify-between text-lg font-medium">
                Certification
              </h4>
              <CertificationForm
                certification={certification}
                setCertification={setCertification}
                date={completedDate}
                form={certificationForm}
                setDate={setCompletedDate}
              />
            </section>
          </div>

          {certification.length > 0 ? (
            <div className="container flex w-full flex-col items-center">
              <h3 className="mt-10 w-full text-start text-2xl font-medium">
                Preview
              </h3>

              <div className="m-auto mt-5 flex w-full flex-col items-center justify-center rounded-md bg-secondary/60 p-10">
                {certification.map((item, index) => (
                  <div className="relative w-full p-1" key={index}>
                    <Card className="relative w-full cursor-pointer  text-start">
                      <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>
                          <p>at {new Date(item.date).toLocaleDateString()}</p>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div>{item.description}</div>
                      </CardContent>

                      <span className="absolute right-2 top-2">
                        <Trash2 size={20} />
                      </span>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <Separator
            orientation="horizontal"
            className="my-5 w-full border-t border-primary"
          />

          <LoadingButton
            className="w-full max-w-md"
            onClick={async () => {
              setIsLoading(true);
              console.log(educationAndCertification);
              await addEducationAndCertification();
              setIsLoading(false);
            }}
            loading={isLoading}
            disabled={isLoading}
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
