"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { SkillLevel } from "@/types/enum";
import Chips from "../chips";

const FormSchema = z.object({
  skill: z
    .string({
      required_error: "Please enter a skill.",
    })
    .min(2, {
      message: "Skill must be at least 2 characters.",
    }),

  level: z.enum(["Newbie", "Intermediate", "Advanced", "Expert"], {
    required_error: "Please select a skill level.",
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
            <FormItem className="space-y-3">
              <FormLabel>
                <span>Skill Level</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Newbie" className="hidden" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Chips
                        variant={
                          field.value === "Newbie" ? "default" : "outline"
                        }
                        onClick={() => {
                          field.onChange("Newbie");
                        }}
                      >
                        Newbie
                      </Chips>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Intermediate" className="hidden" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Chips
                        variant={
                          field.value === "Intermediate" ? "default" : "outline"
                        }
                        onClick={() => {
                          field.onChange("Intermediate");
                        }}
                      >
                        Intermediate
                      </Chips>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Advanced" className="hidden" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Chips
                        variant={
                          field.value === "Advanced" ? "default" : "outline"
                        }
                        onClick={() => {
                          field.onChange("Advanced");
                        }}
                      >
                        Advanced
                      </Chips>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Expert" className="hidden" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Chips
                        variant={
                          field.value === "Expert" ? "default" : "outline"
                        }
                        onClick={() => {
                          field.onChange("Expert");
                        }}
                      >
                        Expert
                      </Chips>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
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
