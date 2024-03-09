"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

type Props = {
  education: Education[];
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
};

function EducationForm({ education, setEducation }: Props) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const educationFormSchema = z.object({
    college: z.string().min(2, {
      message: "College name must be at least 2 characters.",
    }),
    degree: z.string().min(2, {
      message: "Degree must be at least 2 characters.",
    }),
    description: z
      .string()
      .min(10, {
        message: "Description must be at least 10 characters.",
      })
      .max(160, {
        message: "Description must not be longer than 160 characters.",
      }),
  });

  const form = useForm<z.infer<typeof educationFormSchema>>({
    resolver: zodResolver(educationFormSchema),
    values: {
      college: "",
      degree: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit((data) => {
          const newEducation: Education = {
            id: education.length.toString(),

            college: data.college,
            degree: data.degree,
            description: data.description,
            startDate: startDate?.toISOString() ?? "",
            endDate: endDate?.toISOString() ?? "",
          };

          setEducation([...education, newEducation]);

          form.reset();
          setStartDate(null);
        })}
      >
        <FormField
          control={form.control}
          name="college"
          render={({ field }) => (
            <FormItem>
              <FormLabel>College Name</FormLabel>
              <FormControl>
                <Input placeholder="College Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree</FormLabel>
              <FormControl>
                <Input placeholder="Degree" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  // className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-5 xl:flex-row">
          <FormField
            name="startDate"
            render={() => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Start Date <span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        {startDate ? (
                          format(startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate ?? undefined}
                      onSelect={(e) => setStartDate(e ?? null)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="endDate"
            render={() => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  End Date <span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        {endDate ? (
                          format(endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate ?? undefined}
                      onSelect={(e) => setEndDate(e ?? null)}
                      disabled={(date) =>
                        date > new Date() ||
                        date < (startDate ?? new Date("1900-01-01"))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}

export default EducationForm;
