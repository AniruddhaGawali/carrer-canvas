"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { StepsLinks as Steps } from "@/data/resume-step";
import templetes from "@/data/resume-templete";
import useResume from "@/redux/dispatch/useResume";
import { Eye } from "lucide-react";
import ReactImageMagnify from "react-image-magnify";
import { useSearchParams } from "next/navigation";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

type Props = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

function SelectTempleteComponent() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const {
    resumeState,
    setResumeTemplate,
    setResumeStateById,
    setResumeToDefaultState,
  } = useResume();

  useEffect(() => {
    const id = searchParams.get("id");
    if (resumeState.id == "" && id != null) {
      setResumeStateById(id, session);
    }
    if (resumeState.id == "" && session) setResumeToDefaultState();
  }, [session]);

  return (
    <>
      <div className=" my-[9rem] min-h-screen w-full">
        {/* //Title of the page */}
        <section className="mb-20 flex flex-col items-center justify-center">
          <h2 className="mb-3 text-center text-4xl font-bold">
            {Steps[0].name}
          </h2>
          <p className="text-center text-lg font-medium text-primary">
            {Steps[0].desc}
          </p>
        </section>

        {/* //Templete Selection */}
        <section className="container  grid  select-none grid-cols-1 items-center justify-center gap-20 md:grid-cols-2 lg:grid-cols-3">
          {templetes.map((item, index) => (
            <Drawer key={index}>
              <div
                className={`group relative flex  w-full cursor-pointer items-end justify-center  overflow-visible rounded-lg  border p-[3px] shadow-inner transition-all hover:scale-105 hover:shadow-md ${
                  resumeState.template == item.id && "grainy-gradient2"
                }`}
                key={index}
                onClick={() =>
                  resumeState.template == item.id
                    ? setResumeTemplate(null)
                    : setResumeTemplate(item)
                }
                onDoubleClick={() => setResumeTemplate(null)}
              >
                <div
                  className={`flex h-full w-full flex-col items-center justify-center gap-2 rounded-md py-5 ${resumeState.template == item.id && "bg-secondary"}`}
                >
                  <div className="w-[40%] ">
                    <Image
                      src={item.image}
                      alt={item.templeteName}
                      width="0"
                      height="0"
                      sizes="100vw"
                      className="grainy-gradient h-auto w-full border"
                      priority={false}
                    />
                  </div>
                  <h2 className="flex items-center">
                    <span className="mr-2">{item.templeteName}</span>
                  </h2>
                </div>

                <DrawerTrigger
                  className={`absolute right-3 top-3 rounded-md  p-2
                ${resumeState.template == item.id ? "bg-primary/80 text-primary-foreground" : "bg-secondary"}
                `}
                >
                  <Eye size={20} />
                </DrawerTrigger>
              </div>

              <DrawerContent>
                <div className="flex w-full flex-col items-center text-center">
                  <DrawerHeader className="flex flex-col items-center justify-center">
                    <DrawerTitle>
                      <h2 className="text-2xl">{item.templeteName}</h2>
                    </DrawerTitle>
                    <DrawerDescription>
                      <span className="text-base">{item.description}</span>
                    </DrawerDescription>
                  </DrawerHeader>

                  <div className="w-[300px]">
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          alt: "Wristwatch by Ted Baker London",
                          isFluidWidth: true,
                          src: item.image,
                        },
                        largeImage: {
                          src: item.image,
                          width: 400,
                          height: 1000,
                        },
                      }}
                    />
                  </div>

                  <DrawerFooter>
                    <DrawerClose>
                      <Button>Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          ))}
        </section>
      </div>
    </>
  );
}

export default SelectTempleteComponent;
