import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useFormStatus } from "react-dom";
import { LoadingSpinner } from "@/components/ui/loading";

type Props = {};

function RegisterForm({}: Props) {
  const status = useFormStatus();

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email" className="text-md font-medium">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          className=" text-md"
          name="email"
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username" className="text-md font-medium">
          Username
        </Label>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          name="username"
          className=" text-md"
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password" className="text-md font-medium">
          Password
        </Label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          className=" text-md"
        />
      </div>

      <div className="grid w-full max-w-sm items-center ">
        <Label htmlFor="confirm-password" className="text-md font-medium">
          Confirm Password
        </Label>
        <Input
          type="password"
          id="confirm-password"
          placeholder="Confirm Password"
          name="confirm-password"
          className=" text-md w-full"
        />
      </div>

      <Button className="mt-3 w-full max-w-sm" type="submit">
        {status.pending ? <LoadingSpinner className="h-6 w-6" /> : "Sign Up"}
      </Button>
    </>
  );
}

export default RegisterForm;
