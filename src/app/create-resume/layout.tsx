"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import StoreProvider from "@/provider/storeProvider";
import useResume from "@/redux/dispatch/useResume";

type Props = {
  children: React.ReactNode;
};

function CreateResumeLayout({ children }: Props) {
  const { resumeState } = useResume();
  return (
    <>
      <Navbar title={resumeState.title} />

      <StoreProvider>
        <div className="min-h-screen">{children}</div>
      </StoreProvider>
      <Footer />
    </>
  );
}

export default CreateResumeLayout;
