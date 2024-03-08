import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

type Props = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function TagsInputForm({ tags, setTags }: Props) {
  const tagsFormSchema = z.object({
    tag: z.string().min(2, {
      message: "Tag must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof tagsFormSchema>>({
    resolver: zodResolver(tagsFormSchema),
    values: {
      tag: "",
    },
  });

  return (
    <Form {...form}>
      <form
        action={(e: FormData) => {
          const newTag = e.get("tag");
          if (newTag) {
            setTags([...tags, String(newTag)]);
            form.reset();
          }
        }}
      >
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tech Stack <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Tech Stack"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
