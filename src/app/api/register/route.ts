import bcrypt from "bcrypt";
import db from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json(
      {
        message: "Missing name, email or password",
      },
      { status: 400 },
    );
  }

  const existUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existUser) {
    return NextResponse.json(
      {
        message: "User already exists",
      },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
