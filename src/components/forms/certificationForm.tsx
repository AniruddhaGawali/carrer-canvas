"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
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
  certification: AwardsAndCertifications[];
  setCertification: React.Dispatch<
    React.SetStateAction<AwardsAndCertifications[]>
  >;
  form: UseFormReturn<
    {
      name: string;
      description: string;
    },
    any,
    {
      name: string;
      description: string;
    }
  >;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  date: Date | null;
};

function CertificationForm({
  certification,
  setCertification,
  date,
  form,
  setDate,
}: Props) {
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit((data) => {
          const newCertification: AwardsAndCertifications = {
            id: `${certification.length + 1}`,
            date: date?.toISOString() ?? "",
            ...data,
          };
          setCertification([...certification, newCertification]);
          form.reset();
          setDate(null);
        })}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certification Name</FormLabel>
              <FormControl>
                <Input placeholder="Certification Name" {...field} />
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
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="date"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Completion Date <span className="text-red-500">*</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date ?? undefined}
                    onSelect={(e) => setDate(e ?? null)}
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

        <Button type="submit" className="w-full">
          Add
        </Button>
      </form>
    </Form>
  );
}

export default CertificationForm;
