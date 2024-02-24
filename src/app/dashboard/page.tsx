"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

type Props = {};

function Dashboard({}: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    redirect("/register");
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <div
        className="grainy-gradient2 container my-20 mt-[9rem] flex h-32  cursor-pointer items-center justify-center rounded-xl bg-black transition-all hover:border-[3px] hover:border-black"
        onClick={() => router.push("/create-resume")}
      >
        <Plus size={64} />
      </div>

      <h2 className="container w-full text-6xl font-bold">Dashboard</h2>

      <div className="container my-20  grid grid-cols-3 items-center justify-center gap-20">
        {Array.from(Array(12).keys()).map((item, index) => (
          <div
            key={index}
            className=" grainy-black
            group flex h-96 w-full cursor-pointer items-end justify-center overflow-hidden rounded-lg transition-all hover:scale-110 hover:shadow-2xl
          "
          >
            <div className=" h-3/4 w-2/3 rounded-xl rounded-b-none bg-white transition-all group-hover:scale-110 group-hover:shadow-2xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
