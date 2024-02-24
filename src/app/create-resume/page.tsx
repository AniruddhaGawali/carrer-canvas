"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

function CreateResumePage({}: Props) {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          router.push("create-resume/select-template");
        }}
      >
        Create Resume
      </Button>
    </div>
  );
}

export default CreateResumePage;
