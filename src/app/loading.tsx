import { LoadingSpinner } from "@/components/ui/loading";
import React from "react";

type Props = {};

function Loading({}: Props) {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-white">
      <LoadingSpinner className="h-20 w-20 fill-black text-white dark:text-gray-600" />
    </div>
  );
}

export default Loading;
