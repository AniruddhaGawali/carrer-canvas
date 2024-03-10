"use server";
import db from "@/db";
import { Session } from "next-auth";

export async function getExperiences(session: Session) {
  const userId = session.user.id;
  try {
    const experiences = await db.experience.findMany({
      where: {
        userId: userId,
      },
    });
    return experiences;
  } catch (error) {
    return null;
  }
}

export async function setExperiences(
  experiences: Experience[],
  session: Session,
) {
  const userId = session.user.id;
  try {
    let resArray: Experience[] = [];

    for (const experience of experiences) {
      if (experience.id.length < 12) {
        const res = await db.experience.create({
          data: {
            userId: userId,
            position: experience.position,
            company: experience.company,
            location: experience.location,
            startDate: experience.startDate,
            endDate: experience.endDate,
            description: experience.description,
          },
        });
        resArray.push({
          company: res.company,
          description: res.description,
          endDate: res.endDate.toLocaleDateString(),
          id: res.id,
          location: res.location,
          position: res.position,
          startDate: res.startDate.toLocaleDateString(),
        });
      } else {
        resArray.push(experience);
      }
    }

    return resArray;
  } catch (error) {
    return null;
  }
}

export async function deleteExperience(experienceId: string, session: Session) {
  const userId = session.user.id;
  try {
    const res = await db.experience.delete({
      where: {
        id: experienceId,
        AND: {
          userId: userId,
        },
      },
    });

    return res;
  } catch (error) {
    return null;
  }
}

export async function updateExperience(
  experience: Experience,
  session: Session,
) {
  const userId = session.user.id;
  try {
    const res = await db.experience.update({
      where: {
        id: experience.id,
      },
      data: {
        userId: userId,
        position: experience.position,
        company: experience.company,
        location: experience.location,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: experience.description,
      },
    });

    return res;
  } catch (error) {
    return null;
  }
}

export async function setExperiencesInResume(
  experiences: Experience[],
  resumeId: string,
) {
  try {
    const res = await db.resume.update({
      where: {
        id: resumeId,
      },
      data: {
        experience: {
          set: experiences,
        },
      },
    });

    return res;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
