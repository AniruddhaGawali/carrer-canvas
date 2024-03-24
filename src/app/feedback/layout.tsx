import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback | Career Canves",
  description: "Feedback form for Career Canves",
};

type Props = {
  children: React.ReactNode;
};

const AuthLayout = (props: Props) => {
  return (
    <>
      <Navbar />
      <div className="grainy-gradient relative  flex w-full flex-col items-center justify-center md:h-screen">
        {props.children}
      </div>
      <Footer />
    </>
  );
};

export default AuthLayout;
