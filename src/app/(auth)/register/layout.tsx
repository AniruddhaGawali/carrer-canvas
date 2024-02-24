import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Account | Carrier Canves",
  description: "Start your new carrier canves",
};

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default LoginLayout;
