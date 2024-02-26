import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import StoreProvider from "@/provider/storeProvider";

type Props = {
  children: React.ReactNode;
};

function CreateResumeLayout({ children }: Props) {
  return (
    <>
      <Navbar />

      <StoreProvider>
        <div className="min-h-screen">{children}</div>
      </StoreProvider>
      <Footer />
    </>
  );
}

export default CreateResumeLayout;
