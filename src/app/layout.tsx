import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "@/provider/nextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import StoreProvider from "@/provider/storeProvider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/provider/theme-provider";
import PageAnimatePresence from "@/components/pageTransition";

export const metadata: Metadata = {
  title: "Career Canvas",
  description:
    "Craft. Create. Captivate. Elevate Your Career with Career Canvas",
  icons: {
    icon: [
      { url: "/icons/favicon.ico" },
      // { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: ["/logo.png"],
    apple: [
      { url: "icons/apple-touch-icon.png" },
      // { url: "/apple-icon-x3.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <NextAuthProvider session={session}>
        <StoreProvider>
          <body className="relative">
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              disableTransitionOnChange
            >
              <Toaster richColors position="top-right" />
              <PageAnimatePresence>{children}</PageAnimatePresence>
            </ThemeProvider>
          </body>
        </StoreProvider>
      </NextAuthProvider>
    </html>
  );
}
