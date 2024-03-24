"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus, RefreshCcw } from "lucide-react";
import useResume from "@/redux/dispatch/useResume";
import GridLoading from "@/components/loadingComponents/gridLoading";
import DashboardLoading from "@/components/loadingComponents/dashboardLoading";
import DashboardGrid from "@/components/pages/dashboard/dashboardGrid";
import useResumeList from "@/redux/dispatch/useResumeList";
import { Button } from "@/components/ui/button";

type Props = {};

function Dashboard({}: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { setResumeToDefaultState, setResumeState } = useResume();
  const { fetchResumesList, resumeListState } = useResumeList();
  const [resumes, setResumes] = useState<Resume[]>(resumeListState.resumes);

  function fetchData() {
    fetchResumesList(session);
  }

  useEffect(() => {
    fetchData();
    setResumeToDefaultState();
  }, [session]);

  useEffect(() => {
    setResumes(resumeListState.resumes);
  }, [session, resumeListState.resumes]);

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

      <div className="container mb-10 mt-32 flex w-full items-center justify-between">
        <h2 className="container w-full text-6xl font-bold">Your Resumes</h2>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => fetchData()}
          title="Refresh Resumes"
        >
          <RefreshCcw
            className={`${resumeListState.status == "loading" ? "animate-spin" : ""}`}
          />
        </Button>
      </div>

      {resumeListState.status == "loading" ? (
        <GridLoading />
      ) : (
        <>
          {resumeListState.resumes.length == 0 ? (
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
            <DashboardGrid resumes={resumes} />
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
