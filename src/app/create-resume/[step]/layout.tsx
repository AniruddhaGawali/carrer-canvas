import BottonNavigationBar from "@/components/navigationBottomBar";
import { StepsLinks } from "@/data/resume-step";
import { notFound } from "next/navigation";
import React from "react";

export default function StepLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const paths = StepsLinks.map((step) => step.path);
  if (!paths.includes(params.step)) return notFound();

  const index = paths.indexOf(params.step);
  return (
    <>
      {children}
      <BottonNavigationBar currentStep={index} />
    </>
  );
}
