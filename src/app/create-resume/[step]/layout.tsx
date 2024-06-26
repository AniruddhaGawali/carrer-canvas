import BottonNavigationBar from "@/components/navigationBottomBar";
import { StepsLinks } from "@/data/resume-step-navigation";
import React from "react";
import type { Metadata } from "next";
import IsDetailSavedProvider from "@/provider/isDetailSavedProvider";

export let metadata: Metadata = {
  title: "Create Resume | Career Canvas",
  description:
    "Craft. Create. Captivate. Elevate Your Career with Career Canvas",
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
    title: `${StepsLinks[index].name} | Career Canvas`,
    description: StepsLinks[index].desc,
  };
  return (
    <>
      <IsDetailSavedProvider>
        {children}
        <BottonNavigationBar currentStep={index} />
      </IsDetailSavedProvider>
    </>
  );
}
