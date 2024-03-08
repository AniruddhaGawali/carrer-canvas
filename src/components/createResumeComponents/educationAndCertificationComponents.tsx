"use client";

import React, { useState } from "react";
import { StepsLinks as Steps } from "@/data/resume-step";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import EducationForm from "../forms/educationForm";
import { Separator } from "../ui/separator";
import CertificationForm from "../forms/certificationForm";

type Props = {};

export default function EducationAndCertificationComponents({}: Props) {
  const [showResume, setShowResume] = useState<boolean>(false);

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
              <EducationForm />
            </section>

            <Separator
              orientation="horizontal"
              className="my-5 w-full border-t border-primary"
            />

            <section className="container mt-5 flex w-5/6 flex-col gap-5">
              <h4 className="flex items-center justify-between text-lg font-medium">
                Certification
              </h4>
              <CertificationForm />
            </section>
          </div>

          <Separator
            orientation="horizontal"
            className="my-5 w-full border-t border-primary"
          />

          <Button className="w-full max-w-md">Save</Button>
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
