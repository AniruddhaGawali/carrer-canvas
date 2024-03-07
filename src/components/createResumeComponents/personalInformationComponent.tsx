/* eslint-disable react-hooks/exhaustive-deps */
"use client";

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
import {
  deletePersonalInfo,
  getPersonalInfo,
  savePersonalInfo,
} from "@/actions";
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
  } = useResume();

  const defautPersonalInfo: PersonalInfo = {
    id: "",
    name: "",
    email: "",
    phone: "",
    website: "",
    jobTitle: "",
    address1: "",
    address2: "",
  };

  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [showResume, setShowResume] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<PersonalInfo[]>([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<number>(-1);
  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfo>(defautPersonalInfo);

  const selectedTemplete =
    resumeState.template != null
      ? templetes[resumeState.template]
      : templetes[0];

  async function saveData() {
    setResumePersonalInfo(personalInfo);
    toast.promise(
      savePersonalInfo(personalInfo, resumeState, session).then((e) => {
        if (!e || !e.newResume) return;
        setResumePersonalInfo(e.newResume.personalInfo as PersonalInfo);
      }),
      {
        loading: "Saving...",
        success: "Saved Successfully",
        error: "Error Saving",
      },
    );
  }

  async function getSuggestions() {
    const res = await getPersonalInfo(session);

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
    if (resumeState.personalInfo) {
      setPersonalInfo(resumeState.personalInfo);
    }
  }, []);

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

  if (!resumeState.template == null) {
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
        <SuggestionBox>
          {suggestions.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
              <div className="p-1">
                <Card
                  className={`relative cursor-pointer p-[3px] text-start ${
                    selectedSuggestions === index && "grainy-gradient2 "
                  }`}
                  onClick={() => {
                    if (selectedSuggestions === index) {
                      setPersonalInfo(defautPersonalInfo);
                      setSelectedSuggestions(-1);
                      return;
                    }

                    setPersonalInfo({
                      id: item.id,
                      name: item.name,
                      email: item.email,
                      phone: item.phone,
                      website: item.website,
                      jobTitle: item.jobTitle,
                      address1: item.address1,
                      address2: item.address2,
                    });

                    setSelectedSuggestions(index);
                  }}
                >
                  <div className="flex h-full w-full flex-col gap-1 rounded-md bg-white text-xs">
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
                      toast.promise(deletePersonalInfo(item.id), {
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

          {/* // This is the form for the user to input their personal information */}
          <PersonalInformationForm
            personalInformation={personalInfo}
            changePersonalInformation={setPersonalInfo}
            saveData={saveData}
            setSelectedSuggestions={setSelectedSuggestions}
            selectedTempletePersonInfo={selectedTemplete.personalInfo}
            className="container mt-10 flex w-full flex-col md:w-3/4"
          />
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
            <PdfDoc personalInfo={personalInfo} social={resumeState.social} />
          </div>
        </section>
      </div>
    </div>
  );
}
