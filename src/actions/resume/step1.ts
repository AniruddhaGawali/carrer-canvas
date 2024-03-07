"use server";
import db from "@/db";

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
