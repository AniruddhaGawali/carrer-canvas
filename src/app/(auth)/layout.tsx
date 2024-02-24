import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

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
