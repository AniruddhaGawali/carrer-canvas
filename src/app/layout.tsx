import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "@/provider/nextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const metadata: Metadata = {
  title: "Carrier Canves",
  description:
    "Craft. Create. Captivate. Elevate Your Career with Carrier Canves",
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
        <body className="relative">{children}</body>
      </NextAuthProvider>
    </html>
  );
}
