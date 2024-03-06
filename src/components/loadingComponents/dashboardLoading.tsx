import React from "react";
import { Skeleton } from "../ui/skeleton";
import GridLoading from "./gridLoading";

type Props = {};

function DashboardLoading({}: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white">
      <Skeleton className="container my-20 mt-[9rem] h-32 w-full rounded-xl" />
      <Skeleton className="container h-20 w-full rounded-xl" />
      <GridLoading />
    </div>
  );
}

export default DashboardLoading;
