"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";

type AddSocialLinksFormProps = {
  className?: React.HTMLAttributes<HTMLFormElement>[`className`];
  addSocial: (url: string) => void;
};

function AddSocialLinksForm({ className, addSocial }: AddSocialLinksFormProps) {
  const AddSocialLinksFormSchema = z.object({
    socialLinks: z.string().url({ message: "Invalid URL." }),
  });

  const form = useForm<z.infer<typeof AddSocialLinksFormSchema>>({
    resolver: zodResolver(AddSocialLinksFormSchema),
  });

  function onSubmit(data: z.infer<typeof AddSocialLinksFormSchema>) {
    addSocial(data.socialLinks);
  }

  return (
    <>
      <Form {...form}>
        <form
          className={twMerge("w-full space-y-8", className)}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="socialLinks"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Add Social Link" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Add
          </Button>
        </form>
      </Form>
    </>
  );
}

export default AddSocialLinksForm;
