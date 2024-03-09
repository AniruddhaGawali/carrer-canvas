"use server";

import db from "@/db";
import { Session } from "next-auth";

export async function getEducation(session: Session) {
  try {
    const res = await db.education.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return res;
  } catch (error) {
    return null;
  }
}

export async function getAwardsAndCertifications(session: Session) {
  try {
    const res = await db.awardsAndCertifications.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return res;
  } catch (error) {
    return null;
  }
}

export async function setEducation(education: Education[], session: Session) {
  try {
    let resArray: Education[] = [];

    for (const edu of education) {
      if (edu.id.length <= 12) {
        const res = await db.education.create({
          data: {
            userId: session.user.id,
            college: edu.college,
            degree: edu.degree,
            startDate: edu.startDate,
            endDate: edu.endDate,
            description: edu.description,
          },
        });

        resArray.push({
          college: res.college,
          degree: res.degree,
          endDate: res.endDate.toLocaleDateString(),
          id: res.id,
          startDate: res.startDate.toLocaleDateString(),
          description: res.description,
        });
      } else {
        resArray.push(edu);
      }
    }

    return resArray;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function setAwardsAndCertifications(
  awardsAndCertifications: AwardsAndCertifications[],
  session: Session,
) {
  try {
    let resArray: AwardsAndCertifications[] = [];

    for (const award of awardsAndCertifications) {
      if (award.id.length <= 12) {
        const res = await db.awardsAndCertifications.create({
          data: {
            userId: session.user.id,
            name: award.name,
            date: award.date,
            description: award.description,
          },
        });

        resArray.push({
          name: res.name,
          date: res.date.toLocaleDateString(),
          id: res.id,
          description: res.description,
        });
      } else {
        resArray.push(award);
      }
    }

    return resArray;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteEducation(id: string) {
  try {
    const res = await db.education.delete({
      where: {
        id: id,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteAwardsAndCertifications(id: string) {
  try {
    const res = await db.awardsAndCertifications.delete({
      where: {
        id: id,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateEducation(education: Education) {
  try {
    const res = await db.education.update({
      where: {
        id: education.id,
      },
      data: {
        college: education.college,
        degree: education.degree,
        startDate: education.startDate,
        endDate: education.endDate,
        description: education.description,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateAwardsAndCertifications(
  award: AwardsAndCertifications,
) {
  try {
    const res = await db.awardsAndCertifications.update({
      where: {
        id: award.id,
      },
      data: {
        name: award.name,
        date: award.date,
        description: award.description,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function setEducationInResume(
  education: Education[],
  resume: Resume,
) {
  try {
    const res = await db.resume.update({
      where: {
        id: resume.id,
      },
      data: {
        education: {
          set: education,
        },
      },
      include: {
        personalInfo: true,
      },
    });

    const newResume: Resume = {
      ...resume,
      education: education,
    };

    return newResume;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function setAwardsAndCertificationsInResume(
  awardsAndCertifications: AwardsAndCertifications[],
  resume: Resume,
) {
  try {
    const res = await db.resume.update({
      where: {
        id: resume.id,
      },
      data: {
        awardsAndCertifications: {
          set: awardsAndCertifications,
        },
      },
      include: {
        personalInfo: true,
      },
    });

    const newResume: Resume = {
      ...resume,
      awardsAndCertifications: awardsAndCertifications,
    };

    return newResume;
  } catch (error) {
    console.log(error);
    return null;
  }
}
