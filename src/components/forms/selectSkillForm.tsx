"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { SkillLevel } from "@/types/enum";

const FormSchema = z.object({
  skill: z
    .string({
      required_error: "Please enter a skill.",
    })
    .min(2, {
      message: "Skill must be at least 2 characters.",
    }),
  level: z.string({
    required_error: "Please select a level of skill.",
  }),
});

type SelectSkillFormProps = {
  addSkill: (skill: string, level: SkillLevel) => void;
  skillsLength: number;
};

export function SelectSkillForm({
  addSkill,
  skillsLength,
}: SelectSkillFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addSkill(data.skill, data.level as SkillLevel);
    form.reset({
      level: undefined,
      skill: "",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col space-y-2"
      >
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? Object.values(SkillLevel)
                            .find((item) => SkillLevel[item] === field.value)
                            ?.toString()
                        : "Select Level"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Level..." />
                    <CommandEmpty>No Level Found</CommandEmpty>
                    <CommandGroup>
                      {Object.values(SkillLevel).map((item) => (
                        <CommandItem
                          value={item}
                          key={item}
                          onSelect={() => {
                            form.setValue("level", item);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              item === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {item}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skill"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Skill" className="w-full" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pl-1 text-sm">
          <span className="text-muted-foreground">
            {skillsLength > 0
              ? "Click on skill to delete it"
              : "Enter to add skill"}
          </span>
        </div>
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}
