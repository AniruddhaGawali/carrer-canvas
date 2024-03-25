import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Career Canvas",
  description: "Continue my Career canvas",
};

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default LoginLayout;
