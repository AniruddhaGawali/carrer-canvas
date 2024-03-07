"use server";

import db from "@/db";
import { Session } from "next-auth";

export async function uploadResume(data: Resume, session: Session | null) {
  if (!session?.user) return { success: false, message: "User not found" };

  if (data.id == "") {
    const res = await db.resume.create({
      data: {
        title: data.title,
        userId: session.user.id,
      },
      include: {},
    });

    return { success: true, message: "Resume saved", res };
  } else {
    const res = await db.resume.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        userId: session.user.id,
        template: data.template,
        social: data.social,
        personalInfoId: data.personalInfo?.id,
      },
      include: {
        personalInfo: true,
      },
    });

    return { success: true, message: "Resume saved", res };
  }
}

export async function getResumes(session: Session | null) {
  if (!session?.user) return { success: false, message: "User not found" };

  const resumes = await db.resume.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      personalInfo: true,
    },
  });

  return { success: true, message: "Resumes found", resumes };
}

export async function getResumeById(id: string) {
  const resume = await db.resume.findFirst({
    where: {
      id: id,
    },
    include: {
      personalInfo: true,
    },
  });

  return { success: true, message: "Resume found", resume };
}

export async function deleteResume(id: string, session: Session | null) {
  if (!session?.user) return { success: false, message: "User not found" };

  const res = await db.resume.delete({
    where: {
      id: id,
    },
  });

  return { success: true, message: "Resume deleted", res };
}
