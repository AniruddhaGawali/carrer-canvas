"use client";
import React, { useEffect, useState } from "react";
import PdfDoc from "@/components/pdfView";
import * as actions from "@/actions";
import { useParams } from "next/navigation";
import { set } from "date-fns";
import { LoadingSpinner } from "@/components/ui/loading";

type Props = {};

function SharePage({}: Props) {
  const { id } = useParams();
  const [data, setData] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  async function getResumeData(id: string) {
    setLoading(true);
    const res = await actions.getSharedResumeById(id);
    if (res) {
      const newResume: Resume = {
        id: res.id,
        title: res.title,
        userId: res.userId,
        template: res.template,
        awardsAndCertifications:
          res.awardsAndCertifications as AwardsAndCertifications[],
        education: res.education as Education[],
        experience: res.experience as Experience[],
        personalInfo: res.personalInfo as PersonalInfo,
        project: res.project as Project[],
        skills: res.skills as Skill[] | [], // Fix: Change type to Skill[] | null[]
        social: res.social as Social,
      };

      setData(newResume);
    }
    setLoading(false);
  }

  useEffect(() => {
    getResumeData(id.toString());
  }, []);

  if (loading && !data) {
    return (
      <div>
        <LoadingSpinner className="h-20 w-20 fill-black text-white dark:text-gray-600" />
      </div>
    );
  }
  return (
    <div className="z-10 m-auto mt-20 h-screen w-full bg-transparent p-10 sm:w-[90%] md:w-1/2">
      <PdfDoc
        awardsAndCertifications={data?.awardsAndCertifications}
        education={data?.education}
        experience={data?.experience}
        personalInfo={data?.personalInfo}
        projects={data?.project}
        skills={data?.skills}
        social={data?.social}
      />
    </div>
  );
}

export default SharePage;
