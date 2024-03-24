"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, FC } from "react";

// ROUTER
import { useRouter, usePathname } from "next/navigation";

// TYPES
interface ILayoutProps {
  children: ReactNode;
}

const PageTransition: FC<ILayoutProps> = ({ children }) => {
  const path = usePathname();

  return (
    <AnimatePresence mode={"wait"}>
      <motion.div
        key={path}
        className="min-h-screen w-full" // Feel free to add your classes here
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
