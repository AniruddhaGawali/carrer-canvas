import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Carrier Canves",
  description: "Continue my carrier canvas",
};

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default LoginLayout;
