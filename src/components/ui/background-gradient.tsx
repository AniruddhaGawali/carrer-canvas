import { cn } from "@/utils/cn";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("group relative p-[4px]", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 z-[1] h-full rounded-md opacity-60 blur-xl transition  duration-500 group-hover:opacity-100",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#84fab0,transparent),radial-gradient(circle_farthest-side_at_100%_0,#8fd3f4,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#8fd3f4,transparent),radial-gradient(circle_farthest-side_at_0_0,#84fab0,#84fab0)]",
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 z-[1] h-full rounded-lg",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#84fab0,transparent),radial-gradient(circle_farthest-side_at_100%_0,#8fd3f4,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#8fd3f4,transparent),radial-gradient(circle_farthest-side_at_0_0,#84fab0,#84fab0)]",
        )}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
