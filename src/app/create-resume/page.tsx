/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { WavyBackground } from "@/components/ui/wavy-background";
import useResume from "@/redux/dispatch/useResume";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/ui/loading";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/loadingButton";

type Props = {};

function CreateResumePage({}: Props) {
  const router = useRouter();
  const { setResumeTitle, pushResume, resumeState } = useResume();
  const { data: session } = useSession();

  return (
    <div className="relative h-screen">
      <WavyBackground
        className="grainy-white absolute inset-0"
        backgroundFill="white"
        blur={5}
        colors={["#84FAB0", "#46D7B3", "#46D7B3", "#8FD3F4", "#6BE2F4"]}
        speed="fast"
      />

      <div className="absolute left-1/2 top-1/2 z-10  w-1/3 -translate-x-1/2 -translate-y-1/2">
        <form
          action={(formData: FormData) => {
            const title = formData.get("title");
            if (typeof title === "string") {
              if (title.length > 0) {
                const newResume: Resume = {
                  ...resumeState,
                  title: title,
                };

                console.log("newResume", newResume);

                pushResume(newResume, session);
              }
              if (resumeState.id != "")
                router.push(
                  "create-resume/select-template?id=" + resumeState.id,
                );
            }
          }}
          className="flex w-full flex-col items-center "
        >
          <input
            type="text"
            name="title"
            placeholder="Enter Your Title of Resume"
            className="w-full border-b-2 border-primary bg-transparent p-5 pb-2  text-2xl outline-none"
            defaultValue={resumeState.title}
          />
          <p className="mt-2 w-full text-left text-lg text-gray-500">
            Enter the title of your resume
          </p>

          <LoadingButton
            loading={resumeState.uploadStatus === "loading"}
            type="submit"
            className="mt-8 space-x-3 text-lg"
          >
            <span>Next</span>{" "}
            <ArrowRight size={24} className="animate-in-out" />
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}

export default CreateResumePage;
