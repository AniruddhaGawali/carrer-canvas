"use client";

import React from "react";
import { UseFormReturn, useForm } from "react-hook-form";

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
import AIButton from "../ui/ai-button";
import { toast } from "sonner";
import DatePicker from "../ui/date-picker";

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
                <div className="relative">
                  <Textarea placeholder="Description" {...field} />
                  <AIButton
                    className="absolute bottom-2 right-2"
                    onClick={() => {
                      if (form.getValues("name").length <= 0) {
                        toast.error(
                          "Please enter atleast college name and degree in order to generate description",
                        );
                        return;
                      }
                    }}
                    prompt={
                      "give the Description for a certication or award in max 160 charaters strickly (include space and use pagragraph only no points) certication or award of " +
                      form.getValues("name") +
                      (form.getValues("description") &&
                      form.getValues("description").length > 0
                        ? " like " + form.getValues("description")
                        : "")
                    }
                    setText={(text) => form.setValue("description", text)}
                  />
                </div>
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
                  <DatePicker
                    value={date ?? new Date()}
                    onChange={(e) => setDate(e)}
                    maxDate={new Date()}
                    minDate={new Date("1900-01-01")}
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
        <Button
          type="reset"
          variant={"outline"}
          onClick={() => {
            form.reset();
            setDate(null);
          }}
          className="w-full"
        >
          Reset
        </Button>
      </form>
    </Form>
  );
}

export default CertificationForm;
