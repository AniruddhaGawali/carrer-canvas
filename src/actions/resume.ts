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
      include: {
        personalInfo: true,
      },
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
        socialLink: data.social,
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

export async function setResumeTemplete(id: string, template: number) {
  const res = await db.resume.update({
    where: {
      id: id,
    },
    data: {
      template: template,
    },
  });

  return { success: true, message: "Resume template updated", res };
}

export async function getPersonalInfo(session: Session | null) {
  if (!session?.user) return { success: false, message: "User not found" };

  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return { success: false, message: "User not found" };

  const personalInfoData = await db.personalInfo.findMany({
    where: {
      userId: user.id,
    },
  });

  return { success: true, message: "Personal info found", personalInfoData };
}

export async function savePersonalInfo(
  data: PersonalInfo,
  resume: Resume,
  session: Session | null,
) {
  if (!session?.user) return { success: false, message: "User not found" };

  let alreadyExists;
  if (data.id != "") {
    alreadyExists = await db.personalInfo.findFirst({
      where: {
        id: data.id,
      },
    });
  }

  if (
    alreadyExists &&
    alreadyExists.address1 == data.address1 &&
    alreadyExists.address2 == data.address2 &&
    alreadyExists.email == data.email &&
    alreadyExists.phone == data.phone &&
    alreadyExists.jobTitle == data.jobTitle &&
    alreadyExists.name == data.name &&
    alreadyExists.website == data.website
  ) {
    const newResume = await db.resume.update({
      where: {
        id: resume.id,
      },
      data: {
        personalInfoId: data.id,
      },
      include: {
        personalInfo: true,
      },
    });

    return { success: true, message: "Personal info saved", newResume };
  }

  const res = await db.personalInfo.create({
    data: {
      userId: session.user.id,
      address1: data.address1,
      address2: data.address2,
      email: data.email,
      phone: data.phone,
      jobTitle: data.jobTitle,
      name: data.name,
      website: data.website,
    },
  });

  const newResume = await db.resume.update({
    where: {
      id: resume.id,
    },
    data: {
      personalInfoId: res.id,
    },
    include: {
      personalInfo: true,
    },
  });

  return { success: true, message: "Personal info saved", newResume };
}

export async function deletePersonalInfo(id: string) {
  const res = await db.personalInfo.delete({
    where: {
      id: id,
    },
  });

  return { success: true, message: "Personal info deleted", res };
}
