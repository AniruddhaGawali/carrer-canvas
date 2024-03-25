import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Account | Career Canvas",
  description: "Start your new Career Canvas",
};

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default LoginLayout;
