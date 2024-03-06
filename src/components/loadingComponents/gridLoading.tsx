import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {};

function GridLoading({}: Props) {
  return (
    <div className="container my-20  grid grid-cols-1  items-center justify-center gap-20 sm:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="h-96 w-full rounded-xl" />
      <Skeleton className="h-96 w-full rounded-xl" />
      <Skeleton className="h-96 w-full rounded-xl" />
      <Skeleton className="h-96 w-full rounded-xl" />
      <Skeleton className="h-96 w-full rounded-xl" />
      <Skeleton className="h-96 w-full rounded-xl" />
    </div>
  );
}

export default GridLoading;
