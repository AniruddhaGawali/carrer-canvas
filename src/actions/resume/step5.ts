"use server";
import db from "@/db";
import { Session } from "next-auth";

export async function getProjects(session: Session) {
  const userId = session.user.id;
  try {
    const projects = await db.project.findMany({
      where: {
        userId: userId,
      },
    });
    return projects;
  } catch (error) {
    return null;
  }
}

export async function setProjects(
  projects: Project[],
  session: Session | null,
) {
  if (!session) return null;
  const userId = session.user.id;
  try {
    let resArray: Project[] = [];

    for (const project of projects) {
      if (project.id.length <= 12) {
        const res = await db.project.create({
          data: {
            userId: userId,
            name: project.name,
            projectType: project.projectType,
            link: project.link,
            startDate: project.startDate,
            endDate: project.endDate,
            description: project.description,
            tech: project.tech,
          },
        });
        resArray.push({
          name: res.name,
          description: res.description,
          endDate: res.endDate.toLocaleDateString(),
          id: res.id,
          link: res.link,
          projectType: res.projectType,
          startDate: res.startDate.toLocaleDateString(),
          tech: res.tech,
        });
      } else {
        resArray.push(project);
      }
    }

    return resArray;
  } catch (error) {
    return null;
  }
}

export async function deleteProject(id: string) {
  try {
    const res = await db.project.delete({
      where: {
        id: id,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting project");
  }
}

export async function updateProject(project: Project) {
  try {
    const res = await db.project.update({
      where: {
        id: project.id,
      },
      data: {
        name: project.name,
        projectType: project.projectType,
        link: project.link,
        startDate: project.startDate,
        endDate: project.endDate,
        description: project.description,
        tech: project.tech,
      },
    });
    return res;
  } catch (error) {
    return null;
  }
}
