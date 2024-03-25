import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Dashboard | Career Canvas",
  description:
    "Craft. Create. Captivate. Elevate Your Career with Careers Canvas",
};

function DashboardLayout({ children }: Props) {
  return (
    <>
      <Navbar isDashboard />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default DashboardLayout;
