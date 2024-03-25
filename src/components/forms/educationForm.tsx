"use client";

import React from "react";

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
import { UseFormReturn } from "react-hook-form";
import AIButton from "../ui/ai-button";
import { toast } from "sonner";
import DatePicker from "../ui/date-picker";

type Props = {
  education: Education[];
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
  form: UseFormReturn<
    {
      college: string;
      degree: string;
      description: string;
    },
    any,
    {
      college: string;
      degree: string;
      description: string;
    }
  >;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  startDate: Date | null;
  endDate: Date | null;
};

function EducationForm({
  education,
  setEducation,
  form,
  endDate,
  setEndDate,
  setStartDate,
  startDate,
}: Props) {
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
                <div className="relative">
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    // className="resize-none"
                    {...field}
                  />
                  <AIButton
                    className="absolute bottom-2 right-2"
                    onClick={() => {
                      if (
                        form.getValues("college").length <= 0 &&
                        form.getValues("degree").length <= 0
                      ) {
                        toast.error(
                          "Please enter atleast college name and degree in order to generate description",
                        );
                        return;
                      }
                    }}
                    prompt={
                      "give the Description for a school or college experience in max 160 charaters strickly (include space and use pagragraph only no points) of college or school " +
                      form.getValues("college") +
                      " get the degree in " +
                      form.getValues("degree") +
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
                    <DatePicker
                      value={startDate ?? new Date()}
                      onChange={(e) => setStartDate(e)}
                      maxDate={new Date()}
                      minDate={new Date("1900-01-01")}
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
                    <DatePicker
                      value={endDate ?? new Date()}
                      onChange={(e) => setEndDate(e)}
                      maxDate={new Date()}
                      minDate={startDate ?? new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Add</Button>
        <Button
          type="reset"
          variant={"outline"}
          onClick={() => {
            form.reset();
            setStartDate(null);
            setEndDate(null);
          }}
        >
          Reset
        </Button>
      </form>
    </Form>
  );
}

export default EducationForm;
