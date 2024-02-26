"use server";
import db from "@/db";
import { Session } from "next-auth";

export async function getPersonalInfo(session: Session | null) {
  if (!session?.user) return { success: false, message: "User not found" };

  const user = await db.user.findFirst({
    where: {
      email: session.user.id,
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
  session: Session | null,
) {
  if (!session?.user) return { success: false, message: "User not found" };

  const alreadyExists = await db.personalInfo.findFirst({
    where: {
      id: data.id,
    },
  });

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
    return { success: true, message: "Personal info saved", alreadyExists };
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

  return { success: true, message: "Personal info saved", res };
}

export async function deletePersonalInfo(id: string) {
  const res = await db.personalInfo.delete({
    where: {
      id: id,
    },
  });

  return { success: true, message: "Personal info deleted", res };
}
