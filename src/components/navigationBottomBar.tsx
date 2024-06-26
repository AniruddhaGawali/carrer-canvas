"use client";

import React, { useContext, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Router } from "lucide-react";

import { useRouter } from "next/navigation";
import { StepsLinks } from "@/data/resume-step-navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useResume from "@/redux/dispatch/useResume";

import { ChevronsUpDown } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IsDetailSavedContext } from "@/provider/isDetailSavedProvider";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type Props = {
  currentStep: number;
};

function BottonNavigationBar({ currentStep }: Props) {
  const router = useRouter();
  const { resumeState } = useResume();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { isDetailSaved, setIsDetailSaved } = useContext(IsDetailSavedContext);
  const [continueFunction, setContinueFunction] = useState<Function | null>(
    null,
  );

  function prevStep(currentStep: number) {
    return StepsLinks[currentStep - 1].path + `?id=${resumeState.id}`;
  }

  function nextStep(currentStep: number) {
    return StepsLinks[currentStep + 1].path + `?id=${resumeState.id}`;

    return "";
  }

  return (
    <>
      <div className="sticky bottom-5 left-[50%] mb-5 flex w-[95%] translate-x-[-2.5%] items-center justify-between gap-2  rounded-lg border-2 bg-[rgba(255,255,255,0.5)] px-2 py-3 text-center backdrop-blur-sm sm:px-14">
        <Button
          className="flex gap-3"
          disabled={currentStep == 0}
          onClick={() => {
            setContinueFunction(() => () => router.push(prevStep(currentStep)));
            if (!isDetailSaved) {
              setOpenAlert(true);
            } else {
              router.push(prevStep(currentStep));
            }
          }}
        >
          <ChevronLeft />
          Prev
        </Button>

        <div>
          {isDesktop ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex min-w-[250px] items-center justify-center space-x-1 bg-transparent "
                >
                  <ChevronsUpDown size={18} />
                  <span>
                    {currentStep + 1}/{StepsLinks.length}
                  </span>
                  <span>|</span>
                  <span>{StepsLinks[currentStep].name}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit p-0" align="start">
                <PagesList
                  setOpen={setOpen}
                  router={router}
                  id={resumeState.id}
                />
              </PopoverContent>
            </Popover>
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start space-x-1 bg-transparent"
                >
                  <ChevronsUpDown size={18} />
                  <span>
                    {currentStep + 1}/{StepsLinks.length}
                  </span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mt-4 border-t">
                  <PagesList
                    setOpen={setOpen}
                    router={router}
                    id={resumeState.id}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>

        <Button
          className="flex gap-3"
          disabled={currentStep == StepsLinks.length - 1}
          onClick={async () => {
            setContinueFunction(
              () => async () => router.push(await nextStep(currentStep)),
            );
            if (await StepsLinks[currentStep].validation(resumeState)) {
              if (!isDetailSaved) {
                setOpenAlert(true);
              } else {
                router.push(nextStep(currentStep));
              }
            }
          }}
        >
          Next
          <ChevronRight />
        </Button>
      </div>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You have not saved your changes</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to continue without saving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpenAlert(false);
                setContinueFunction(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setOpenAlert(false);
                setIsDetailSaved(false);
                continueFunction && continueFunction();
              }}
            >
              Yes, Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function PagesList({
  setOpen,
  router,
  id,
}: {
  setOpen: (open: boolean) => void;
  router: AppRouterInstance;
  id: string;
}) {
  return (
    <Command>
      <CommandSeparator />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {StepsLinks.map((page, index) => (
            <CommandItem
              key={page.path}
              value={page.path}
              onSelect={(value) => {
                const newPage =
                  StepsLinks.find((pag) => pag.path === value) || null;
                if (newPage) {
                  router.push(newPage.path + `?id=${id}`);
                }
                setOpen(false);
              }}
            >
              {index + 1} - {page.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default BottonNavigationBar;
