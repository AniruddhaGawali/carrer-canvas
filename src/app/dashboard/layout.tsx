import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type Props = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: Props) {
  return (
    <>
      <Navbar isDashboard />
      <main className="">{children}</main>
      <Footer />
    </>
  );
}

export default DashboardLayout;
