import BottonNavigationBar from "@/components/navigationBottomBar";
import { StepsLinks } from "@/data/resume-step";
import React from "react";
import type { Metadata } from "next";

export let metadata: Metadata = {
  title: "Create Resume | Career Canves",
  description:
    "Craft. Create. Captivate. Elevate Your Career with Career Canves",
};

export default function StepLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const paths = StepsLinks.map((step) => step.path);

  const index = paths.indexOf(params.step);

  metadata = {
    title: `${StepsLinks[index].name} | Career Canves`,
    description: StepsLinks[index].desc,
  };
  return (
    <>
      {children}
      <BottonNavigationBar currentStep={index} />
    </>
  );
}
