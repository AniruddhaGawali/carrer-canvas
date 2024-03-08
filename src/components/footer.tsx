import React from "react";
import { Github, Mail } from "lucide-react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="mt-10 flex w-full flex-col justify-between gap-10 bg-primary px-10 py-8 text-background sm:h-24 sm:flex-row sm:items-center sm:gap-0 sm:py-0 lg:mt-0">
      <div>
        <h3 className="overflow-hidden font-lobster text-3xl font-normal tracking-tighter transition-all duration-500">
          Career Canves
        </h3>
        <span>All Copyright &copy; of website are reserved by owner</span>
      </div>

      <div className="flex gap-3">
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
