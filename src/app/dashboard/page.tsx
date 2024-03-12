"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { getResumes } from "@/actions/resume";
import useResume from "@/redux/dispatch/useResume";
import GridLoading from "@/components/loadingComponents/gridLoading";
import * as action from "@/actions";
import { Button } from "@/components/ui/button";
import DashboardLoading from "@/components/loadingComponents/dashboardLoading";
import DashboardGrid from "@/components/dashboardGrid";

type Props = {};

function Dashboard({}: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isResumeLoading, setIsResumeLoading] = useState<boolean>(true);
  const { setResumeToDefaultState, setResumeState } = useResume();

  async function fetchResumes() {
    setIsResumeLoading(true);
    const res = await getResumes(session);
    if (res) {
      console.log(res);
      setResumes(res as unknown as Resume[]);
    }
    setIsResumeLoading(false);
  }

  useEffect(() => {
    fetchResumes();
    setResumeToDefaultState();
  }, [session]);

  if (status == "loading") {
    return <DashboardLoading />;
  }

  if (status == "unauthenticated") {
    router.push("/auth/signin");
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <div
        className="grainy-gradient2 container my-20 mt-[9rem] flex h-32  cursor-pointer items-center justify-center rounded-xl bg-black transition-all hover:border-[3px] hover:border-black"
        onClick={() => router.push("/create-resume")}
      >
        <Plus size={64} />
      </div>

      <h2 className="container w-full text-6xl font-bold">Your Resumes</h2>

      {isResumeLoading ? (
        <GridLoading />
      ) : (
        <>
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
            <DashboardGrid fetchResumes={fetchResumes} resumes={resumes} />
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
