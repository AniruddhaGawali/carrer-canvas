"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect, useState, useContext } from "react";
import { StepsLinks as Steps } from "@/data/resume-step-navigation";
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
import SuggestionBox from "../suggestionBox";
import { CarouselItem } from "../ui/carousel";
import ComboBox from "../ui/combo-box";
import { toast } from "sonner";
import PdfDoc from "../pdfView";
import { IsDetailSavedContext } from "@/provider/isDetailSavedProvider";

type Props = {};

export default function EducationAndCertificationComponents({}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: session, status } = useSession();
  const {
    resumeState,
    pushResume,
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
  const [suggestionEducation, setSuggestionEducation] = useState<Education[]>(
    [],
  );
  const [suggestionCertification, setSuggestionCertification] = useState<
    AwardsAndCertifications[]
  >([]);

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] =
    useState<boolean>(true);
  const { setIsDetailSaved } = useContext(IsDetailSavedContext);

  const suggestionType = [
    {
      label: "Education Suggestions",
      value: "education",
    },
    {
      label: "Certification Suggestions",
      value: "certification",
    },
  ];

  const [value, setValue] = useState<string>(suggestionType[0].value);

  const certificationFormSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    description: z
      .string()
      .min(10, {
        message: "Description must be at least 10 characters.",
      })
      .max(350, {
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
      .max(350, {
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

  async function fetchSuggestion() {
    if (session) {
      const education = await action.getEducation(session);
      const certification = await action.getAwardsAndCertifications(session);

      if (education) setSuggestionEducation(education);
      if (certification) setSuggestionCertification(certification);
    }
  }

  useEffect(() => {
    const id = searchParams.get("id");
    if (resumeState.id == "" && id != null) {
      setResumeStateById(id, session);
    }
    if (resumeState.id == "" && session) setResumeToDefaultState();
    fetchSuggestion();
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
    let isDisabled = true;

    if (resumeState.awardsAndCertifications && resumeState.education) {
      if (
        education.length == resumeState.education.length &&
        certification.length == resumeState.awardsAndCertifications.length
      ) {
        isDisabled = resumeState.education.every(
          (item, i) =>
            item.college === education[i].college &&
            item.degree === education[i].degree &&
            item.description === education[i].description &&
            item.startDate === education[i].startDate &&
            item.endDate === education[i].endDate,
        );

        isDisabled =
          isDisabled &&
          resumeState.awardsAndCertifications.every(
            (item, i) =>
              item.name === certification[i].name &&
              item.description === certification[i].description &&
              item.date === certification[i].date,
          );
      } else {
        isDisabled = false;
      }
    } else {
      isDisabled = false;
    }

    setIsSaveButtonDisabled(isDisabled);
  }, [education, certification]);

  useEffect(() => {
    setIsDetailSaved(isSaveButtonDisabled);
  }, [isSaveButtonDisabled]);

  if (status == "unauthenticated") {
    router.push("/register");
  }

  return (
    <div className=" my-[9rem] min-h-screen w-full">
      <div className="mb-20 flex flex-col items-center justify-center">
        <h2 className="mb-3 text-center text-4xl font-bold">{Steps[5].name}</h2>
        <p className="text-center text-lg font-medium text-primary">
          {Steps[5].desc}
        </p>
      </div>

      {(suggestionEducation.length > 0 ||
        suggestionCertification.length > 0) && (
        <div>
          <h2 className="container mb-5 w-full text-left text-xl text-primary/80 ">
            <ComboBox
              frameworks={suggestionType}
              value={value}
              setValue={(value) => setValue(value)}
            />
          </h2>

          <SuggestionBox className="bg-secondary/60">
            {value === "education" ? (
              <>
                {suggestionEducation.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="h-full md:basis-1/3 2xl:basis-1/5"
                  >
                    <div className="p-1">
                      <Card
                        className={`relative h-full cursor-pointer p-[3px] text-start ${
                          education.filter(
                            (edu) =>
                              edu.college === item.college &&
                              edu.degree === item.degree &&
                              edu.description === item.description &&
                              edu.startDate ===
                                new Date(item.startDate).toISOString(),
                          ).length > 0 && "grainy-gradient2 "
                        }`}
                        onClick={() => {
                          educationForm.setValue("college", item.college);
                          educationForm.setValue("degree", item.degree);
                          educationForm.setValue(
                            "description",
                            item.description,
                          );
                          setStartDate(new Date(item.startDate));
                        }}
                      >
                        <div className="flex h-full w-full flex-col gap-1 rounded-md bg-white text-xs">
                          <CardHeader>
                            <CardTitle>{item.degree}</CardTitle>
                            <CardDescription>
                              <p className="text-base font-medium">
                                {item.college}{" "}
                              </p>

                              <p>
                                {new Date(item.startDate).toLocaleDateString()}{" "}
                                - {new Date(item.endDate).toLocaleDateString()}
                              </p>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div>{item.description}</div>
                          </CardContent>
                        </div>

                        <span
                          className="absolute right-2 top-2"
                          onClick={async () => {
                            toast.promise(action.deleteEducation(item.id), {
                              loading: "Deleting...",
                              success: () => {
                                const newEducation = suggestionEducation.filter(
                                  (edu) => edu.id !== item.id,
                                );
                                setSuggestionEducation(newEducation);
                                return "Deleted Successfully";
                              },
                              error: "Failed to delete",
                            });
                          }}
                        >
                          <Trash2 size={20} />
                        </span>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </>
            ) : (
              <>
                {suggestionCertification.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="h-full md:basis-1/3 2xl:basis-1/5"
                  >
                    <div className="p-1">
                      <Card
                        className={`relative h-full cursor-pointer p-[3px] text-start ${
                          certification.filter(
                            (cert) =>
                              cert.name === item.name &&
                              cert.description === item.description &&
                              cert.date === new Date(item.date).toISOString(),
                          ).length > 0 && "grainy-gradient2 "
                        }`}
                        onClick={() => {
                          certificationForm.setValue("name", item.name);
                          certificationForm.setValue(
                            "description",
                            item.description,
                          );
                          setCompletedDate(new Date(item.date));
                        }}
                      >
                        <div className="flex h-full w-full flex-col gap-1 rounded-md bg-white text-xs">
                          <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                            <CardDescription>
                              <p>
                                at {new Date(item.date).toLocaleDateString()}
                              </p>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div>{item.description}</div>
                          </CardContent>
                        </div>

                        <span
                          className="absolute right-2 top-2"
                          onClick={async () => {
                            toast.promise(
                              action.deleteAwardsAndCertifications(item.id),
                              {
                                loading: "Deleting...",
                                success: () => {
                                  const newCertification =
                                    suggestionCertification.filter(
                                      (cert) => cert.id !== item.id,
                                    );
                                  setSuggestionCertification(newCertification);
                                  return "Deleted Successfully";
                                },
                                error: "Failed to delete",
                              },
                            );
                          }}
                        >
                          <Trash2 size={20} />
                        </span>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </>
            )}
          </SuggestionBox>
        </div>
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
            Manage Your Education and Certification
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
                      <Card className="relative w-full text-start">
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

                        <span
                          className="absolute right-2 top-2 cursor-pointer"
                          onClick={() => {
                            const newEducation = education.filter(
                              (education) => education.id !== item.id,
                            );
                            setEducation(newEducation);
                          }}
                        >
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
                    <Card className="relative w-full  text-start">
                      <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>
                          <p>at {new Date(item.date).toLocaleDateString()}</p>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div>{item.description}</div>
                      </CardContent>

                      <span
                        className="absolute right-2 top-2 cursor-pointer "
                        onClick={() => {
                          const newCertification = certification.filter(
                            (certification) => certification.id !== item.id,
                          );
                          setCertification(newCertification);
                        }}
                      >
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

              await addEducationAndCertification();
              setIsLoading(false);
            }}
            loading={isLoading}
            disabled={isSaveButtonDisabled}
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
          <PdfDoc
            personalInfo={resumeState.personalInfo}
            skills={resumeState.skills}
            social={resumeState.social}
            experience={resumeState.experience}
            education={education}
            projects={resumeState.project}
            awardsAndCertifications={certification}
          />
        </section>
      </div>
    </div>
  );
}
