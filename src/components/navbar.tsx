"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CircleUser, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { signOut } from "next-auth/react";
import useResume from "@/redux/dispatch/useResume";

import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

type Props = {
  isDashboard?: boolean;
  title?: string;
};

function Navbar({ isDashboard, title }: Props) {
  const router = useRouter();
  const { setTheme, themes } = useTheme();
  const { data: session } = useSession();
  const { setResumeTitle } = useResume();
  const [show, setShow] = useState(true);
  const [isTitleEditOn, setIsTitleEditOn] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > 10) {
      // if scroll down hide the navbar
      setShow(true);
    } else {
      // if scroll up show the navbar
      setShow(false);
    }
    // remember current page location to use in the next move
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    // cleanup function
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full ${
          show && "z-20"
        } transition-all`}
      >
        <div className="flex w-full items-center justify-between bg-[rgb(255,255,255,.3)] px-10  py-5 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <h3
              className={`h-6 w-0 overflow-hidden font-lobster text-xl font-medium tracking-tighter opacity-0 transition-all duration-500 ${
                show && "w-6 opacity-100"
              }`}
            >
              C C
            </h3>
            <h3 className=" flex items-center justify-center gap-2 text-xl font-medium">
              <span>{show && "|"}</span>

              {!title ? (
                <>
                  {isDashboard ? (
                    <Link href="/dashboard" className="-mb-0.5">
                      {" "}
                      Dashboard
                    </Link>
                  ) : (
                    <Link href="/" className="-mb-0.5">
                      {" "}
                      Home
                    </Link>
                  )}{" "}
                </>
              ) : (
                <>
                  {isTitleEditOn ? (
                    <form
                      action={(formData: FormData) => {
                        const title = formData.get("title");
                        if (typeof title === "string" && title.length > 0)
                          setResumeTitle(title);
                        else setResumeTitle("Untitled");
                        setIsTitleEditOn(false);
                      }}
                      className="flex w-full flex-col items-center"
                    >
                      <input
                        type="text"
                        name="title"
                        placeholder="Enter Your Title"
                        className=" w-full border-primary bg-transparent  text-xl font-medium  outline-none"
                        defaultValue={title}
                      />
                    </form>
                  ) : (
                    <div
                      onClick={() => {
                        setIsTitleEditOn(true);
                      }}
                    >
                      {title}
                    </div>
                  )}
                </>
              )}
            </h3>
          </div>
          <nav className=" flex items-center justify-between space-x-14">
            {/* <Switch
              onCheckedChange={(checked) => {
                setTheme(checked ? "dark" : "light");
              }}
              defaultChecked={themes[0] === "dark"}
            /> */}

            {isDashboard ? (
              <Link
                href="/"
                className="link hidden text-xl font-medium sm:flex"
              >
                Home
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="link hidden text-xl font-medium sm:flex"
              >
                Dashboard
              </Link>
            )}

            {session?.user ? (
              <>
                <Popover>
                  <PopoverTrigger>
                    <Avatar>
                      <AvatarImage
                        src={session.user.image ? session.user.image : ""}
                      />
                      <AvatarFallback>
                        <CircleUser size={32} />
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>

                  <PopoverContent className="w-fit p-2">
                    <div>
                      <Button variant="ghost" onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <>
                <Button
                  className="px-10 py-[1.35rem] text-lg font-medium"
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
