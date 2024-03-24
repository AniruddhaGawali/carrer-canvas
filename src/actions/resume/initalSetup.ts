"use server";

import db from "@/db";
import { Session } from "next-auth";

export async function uploadResume(data: Resume, session: Session | null) {
  if (!session?.user) return null;
  console.log(data);

  if (data.id == "") {
    const res = await db.resume.create({
      data: {
        title: data.title,
        userId: session.user.id,
      },
    });

    return res;
  } else {
    console.log(data.experience);
    const res = await db.resume.update({
      where: {
        id: data.id,
      },

      data: {
        title: data.title,
        userId: session.user.id,
        template: data.template,
        personalInfo: data.personalInfo ?? null,
        skills: data.skills ?? [],
        social: data.social,
        awardsAndCertifications: data.awardsAndCertifications ?? [],
        education: data.education ?? [],
        experience: data.experience ?? [],
        project: data.project ?? [],
      },
    });

    return res;
  }
}

export async function copyResume(resume: Resume, session: Session | null) {
  if (!session?.user) return null;

  const res = await db.resume.create({
    data: {
      title: resume.title + " Copy",
      userId: session.user.id,
      template: resume.template,
      personalInfo: resume.personalInfo ?? null,
      skills: resume.skills ?? [],
      social: resume.social,
      awardsAndCertifications: resume.awardsAndCertifications ?? [],
      education: resume.education ?? [],
      experience: resume.experience ?? [],
      project: resume.project ?? [],
    },
  });

  const newResume: Resume = {
    id: res.id,
    title: res.title,
    userId: res.userId,
    template: res.template,
    personalInfo: res.personalInfo as PersonalInfo,
    skills: res.skills as Skill[],
    social: res.social as Social,
    awardsAndCertifications:
      res.awardsAndCertifications as AwardsAndCertifications[],
    education: res.education as Education[],
    experience: res.experience as Experience[],
    project: res.project as Project[],
  };

  return newResume;
}

export async function getResumes(session: Session | null) {
  if (!session?.user) return null;

  const resumes = await db.resume.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return resumes;
}

export async function getResumeById(id: string, session: Session | null) {
  if (!session) return null;
  const resume = await db.resume.findFirst({
    where: {
      id: id,
      userId: session.user.id,
    },
  });

  return resume;
}

export async function getSharedResumeById(id: string) {
  const resume = await db.resume.findFirst({
    where: {
      id: id,
    },
  });

  return resume;
}

export async function deleteResume(id: string, session: Session | null) {
  if (!session?.user) return { success: false, message: "User not found" };

  const res = await db.resume.delete({
    where: {
      id: id,
    },
  });

  return res;
}
