"use server";
import db from "@/db";
import { Session } from "next-auth";

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

export async function setPersonalInfo(
  data: PersonalInfo,
  session: Session | null,
) {
  if (!session?.user) return null;

  if (data.id != "") {
    return true;
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

  return res;
}

export async function deletePersonalInfo(id: string) {
  const res = await db.personalInfo.delete({
    where: {
      id: id,
    },
  });

  return { success: true, message: "Personal info deleted", res };
}
