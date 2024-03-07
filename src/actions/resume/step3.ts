"use server";
import db from "@/db";
import { Session } from "next-auth";

export async function getSkills(session: Session) {
  const userId = session.user.id;
  try {
    const skills = await db.skills.findFirst({
      where: {
        userId: userId,
      },
    });
    return skills;
  } catch (error) {
    return null;
  }
}

export async function setSkillsInResume(skills: Skill[], resume: Resume) {
  const resumeId = resume.id;
  try {
    const newResume = await db.resume.update({
      where: { id: resumeId },
      data: {
        skills: {
          set: skills,
        },
      },
      include: {
        personalInfo: true,
      },
    });
    return newResume;
  } catch (error) {
    return null;
  }
}

export async function setSkills(skills: Skill[], session: Session) {
  const userId = session.user.id;
  try {
    let skillData = await db.skills.findFirst({
      where: {
        userId: userId,
      },
    });

    if (skillData) {
      skillData = await db.skills.update({
        where: { id: skillData.id },
        data: {
          skills: {
            set: skills,
          },
        },
      });
    } else {
      skillData = await db.skills.create({
        data: {
          skills: {
            set: skills,
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

    return;
  } catch (error) {
    return null;
  }
}

export async function setSocial(social: Social, session: Session) {
  const userId = session.user.id;
  try {
    let socialData = await db.social.findFirst({
      where: {
        userId: userId,
      },
    });

    if (socialData) {
      socialData = await db.social.update({
        where: { id: socialData.id },
        data: {
          ...social,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } else {
      socialData = await db.social.create({
        data: {
          ...social,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

    return;
  } catch (error) {
    return null;
  }
}

export async function getSocial(session: Session) {
  const userId = session.user.id;
  try {
    const social = await db.social.findFirst({
      where: {
        userId: userId,
      },
    });
    return social;
  } catch (error) {
    return null;
  }
}

export async function setSocialInResume(social: Social, resume: Resume) {
  const resumeId = resume.id;
  try {
    const newResume = await db.resume.update({
      where: { id: resumeId },
      data: {
        social: {
          ...social,
        },
      },
      include: {
        personalInfo: true,
      },
    });
    return newResume;
  } catch (error) {
    return null;
  }
}
