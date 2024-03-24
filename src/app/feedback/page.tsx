"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loadingButton";
import { Textarea } from "@/components/ui/textarea";

import * as actions from "@/actions";
import { toast } from "sonner";

type Props = {};

function FeedbackPage({}: Props) {
  const schema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters long",
    }),
    email: z.string().email().optional().or(z.literal("")),
    feedback: z.string().min(10, {
      message: "Feedback must be at least 10 characters long",
    }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      feedback: "",
    },
  });

  return (
    <section className="mt-32 flex w-[90%] flex-col items-start rounded-lg bg-background p-10 shadow-lg sm:w-[75%] md:mt-10 md:w-[30%] md:min-w-[500px]">
      <div>
        <h2 className="mb-0 text-start text-4xl font-medium">Feedback</h2>
        <p className="-mt-1">
          Love to hear your feedback on how we can improve Career Canvas
        </p>
      </div>

      <Form {...form}>
        <form
          className="mt-8 flex w-full flex-col items-center gap-5"
          onSubmit={form.handleSubmit(async (data) => {
            console.log(data);
            const res = await actions.feedback(data);
            if (res) {
              form.reset();
              toast.success("Feedback submitted successfully");
            }
          })}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full max-w-sm">
                <FormLabel htmlFor="name">
                  Name<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input id="name" placeholder="Your Name" {...field} />
                </FormControl>
                <FormDescription>
                  Your name as it will appear in the feedback
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full max-w-sm">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input id="email" placeholder="Your Email" {...field} />
                </FormControl>
                <FormDescription>
                  Your email will not be shared with anyone its optional
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem className="w-full max-w-sm">
                <FormLabel htmlFor="feedback">
                  Feedback<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="feedback"
                    placeholder="Your Feedback"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your feedback will help us improve Career Canvas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            loading={form.formState.isSubmitting}
            type="submit"
            className="w-full max-w-sm"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Submit Feedback
          </LoadingButton>
        </form>
      </Form>
    </section>
  );
}

export default FeedbackPage;
