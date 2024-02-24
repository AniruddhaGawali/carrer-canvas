import { signIn, signOut } from "next-auth/react";

export async function loginFromGoogle() {
  const res = await signIn("google", {
    redirect: false,
    callbackUrl: "/",
  });

  if (res?.error) {
    return {
      error: res.error,
    };
  }

  return {
    user: res?.ok!,
  };
}

export async function loginFromGithub() {
  const res = await signIn("github", {
    redirect: false,
    callbackUrl: "/",
  });

  if (res?.error) {
    return {
      error: res.error,
    };
  }

  return {
    user: res?.ok!,
  };
}

export async function loginFromCredentials(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      error: "Missing email or password",
    };
  }

  if (!email.includes("@")) {
    return {
      error: "Invalid email",
    };
  }

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
    callbackUrl: "/",
  });

  if (res?.error) {
    return {
      error: res.error,
    };
  }

  return {
    user: res?.ok!,
  };
}

export async function signUp(
  formState: {
    message: string;
  },

  formData: FormData,
) {
  const name = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("confirm-password") as string;

  if (password !== passwordConfirm) {
    return {
      message: "Password and confirm password do not match",
    };
  }

  console.log({ name, email, password, passwordConfirm });

  const res = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  console.log(res);

  if (!res.ok) {
    const error = await res.json();
    return {
      message: error.message,
    };
  }

  signIn("credentials", {
    email,
    password,
    redirect: true,
    callbackUrl: "/",
  });

  return {
    message: "User created",
  };
}

export async function logOut() {
  await signOut({ redirect: true, callbackUrl: "/" });
}
