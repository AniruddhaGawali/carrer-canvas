import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Chips({
  children,
  className,
  ...props
}: Props & React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "flex h-10  cursor-pointer items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-white transition-all hover:bg-gray-600 hover:shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Chips;
