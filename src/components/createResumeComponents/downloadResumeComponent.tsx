"use client";

import React, { useEffect } from "react";
import { StepsLinks as Steps } from "@/data/resume-step";
import { Button } from "../ui/button";
import PdfDoc from "../pdfView";
import useResume from "@/redux/dispatch/useResume";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Classic1 } from "@/data/resume-templetes/classic/default";
import dynamic from "next/dynamic";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

type Props = {};

export default function DownloadResumeComponent({}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { width, height } = useWindowSize();

  const { data: session, status } = useSession();
  const { resumeState, setResumeStateById, setResumeToDefaultState } =
    useResume();

  useEffect(() => {
    const id = searchParams.get("id");
    if (resumeState.id == "" && id != null) {
      setResumeStateById(id, session);
    }
    if (resumeState.id == "" && session) setResumeToDefaultState();
  }, [session]);

  if (status == "unauthenticated") {
    router.push("/register");
  }

  return (
    <>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        confettiSource={{
          x: 0,
          y: height * 0.83,
          w: 0,
          h: 0,
        }}
        numberOfPieces={1000}
        initialVelocityX={20}
        initialVelocityY={20}
        gravity={0.1}
      />

      <div className=" my-[9rem] min-h-screen w-full">
        <div className="mb-20 flex flex-col items-center justify-center">
          <PDFDownloadLink
            document={
              <Classic1
                personalInfo={resumeState.personalInfo}
                education={resumeState.education}
                experience={resumeState.experience}
                awardsAndCertifications={resumeState.awardsAndCertifications}
                skills={resumeState.skills}
                social={resumeState.social}
              />
            }
            fileName="somename.pdf"
          >
            <Button
              size={"lg"}
              className="grainy-gradient2 border-2 border-transparent p-10 text-2xl font-bold text-primary hover:border-primary hover:bg-white"
            >
              {Steps[6].name}
            </Button>
          </PDFDownloadLink>

          <p className="mt-5 text-center text-lg font-medium text-primary">
            {Steps[6].desc}
          </p>
        </div>
        <div className="m-auto h-screen w-1/2">
          <PdfDoc
            personalInfo={resumeState.personalInfo}
            education={resumeState.education}
            experience={resumeState.experience}
            awardsAndCertifications={resumeState.awardsAndCertifications}
            skills={resumeState.skills}
            social={resumeState.social}
          />
        </div>
      </div>
    </>
  );
}
