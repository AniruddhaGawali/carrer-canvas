import React from "react";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="mt-10 flex w-full flex-col justify-between gap-10 bg-primary px-10 py-8 text-background sm:h-24 sm:flex-row sm:items-center sm:gap-0 sm:py-0 lg:mt-0">
      <div>
        <h3 className="overflow-hidden font-lobster text-3xl font-normal tracking-tighter transition-all duration-500">
          Career Canvas
        </h3>
        <span>All Copyright &copy; of website are reserved by owner</span>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/feedback">
          <Button
            variant="link"
            className="text-background transition-all hover:text-secondary/90"
          >
            Give Your Feedback
          </Button>
        </Link>
        <a href="https://github.com/AniruddhaGawali" target="_blank">
          <Github />
        </a>
        <a href="mailto:aniruddhagawali05@gmail.com">
          <Mail />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
