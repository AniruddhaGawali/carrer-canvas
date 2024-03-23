/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { WavyBackground } from "@/components/ui/wavy-background";
import useResume from "@/redux/dispatch/useResume";
import { useSession } from "next-auth/react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/loadingButton";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

function CreateResumePage({}: Props) {
  const router = useRouter();
  const { setResumeTitle, pushResume, resumeState } = useResume();
  const { data: session } = useSession();

  const resumeTitleFormSchema = z.object({
    title: z.string().min(1, "Title too short").max(100, "Title too long"),
  });

  const resumeTitleForm = useForm<z.infer<typeof resumeTitleFormSchema>>({
    resolver: zodResolver(resumeTitleFormSchema),
    values: {
      title: resumeState.title,
    },
  });

  const submitForm = async (data: { title: string }) => {
    console.log("data", data);
    const newResume: Resume = {
      ...resumeState,
      title: data.title,
    };
    console.log("newResume", newResume);
    pushResume(newResume, session);

    router.push("create-resume/select-template?id=" + resumeState.id);
  };

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
        <Form {...resumeTitleForm}>
          <form
            onSubmit={resumeTitleForm.handleSubmit(submitForm)}
            className="flex w-full flex-col items-center "
          >
            <FormField
              control={resumeTitleForm.control}
              name="title"
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    name="title"
                    placeholder="Enter Your Title of Resume"
                    className="w-full border-b-2 border-primary bg-transparent p-5 pb-2  text-2xl outline-none"
                  />
                  <p className="mt-2 w-full text-left text-lg text-gray-500">
                    Enter the title of your resume
                  </p>
                </>
              )}
            />

            <LoadingButton
              loading={resumeTitleForm.formState.isSubmitting}
              disabled={
                resumeTitleForm.formState.isSubmitting ||
                !resumeTitleForm.formState.isValid
              }
              type="submit"
              className="mt-8 space-x-3 text-lg"
            >
              <span>Next</span>{" "}
              <ArrowRight size={24} className="animate-in-out" />
            </LoadingButton>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreateResumePage;
