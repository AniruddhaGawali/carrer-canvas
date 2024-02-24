"use client";

import React from "react";
import Model from "@/components/model";
import { StepsLinks } from "@/data/resume-step";
import { notFound, useParams } from "next/navigation";

type Props = {};

function Steps({}: Props) {
  const params = useParams<{ step: string }>();
  // const showModel =  parseInt(params.step) - 1 == 1;

  const paths = StepsLinks.map((step) => step.path);
  if (!paths.includes(params.step)) return notFound();

  const index = paths.indexOf(params.step);
  return (
    <>
      {StepsLinks[index].component}

      {/* {showModel && <Model>a</Model>} */}
    </>
  );
}

export default Steps;
