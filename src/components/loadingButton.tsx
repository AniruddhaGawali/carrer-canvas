import React from "react";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./ui/loading";

type Props = {
  loading: boolean;
  children: React.ReactNode;
};

function LoadingButton({
  loading,
  children,
  ...props
}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button disabled={loading} {...props}>
      {loading ? <LoadingSpinner className="h-6 w-6" /> : children}
    </Button>
  );
}

export default LoadingButton;
