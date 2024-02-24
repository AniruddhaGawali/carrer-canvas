import { signIn, signOut } from 'next-auth/react';

export async function loginFromGoogle() {
  const res = await signIn('google', {
    redirect: false,
    callbackUrl: '/',
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
  const res = await signIn('github', {
    redirect: false,
    callbackUrl: '/',
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

export async function logOut() {
  await signOut({ redirect: true, callbackUrl: '/' });
}
