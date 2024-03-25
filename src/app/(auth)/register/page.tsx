"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";

import { Button } from "@/components/ui/button";

import { BsGoogle } from "react-icons/bs";
import { Github } from "lucide-react";
import { toast } from "sonner";
import RegisterForm from "@/components/forms/registerForm";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {};

const Register = (props: Props) => {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  const [credentialsFormState, credentialsFormStateAction] = useFormState(
    actions.signUp,
    {
      message: "",
    },
  );

  useEffect(() => {
    if (credentialsFormState.message != "") {
      toast.error(credentialsFormState.message);
    }
  }, [credentialsFormState]);

  return (
    <section className="mt-32 flex w-[90%] flex-col items-start rounded-lg bg-background p-10 shadow-lg sm:w-[75%] md:mt-10 md:h-[80%] md:w-[30%] md:min-w-[500px]">
      <div>
        <h2 className="mb-0 text-start text-4xl font-medium">
          Create New Account
        </h2>
        <p className="-mt-1">Start your new carrier Canvas</p>
      </div>

      <form
        action={credentialsFormStateAction}
        className="mt-8 flex w-full flex-col items-center gap-5"
      >
        <RegisterForm />
      </form>

      <div className="mt-8 flex w-full flex-col items-center justify-center gap-5 ">
        <div className="flex w-full flex-col items-center justify-between gap-3 md:flex-row">
          <Button
            className="mt-3 flex w-full max-w-sm items-center gap-5 md:w-fit"
            onClick={() => {
              actions.loginFromGoogle();
            }}
          >
            <BsGoogle className="text-lg" />
            <span> Sign Up with Google</span>
          </Button>

          <Button
            className="mt-3 flex w-full max-w-sm gap-5 md:w-fit"
            onClick={() => {
              actions.loginFromGithub();
            }}
          >
            <Github size={20} />
            <span>Sign Up with Github</span>
          </Button>
        </div>

        <span className="text-base">
          I already have account?
          <Button variant="link" className="mx-0 px-2 text-base">
            <Link href="/login">Sign In</Link>
          </Button>
        </span>
      </div>
    </section>
  );
};

export default Register;
