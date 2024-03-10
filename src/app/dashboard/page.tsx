"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Edit, Plus, Trash2 } from "lucide-react";
import { getResumes } from "@/actions/resume";
import useResume from "@/redux/dispatch/useResume";
import GridLoading from "@/components/loadingComponents/gridLoading";
import * as action from "@/actions";
import { Button } from "@/components/ui/button";
import DashboardLoading from "@/components/loadingComponents/dashboardLoading";

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
            <div className="juc container my-20 grid grid-cols-1 items-center justify-center gap-20 md:grid-cols-2 lg:grid-cols-3">
              <>
                {resumes.map((item, index) => (
                  <div className="group relative" key={index}>
                    <div className="grainy-gradient-hover group relative m-auto h-96 w-full min-w-min max-w-sm cursor-pointer rounded-lg border-[3px] bg-secondary p-5 shadow-md transition-all duration-500 hover:border-black">
                      <div className="absolute -bottom-10 -right-0 z-20  hidden h-10 w-full items-center justify-between border-black px-3 pt-5 group-hover:flex">
                        <Button
                          variant={"destructive"}
                          onClick={() => {
                            action.deleteResume(item.id, session);
                            fetchResumes();
                          }}
                          className="flex  items-center justify-center gap-3"
                        >
                          <Trash2 /> Delete
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={() => {
                            setResumeState(item);
                            router.push("/create-resume");
                          }}
                          className="flexitems-center justify-center gap-3 hover:bg-primary/20"
                        >
                          <Edit size={20} /> Edit
                        </Button>
                      </div>

                      <div className="h-2/3 min-h-[300px] w-full rounded-md bg-white shadow-inner transition-all duration-300"></div>
                      <div className="mt-5  w-full">
                        <h1 className="text-center text-2xl font-bold group-hover:underline">
                          {item.title}
                        </h1>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
