"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { getResumes } from "@/actions/resume";
import useResume from "@/redux/dispatch/useResume";

type Props = {};

function Dashboard({}: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const { setResumeToDefaultState, setResumeState } = useResume();

  async function fetchResumes() {
    const res = await getResumes(session);
    if (res.success) {
      setResumes(res.resumes as Resume[]);
    }
  }

  useEffect(() => {
    fetchResumes();
    setResumeToDefaultState();
  }, []);

  if (!session) {
    redirect("/register");
  }

  console.log("resumes", resumes);
  return (
    <div className="flex flex-col items-center justify-center ">
      <div
        className="grainy-gradient2 container my-20 mt-[9rem] flex h-32  cursor-pointer items-center justify-center rounded-xl bg-black transition-all hover:border-[3px] hover:border-black"
        onClick={() => router.push("/create-resume")}
      >
        <Plus size={64} />
      </div>

      <h2 className="container w-full text-6xl font-bold">Your Resumes</h2>

      {resumes.length === 0 ? (
        <div className="m-auto mt-20 flex min-h-screen flex-col items-center justify-center">
          <div className="w-1/2">
            <Image
              src={"/images/empty.svg"}
              alt="Empty"
              width="0"
              height="0"
              sizes="100vw"
              className=" h-auto w-full opacity-70"
            />
          </div>
          <h2 className="my-10 text-center text-5xl font-medium ">
            You don&apos;t have any resumes yet.
          </h2>
        </div>
      ) : (
        <div className="container my-20  grid grid-cols-3 items-center justify-center gap-20">
          <>
            {resumes.map((item, index) => (
              <div
                key={index}
                className=" grainy-black
            group flex h-96 w-full cursor-pointer items-end justify-center overflow-hidden rounded-lg transition-all hover:scale-110 hover:shadow-2xl
          "
                onClick={() => {
                  setResumeState(item);
                  router.push("/create-resume");
                }}
              >
                <div className=" h-3/4 w-2/3 rounded-xl rounded-b-none bg-white transition-all group-hover:scale-110 group-hover:shadow-2xl"></div>
              </div>
            ))}
          </>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
