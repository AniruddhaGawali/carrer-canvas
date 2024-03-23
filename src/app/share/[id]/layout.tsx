import React from "react";
import type { Metadata } from "next";
import * as actions from "@/actions";

type Props = {
  children: React.ReactNode;
  params: any;
};

export let metadata: Metadata = {
  title: "Create Resume | Career Canves",
  description:
    "Craft. Create. Captivate. Elevate Your Career with Career Canves",
};

async function ShareLayout({ children, params }: Props) {
  const id = params.id;
  const data = await actions.getSharedResumeById(id);

  if (data != null) {
    const user = await actions.getUserById(data.userId);

    metadata = {
      title: `${data.title} - by ${user?.name} | Career Canves`,
      description:
        "Craft. Create. Captivate. Elevate Your Career with Career Canves",
    };

    return <div>{children}</div>;
  }
}

export default ShareLayout;
