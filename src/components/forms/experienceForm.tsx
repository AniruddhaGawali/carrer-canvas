import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, Pi } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";
import { UseFormReturn } from "react-hook-form";
import AIButton from "../ui/ai-button";
import { toast } from "sonner";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

type Props = {
  form: UseFormReturn<
    {
      jobTitle: string;
      company: string;
      description: string;
      location: string;
    },
    any,
    {
      jobTitle: string;
      company: string;
      description: string;
      location: string;
    }
  >;
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  handleSubmitForm: (data: {
    jobTitle: string;
    company: string;
    description: string;
    location: string;
  }) => void;
};

export default function ExperienceForm({
  form,
  endDate,
  setEndDate,
  setStartDate,
  startDate,
  handleSubmitForm,
}: Props) {
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(handleSubmitForm)}
      >
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Job Title" {...field} />
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
                    {/* <Calendar
                      mode="single"
                      selected={startDate ?? undefined}
                      onSelect={(e) => setStartDate(e ?? null)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    /> */}

                    <DatePicker
                      value={startDate}
                      onChange={(e) => setStartDate(e as Date)}
                      maxDate={new Date()}
                      calendarClassName={["!w-[300px] !p-4 !bg-background"]}
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

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
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
              <FormLabel>
                Description <span className="text-red-500">*</span>
              </FormLabel>
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
                        form.getValues("company").length <= 0 &&
                        form.getValues("jobTitle").length <= 0
                      ) {
                        toast.error(
                          "Please enter atleast company name and job title in order to generate description",
                        );
                        return;
                      }
                    }}
                    prompt={
                      "give the Description for a job experience in max 160 charaters strickly (include space and use pagragraph only no points) of job in " +
                        form.getValues("company") +
                        " as a " +
                        form.getValues("jobTitle") +
                        (form.getValues("location") &&
                        form.getValues("location").length > 0
                          ? " in " + form.getValues("location")
                          : "") +
                        form.getValues("description") &&
                      (form.getValues("description").length > 0
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

        <Button type="submit">Add</Button>
        <Button
          type="reset"
          variant="outline"
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
