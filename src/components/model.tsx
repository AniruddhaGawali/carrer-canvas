"use client";

import { X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex h-full w-full items-center justify-center overflow-y-auto bg-[#00000053] bg-opacity-50"
        onClick={() => router.push(pathname)}
      ></div>
      <div className="fixed inset-0 left-1/2 top-1/2 z-50 h-2/3 w-1/2 -translate-x-1/2  -translate-y-1/2 rounded-xl border bg-[rgba(255,255,255,0.8)] p-8 backdrop-blur-sm">
        <span
          className="absolute right-5 top-5 cursor-pointer"
          onClick={() => router.push(pathname)}
        >
          <X size={32} />
        </span>
        {children}
      </div>
    </>
  );
}
