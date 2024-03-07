"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

type PersonalInformationFormProps = {
  // Add your props here.
  personalInformation: PersonalInfo;
  changePersonalInformation: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  setSelectedSuggestions: React.Dispatch<React.SetStateAction<number>>;
  className?: React.HTMLAttributes<HTMLFormElement>[`className`];
  saveData: () => void;
  selectedTempletePersonInfo: ResumeTemplate["personalInfo"];
};

export default function PersonalInformationForm({
  personalInformation,
  changePersonalInformation,
  className,
  saveData,
  setSelectedSuggestions,
  selectedTempletePersonInfo,
}: PersonalInformationFormProps) {
  const personalInformationFormSchema = z.object({
    fullName: selectedTempletePersonInfo.name
      ? z.string().min(2, {
          message: "Username must be at least 2 characters.",
        })
      : z.string().optional(),

    jobTitle: selectedTempletePersonInfo.jobTitle
      ? z.string().min(2, {
          message: "Job title must be at least 2 characters.",
        })
      : z.string().optional(),

    email: selectedTempletePersonInfo.email
      ? z.string().email({ message: "Invalid email address." })
      : z.string().optional(),

    phoneNo: selectedTempletePersonInfo.phone
      ? z
          .string()
          .min(10, {
            message: "Phone number must be at least 10 characters.",
          })
          .max(10, {
            message: "Phone number must be at most 15 characters.",
          })
          .max(15, {
            message: "Phone number must be at most 15 characters.",
          })
          .regex(phoneRegex, {
            message: "Phone number is invalid.",
          })
      : z.string().optional(),

    website: selectedTempletePersonInfo.website
      ? z.string().url({ message: "Invalid URL." })
      : z.string().optional(),

    address1: selectedTempletePersonInfo.address
      ? z.string().min(5, {
          message: "Address must be at least 5 characters.",
        })
      : z.string().optional(),

    address2: selectedTempletePersonInfo.address
      ? z.string().min(5, {
          message: "Address must be at least 5 characters.",
        })
      : z.string().optional(),
  });

  const form = useForm<z.infer<typeof personalInformationFormSchema>>({
    resolver: zodResolver(personalInformationFormSchema),
    values: {
      fullName: personalInformation.name,
      jobTitle: personalInformation.jobTitle,
      email: personalInformation.email,
      phoneNo: personalInformation.phone,
      website: personalInformation.website || "",
      address1: personalInformation.address1,
      address2: personalInformation.address2,
    },
  });

  return (
    <Form {...form}>
      <form
        className={twMerge("space-y-8", className)}
        onSubmit={form.handleSubmit(saveData)}
      >
        {selectedTempletePersonInfo.name && (
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="FullName"
                    {...field}
                    onChange={(e) => {
                      changePersonalInformation({
                        ...personalInformation,
                        name: e.target.value,
                      });
                      setSelectedSuggestions(-1);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {selectedTempletePersonInfo.jobTitle && (
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Job Title"
                    {...field}
                    onChange={(e) => {
                      changePersonalInformation({
                        ...personalInformation,
                        jobTitle: e.target.value,
                      });
                      setSelectedSuggestions(-1);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {selectedTempletePersonInfo.email && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    onChange={(e) => {
                      changePersonalInformation({
                        ...personalInformation,
                        email: e.target.value,
                      });
                      setSelectedSuggestions(-1);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {selectedTempletePersonInfo.phone && (
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone Number"
                    {...field}
                    onChange={(e) => {
                      changePersonalInformation({
                        ...personalInformation,
                        phone: e.target.value,
                      });
                      setSelectedSuggestions(-1);
                      field.onChange(e);
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {selectedTempletePersonInfo.website && (
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Website"
                    {...field}
                    onChange={(e) => {
                      changePersonalInformation({
                        ...personalInformation,
                        website: e.target.value,
                      });
                      setSelectedSuggestions(-1);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Your website, as it will appear on your resume.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex flex-col gap-2">
          {selectedTempletePersonInfo.address && (
            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address 1</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Address"
                      {...field}
                      onChange={(e) => {
                        changePersonalInformation({
                          ...personalInformation,
                          address1: e.target.value,
                        });
                        setSelectedSuggestions(-1);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {selectedTempletePersonInfo.address && (
            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Address 2 (City, State, Country)"
                      {...field}
                      onChange={(e) => {
                        changePersonalInformation({
                          ...personalInformation,
                          address2: e.target.value,
                        });
                        setSelectedSuggestions(-1);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitSuccessful}
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
