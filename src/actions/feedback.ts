"use server";

import db from "@/db";

export async function feedback(data: {
  name: string;
  email: string;
  feedback: string;
}) {
  try {
    const res = await db.feedback.create({
      data: data,
    });

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}
