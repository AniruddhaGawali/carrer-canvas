"use client";

import React, { useEffect, useState } from "react";
import { StepsLinks as Steps } from "@/data/resume-step";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import EducationForm from "../forms/educationForm";
import { Separator } from "../ui/separator";
import CertificationForm from "../forms/certificationForm";
import * as action from "@/actions";
import { useSession } from "next-auth/react";
import useResume from "@/redux/dispatch/useResume";
import LoadingButton from "../loadingButton";

type Props = {};

export default function EducationAndCertificationComponents({}: Props) {
  const { data: session } = useSession();
  const { resumeState, saveResumeState, setResumeState } = useResume();
  const [showResume, setShowResume] = useState<boolean>(false);
  const [education, setEducation] = useState<Education[]>([]);
  const [certification, setCertification] = useState<AwardsAndCertifications[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const educationAndCertification = [...education, ...certification];

  async function addEducationAndCertification() {
    if (session) {
      const resEducation = await action.setEducation(education, session);
      const resCertification = await action.setAwardsAndCertifications(
        certification,
        session,
      );

      if (resEducation && resCertification) {
        setCertification(resCertification);
        setEducation(resEducation);
        await action.setEducationInResume(resEducation, resumeState);
        const res = await action.setAwardsAndCertificationsInResume(
          resCertification,
          resumeState,
        );
        console.log(res);
        if (res) setResumeState(res);
      }
    }
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
            <section className="container mt-10 flex w-5/6 flex-col gap-5">
              <h4 className="flex items-center justify-between text-lg font-medium">
                Education
              </h4>
              <EducationForm
                education={education}
                setEducation={setEducation}
              />
            </section>

            <Separator
              orientation="horizontal"
              className="my-5 w-full border-t border-primary"
            />

            <section className="container mt-5 flex w-5/6 flex-col gap-5">
              <h4 className="flex items-center justify-between text-lg font-medium">
                Certification
              </h4>
              <CertificationForm
                certification={certification}
                setCertification={setCertification}
              />
            </section>
          </div>

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
