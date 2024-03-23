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
import DashboardGrid from "@/components/pages/dashboard/dashboardGrid";

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
    router.push("/login");
  }

  return (
    <div className="mt-[9rem] flex flex-col items-center  justify-center ">
      {resumes.length > 0 && (
        <div
          className="grainy-gradient2 container flex  h-32 cursor-pointer items-center justify-center rounded-xl bg-black transition-all hover:border-[3px] hover:border-black"
          onClick={() => router.push("/create-resume")}
        >
          <Plus size={64} />
        </div>
      )}

      <h2 className="container mt-32 w-full text-6xl font-bold">
        Your Resumes
      </h2>

      {isResumeLoading ? (
        <GridLoading />
      ) : (
        <>
          {resumes.length === 0 ? (
            <div className="relative m-auto mt-20 flex min-h-screen w-full flex-col items-center justify-self-center">
              <div
                className="grainy-gradient2 container flex h-32  cursor-pointer items-center justify-center rounded-xl bg-black transition-all hover:border-[3px] hover:border-black"
                onClick={() => router.push("/create-resume")}
              >
                <Plus size={64} />
              </div>
              <div className="absolute right-[32rem] top-24 m-auto">
                <Image
                  src="/images/curved_arrow.png"
                  width={150}
                  height={150}
                  alt="arrow"
                  className=" pointer-events-none rotate-[130deg] -scale-x-100"
                />
              </div>
              <h2 className="rounded-m my-5  py-3 text-center text-3xl font-medium ">
                You don&apos;t have any resumes yet.
                <br />
                Click to create one.
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
