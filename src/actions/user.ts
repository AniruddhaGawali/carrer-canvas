import db from "@/db";

export async function getUserById(id: string) {
  const user = await db.user.findFirst({
    where: {
      id: id,
    },
  });

  return user;
}
