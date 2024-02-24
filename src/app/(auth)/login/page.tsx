"use client";

import LoginForm from "@/components/forms/loginForm";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import { BsGoogle } from "react-icons/bs";
import * as actions from "@/actions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {};

const Login = (props: Props) => {
  const { data: session } = useSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <section className="mt-32 flex w-[90%] flex-col items-start rounded-lg bg-background p-10 shadow-lg sm:w-[75%] md:mt-10 md:h-[80%] md:w-[30%] md:min-w-[500px]">
      <div>
        <h2 className="mb-0 text-start text-4xl font-medium">Login</h2>
        <p className="-mt-1">Continue my carrier canvas</p>
      </div>

      <form
        className="mt-8 flex w-full flex-col items-center gap-5"
        // action={async (formData: FormData) => {
        // //   const { error } = await actions.loginFromCredentials(formData);
        //   if (error) {
        //     toast.error(error);
        //   }
        // }}
      >
        <LoginForm />
      </form>

      <div className="mt-8 flex w-full flex-col items-center justify-center gap-5 ">
        <div className="flex w-full flex-col items-center justify-between gap-3 ">
          <Button
            className="mt-3 flex w-full max-w-sm items-center gap-5 "
            onClick={() => {
              actions.loginFromGoogle();
            }}
          >
            <BsGoogle className="text-lg" />
            <span>Login with Google</span>
          </Button>

          <Button
            className="mt-3 flex w-full max-w-sm gap-5 "
            onClick={() => {
              actions.loginFromGithub();
            }}
          >
            <Github size={20} />
            <span>Login with Github</span>
          </Button>
        </div>

        <span className="text-base">
          I don’t have account?
          <Button variant="link" className="mx-0 px-2 text-base">
            <Link href="/register">Create New Account</Link>
          </Button>
        </span>
      </div>
    </section>
  );
};

export default Login;
