/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import React, { useEffect, useState } from "react";
import { StepsLinks as Steps } from "@/data/resume-step";
import useResume from "@/redux/dispatch/useResume";
import { Button } from "../ui/button";
import { toast } from "sonner";
import templetes from "@/data/resume-templete";
import { redirect, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Trash2 } from "lucide-react";

import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SuggestionBox from "../suggestionBox";
import * as action from "@/actions";
import PersonalInformationForm from "../forms/personalInfoForm";
import { useSession } from "next-auth/react";
import PdfDoc from "../pdfView";

type Props = {};

export default function PersonalInformationComponent({}: Props) {
  const {
    resumeState,
    setResumePersonalInfo,
    setResumeStateById,
    setResumeToDefaultState,
    pushResume,
  } = useResume();

  const selectedTemplete =
    resumeState.template != null
      ? templetes[resumeState.template]
      : templetes[0];

  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
  );

  const personalInformationFormSchema = z.object({
    name: selectedTemplete.personalInfo.name
      ? z
          .string()
          .min(2, {
            message: "Username must be at least 2 characters.",
          })
          .optional()
      : z.string().optional(),

    jobTitle: selectedTemplete.personalInfo.jobTitle
      ? z.string().min(2, {
          message: "Job title must be at least 2 characters.",
        })
      : z.string().optional(),

    email: selectedTemplete.personalInfo.email
      ? z.string().email({ message: "Invalid email address." })
      : z.string().optional(),

    phone: selectedTemplete.personalInfo.phone
      ? z
          .string()
          .min(10, {
            message: "Phone number must be at least 10 characters.",
          })
          .max(10, {
            message: "Phone number must be at most 15 characters.",
          })
          .max(15, {
            message: "Phone number must be at most 15 characters.",
          })
          .regex(phoneRegex, {
            message: "Phone number is invalid.",
          })
      : z.string().optional(),

    website: selectedTemplete.personalInfo.website
      ? z.string().url({ message: "Invalid URL." })
      : z.string().optional(),

    address1: selectedTemplete.personalInfo.address
      ? z.string().min(5, {
          message: "Address must be at least 5 characters.",
        })
      : z.string().optional(),

    address2: selectedTemplete.personalInfo.address
      ? z.string().min(5, {
          message: "Address must be at least 5 characters.",
        })
      : z.string().optional(),
  });

  const form = useForm<z.infer<typeof personalInformationFormSchema>>({
    resolver: zodResolver(personalInformationFormSchema),
    values: {
      name: "",
      jobTitle: "",
      email: "",
      phone: "",
      website: "",
      address1: "",
      address2: "",
    },
  });

  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [showResume, setShowResume] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<PersonalInfo[]>([]);
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<
    string | null
  >(null);
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  async function saveData(data: {
    name?: string | undefined;
    jobTitle?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    website?: string | undefined;
    address1?: string | undefined;
    address2?: string | undefined;
  }) {
    const personalInfo: PersonalInfo = {
      id: selectedSuggestionId || "",
      name: data.name || "",
      jobTitle: data.jobTitle || "",
      email: data.email || "",
      phone: data.phone || "",
      website: data.website || "",
      address1: data.address1 || "",
      address2: data.address2 || "",
    };

    const res = await action.setPersonalInfo(personalInfo, session);
    if (res != null) {
      const newResume = { ...resumeState, personalInfo: personalInfo };
      pushResume(newResume, session);
    }
  }

  async function getSuggestions() {
    const res = await action.getPersonalInfo(session);

    if (
      !res.success ||
      !res.personalInfoData ||
      res.personalInfoData.length == 0
    ) {
      setSuggestions([]);
      return;
    }

    const suggestionsList: PersonalInfo[] = res.personalInfoData.map((item) => {
      return {
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        website: item.website || "",
        jobTitle: item.jobTitle,
        address1: item.address1,
        address2: item.address2,
      };
    });
    setSuggestions(suggestionsList);
  }

  useEffect(() => {
    const id = searchParams.get("id");
    if (resumeState.id == "" && id != null) {
      setResumeStateById(id, session);
    }
    if (resumeState.id == "" && session) setResumeToDefaultState();
  }, [session]);

  useEffect(() => {
    if (session) {
      getSuggestions();
    }
  }, [session]);

  useEffect(() => {
    console.log("resumeState", resumeState);
    if (resumeState.personalInfo) {
      form.setValue("name", resumeState.personalInfo.name);
      form.setValue("jobTitle", resumeState.personalInfo.jobTitle);
      form.setValue("email", resumeState.personalInfo.email);
      form.setValue("phone", resumeState.personalInfo.phone);
      form.setValue("website", resumeState.personalInfo.website);
      form.setValue("address1", resumeState.personalInfo.address1);
      form.setValue("address2", resumeState.personalInfo.address2);
      setIsButtonDisable(true);
    }
  }, [resumeState]);

  form.watch(() => {
    setIsButtonDisable(false);
  });

  if (!resumeState.template == null || status == "unauthenticated") {
    return redirect("/create-resume");
  }

  return (
    <div className=" my-[9rem] min-h-screen w-full">
      {/* //Title of the page */}
      <div className="mb-20 flex flex-col items-center justify-center">
        <h2 className="mb-3 text-center text-4xl font-bold">{Steps[1].name}</h2>
        <p className="text-center text-lg font-medium text-primary">
          {Steps[1].desc}
        </p>
      </div>

      {/* //Suggestion Box */}
      {suggestions.length > 0 && (
        <SuggestionBox className="bg-secondary/60">
          {suggestions.map((item, index) => (
            <CarouselItem
              key={index}
              className="h-full md:basis-1/3 2xl:basis-1/5"
            >
              <div className="p-1">
                <Card
                  className={`relative h-full cursor-pointer p-[3px] text-start ${
                    selectedSuggestionId == item.id && "grainy-gradient2 "
                  }`}
                >
                  <div
                    className="flex h-full  w-full flex-col gap-1 rounded-md bg-white text-xs"
                    onClick={() => {
                      setSelectedSuggestionId(item.id);
                      form.setValue("name", item.name);
                      form.setValue("jobTitle", item.jobTitle);
                      form.setValue("email", item.email);
                      form.setValue("phone", item.phone);
                      form.setValue("website", item.website);
                      form.setValue("address1", item.address1);
                      form.setValue("address2", item.address2);
                    }}
                  >
                    <CardHeader className="pb-2">
                      <h3 className="text-base font-semibold">{item.name}</h3>
                      <p className="font-medium">
                        {item.jobTitle} <br />
                      </p>
                    </CardHeader>
                    <CardContent className="">
                      <div className="flex flex-col gap-1">
                        <p>{item.address1}</p>
                        <p>{item.address2}</p>
                        <p>{item.phone}</p>
                        <p>{item.email}</p>
                      </div>
                    </CardContent>
                  </div>
                  <span
                    className="absolute right-2 top-2"
                    onClick={async () => {
                      toast.promise(action.deletePersonalInfo(item.id), {
                        loading: "Deleting...",
                        success: () => {
                          getSuggestions();
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
        <section className="relative flex w-full max-w-xl flex-col items-center justify-center rounded-lg border-2 border-primary bg-white p-5 pt-10 lg:w-1/2 lg:max-w-none ">
          {/* // This is the pdf for the user to input their personal information */}
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
            Edit Your Personal Information
          </h3>
          <div className="container mt-10 flex w-11/12 flex-col gap-5 rounded-md bg-secondary/60 p-10">
            {/* // This is the form for the user to input their personal information */}
            <h4 className="flex items-center justify-between text-lg font-medium">
              Personal Information
            </h4>
            <PersonalInformationForm
              form={form}
              selectedTempletePersonInfo={selectedTemplete.personalInfo}
              setSelectedSuggestionId={setSelectedSuggestionId}
              submit={saveData}
              className="w-full"
              isDisabled={isButtonDisable}
            />
          </div>
        </section>

        {/* // This is the pdf for the user to input their personal information */}
        <section
          className={`relative max-w-xl overflow-hidden rounded-lg border-primary transition-all lg:max-w-none ${
            showResume
              ? "h-screen w-full max-w-xl border-2 p-1 lg:h-auto lg:w-1/2"
              : "h-0 max-w-xl lg:h-auto lg:w-0"
          }`}
        >
          <div
            className="relative flex h-full w-full items-center justify-center bg-white"
            id="pdf"
          >
            <PdfDoc
              personalInfo={{
                id: selectedSuggestionId ?? "",
                name: form.watch("name") ?? "",
                jobTitle: form.watch("jobTitle") ?? "",
                email: form.watch("email") ?? "",
                phone: form.watch("phone") ?? "",
                website: form.watch("website") ?? "",
                address1: form.watch("address1") ?? "",
                address2: form.watch("address2") ?? "",
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
