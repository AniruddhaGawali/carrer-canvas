"use client";

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
import LoadingButton from "../loadingButton";
import { UseFormReturn } from "react-hook-form";

type PersonalInformationFormProps = {
  className?: React.HTMLAttributes<HTMLFormElement>[`className`];
  form: UseFormReturn<
    {
      name?: string | undefined;
      jobTitle?: string | undefined;
      email?: string | undefined;
      phone?: string | undefined;
      website?: string | undefined;
      address1?: string | undefined;
      address2?: string | undefined;
    },
    any,
    {
      name?: string | undefined;
      jobTitle?: string | undefined;
      email?: string | undefined;
      phone?: string | undefined;
      website?: string | undefined;
      address1?: string | undefined;
      address2?: string | undefined;
    }
  >;
  selectedTempletePersonInfo: {
    name: boolean;
    email: boolean;
    phone: boolean;
    address: boolean;
    website: boolean;
    jobTitle: boolean;
  };
  setSelectedSuggestionId: React.Dispatch<React.SetStateAction<string | null>>;
  submit: (data: {
    name?: string | undefined;
    jobTitle?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    website?: string | undefined;
    address1?: string | undefined;
    address2?: string | undefined;
  }) => Promise<void>;
  isDisabled: boolean;
};

export default function PersonalInformationForm({
  className,
  form,
  selectedTempletePersonInfo,
  setSelectedSuggestionId,
  submit,
  isDisabled,
}: PersonalInformationFormProps) {
  return (
    <Form {...form}>
      <form
        className={twMerge("space-y-8", className)}
        onSubmit={form.handleSubmit(submit)}
      >
        {selectedTempletePersonInfo.name && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="FullName"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setSelectedSuggestionId(null);
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
                      field.onChange(e);
                      setSelectedSuggestionId(null);
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
                      field.onChange(e);
                      setSelectedSuggestionId(null);
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone Number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setSelectedSuggestionId(null);
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
                      field.onChange(e);
                      setSelectedSuggestionId(null);
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
                        field.onChange(e);
                        setSelectedSuggestionId(null);
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
                        field.onChange(e);
                        setSelectedSuggestionId(null);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <LoadingButton
          type="submit"
          className="w-full"
          loading={form.formState.isSubmitting}
          disabled={isDisabled || form.formState.isSubmitting}
        >
          Save
        </LoadingButton>
      </form>
    </Form>
  );
}
