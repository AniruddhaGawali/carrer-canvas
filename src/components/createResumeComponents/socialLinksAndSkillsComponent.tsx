"use client";

import { StepsLinks as Steps } from "@/data/resume-step";
import React, { useEffect, useRef, useState } from "react";

import useResume from "@/redux/dispatch/useResume";
import { Button } from "../ui/button";
import { Eye, EyeOff, X } from "lucide-react";
import Chips from "../chips";
import { redirect, useSearchParams } from "next/navigation";
import templetes from "@/data/resume-templete";
import { socialIcons } from "@/data/socialIcons";
import LoadingButton from "../loadingButton";
import SuggestionBox from "../suggestionBox";
import { CarouselItem } from "../ui/carousel";
import { SelectSkillForm } from "../forms/selectSkillForm";
import { SkillLevel } from "@/types/enum";
import AddSocialLinksForm from "../forms/addSocialLinksForm";
import { useSession } from "next-auth/react";
import * as action from "@/actions";
import PdfDoc from "../pdfView";
import { Separator } from "../ui/separator";

type Props = {};

export default function SocialLinksAndSkills({}: Props) {
  const searchParams = useSearchParams();
  const {
    resumeState,
    setResumeStateById,
    setResumeToDefaultState,
    saveResumeState,
  } = useResume();
  const { data: session } = useSession();

  const [showResume, setShowResume] = useState<boolean>(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [socialLinks, setSocialLinks] = useState<Social>({});
  const [isSocialAndSkillSaving, setIsSocialAndSkillSaving] =
    useState<boolean>(false);
  const [disabledSaveButton, setDisabledSaveButton] = useState<boolean>(true);

  const [skillsSuggestions, setSkillSuggestions] = useState<Skill[]>([]);
  const [socialSuggestions, setSocialSuggestions] = useState<Social>({});
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const selectedTemplete =
    resumeState.template != null
      ? templetes[resumeState.template]
      : templetes[0];
  const socialInputRef = useRef<HTMLInputElement>(null);
  const totalSkills = selectedTemplete.skills;
  const totalSocialLinks = selectedTemplete.social;

  function handleSkills(skill: string, level: SkillLevel) {
    if (skills.length < totalSkills) {
      if (skills.find((s) => s.skills === skill)) return;
      setSkills((prevSkills) => [
        ...prevSkills,
        {
          skills: skill,
          level: level as SkillLevel,
        },
      ]);
      setSkillSuggestions((prevSkills) => [
        ...prevSkills,
        { skills: skill, level: level },
      ]);
    }
  }

  const handleSocialLinks = (socialURL: string) => {
    if (Object.keys(socialLinks).length >= totalSocialLinks) return;

    const social = socialURL.trim();
    const socialObjects: Social = {
      linkedin: "",
      github: "",
      twitter: "",
      instagram: "",
    };

    if (social) {
      Object.keys(socialObjects).map((key): void => {
        if (social.includes(key)) {
          let socialHandle: string;
          if (social.includes("instagram.com")) {
            socialHandle = social.split("/")[3];
          } else {
            socialHandle =
              social.split("/")[social.split("/").length - 1] == ""
                ? social.split("/")[social.split("/").length - 2]
                : social.split("/")[social.split("/").length - 1];
          }
          socialObjects[key as keyof Social] = "@" + socialHandle;
        }
        if (socialObjects[key as keyof Social] === "") {
          delete socialObjects[key as keyof Social];
        }

        if (socialInputRef.current) socialInputRef.current.value = "";
      });

      setSocialLinks((prevSkills) => {
        return { ...prevSkills, ...socialObjects };
      });

      setSocialSuggestions((prevSkills) => {
        return { ...prevSkills, ...socialObjects };
      });
    }
  };

  const fetchSkillsAndSocials = async () => {
    if (session) {
      const skills = await action.getSkills(session);
      if (skills) {
        setSkillSuggestions(skills.skills as unknown as Skill[]);
      }
      let socials = await action.getSocial(session);
      if (socials != null) {
        const newSocials = Object.keys(socials).reduce((result, key) => {
          if (
            socials![key as keyof Social] != null &&
            key !== "id" &&
            key !== "userId"
          ) {
            result[key as keyof Partial<Social>] = socials![
              key as keyof Social
            ] as string;
          }
          return result;
        }, {} as Partial<Social>);
        setSocialSuggestions(newSocials as unknown as Social);
      }
    }
  };

  const handleSave = async () => {
    setIsSocialAndSkillSaving(true);

    if (session) {
      await action.setSkills(skillsSuggestions, session);
      var newResume = await action.setSkillsInResume(skills, resumeState);
      if (newResume) {
        await action.setSocial(socialSuggestions, session);
        newResume = await action.setSocialInResume(socialLinks, resumeState);
      }
      if (newResume) {
        saveResumeState(newResume as unknown as Resume, session);
      }
    }
    setDisabledSaveButton(true);
    setIsSocialAndSkillSaving(false);
  };

  useEffect(() => {
    if (resumeState.skills != skills || resumeState.social != socialLinks) {
      setDisabledSaveButton(false);
    } else {
      setDisabledSaveButton(true);
    }
  }, [skills, socialLinks]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (resumeState.id == "" && id != null) {
      setResumeStateById(id, session);
    }
    if (resumeState.id == "" && session) setResumeToDefaultState();
    fetchSkillsAndSocials();
  }, [session]);

  useEffect(() => {
    if (resumeState.skills) {
      setSkills(resumeState.skills);
      setDisabledSaveButton(true);
    }
    if (resumeState.social) {
      setSocialLinks(resumeState.social);
      setDisabledSaveButton(true);
    }
  }, [resumeState]);

  if (!resumeState.template == null) {
    return redirect("/create-resume/step/1");
  }

  return (
    <div className=" my-[9rem] min-h-screen w-full">
      <div className="mb-20 flex flex-col items-center justify-center">
        <h2 className="mb-3 text-center text-3xl font-bold">{Steps[2].name}</h2>
        <p>{Steps[2].desc}</p>
      </div>

      <div className="container flex min-h-screen w-full flex-col-reverse items-center justify-center gap-5 lg:flex-row lg:items-stretch">
        <section className="relative flex w-full max-w-xl flex-col items-center justify-start rounded-lg border-2 border-primary bg-white p-5 pt-10 lg:w-1/2 lg:max-w-none ">
          <div
            className="absolute right-0 top-0 cursor-pointer p-2"
            onClick={() => setShowResume(!showResume)}
          >
            <Button className="grainy-gradient2 group flex p-3 text-primary transition-all hover:border-primary hover:bg-[rgba(0,0,0,0.2)]">
              {showResume ? (
                <>
                  <EyeOff size="18" />
                </>
              ) : (
                <>
                  <Eye size="18" />
                </>
              )}
            </Button>
          </div>

          <h3 className="flex items-center justify-center text-center text-2xl font-medium">
            Add Skills & Social Links
          </h3>

          <div className="flex w-full flex-col items-center justify-evenly gap-5 ">
            <section className="container mt-10 flex w-11/12 flex-col gap-5 rounded-md  bg-secondary/60 p-10">
              <h4 className="flex items-center justify-between text-lg font-medium">
                Add Skills{" "}
                <span
                  className={`text-base ${
                    skills.length == totalSkills && "text-destructive"
                  }`}
                >
                  {skills.length}/{totalSkills}
                </span>
              </h4>

              <div>
                <SelectSkillForm
                  addSkill={handleSkills}
                  skillsLength={skills.length}
                />
              </div>

              <div>
                {skills.length > 0 && (
                  <>
                    <h4 className="mt-5 text-wrap text-lg font-medium text-primary">
                      Your Skills
                    </h4>
                    <div className="flex w-full flex-wrap gap-3 rounded-md border p-3 ">
                      {skills.map((skill, index) => (
                        <Chips
                          key={index}
                          onClick={() => {
                            setSkills((prevSkills) =>
                              prevSkills.filter((s) => s !== skill),
                            );
                          }}
                          className="cursor-pointer"
                        >
                          <span className="space-x-0.5">
                            <span>{skill.skills}</span>
                            <span className="text-[.65rem]">
                              ({skill.level.slice(0, 3)})
                            </span>
                          </span>
                        </Chips>
                      ))}
                    </div>
                  </>
                )}

                {skillsSuggestions.length > 0 && (
                  <SuggestionBox className="mt-10 border-none">
                    {skillsSuggestions.map((skill, index) => (
                      <CarouselItem
                        key={index}
                        className="flex items-center justify-center md:basis-1/3 lg:basis-1/3"
                      >
                        <Chips
                          className={`group m-1 flex items-center gap-2 border-2 border-primary transition-all hover:border-0 ${
                            skills.includes(skill) &&
                            "grainy-gradient2 border-0 text-black"
                          }`}
                          key={index}
                        >
                          <div
                            className="flex cursor-pointer items-center justify-center gap-2"
                            onClick={() => {
                              if (skills.length < totalSkills) {
                                if (
                                  skills.find(
                                    (item) => item.skills == skill.skills,
                                  )
                                ) {
                                  setSkills((prevSkills) =>
                                    prevSkills.filter(
                                      (s) => s.skills != skill.skills,
                                    ),
                                  );
                                  return;
                                }
                                setSkills((prevSkills) => [
                                  ...prevSkills,
                                  skill,
                                ]);
                              }
                            }}
                          >
                            <span className="space-x-0.5">
                              <span>{skill.skills}</span>
                              <span className="text-[.65rem]">
                                ({skill.level.slice(0, 3)})
                              </span>
                            </span>
                          </div>

                          <div
                            onClick={() => {
                              setSkillSuggestions((prevSkills) =>
                                prevSkills.filter((s) => s !== skill),
                              );
                              setDisabledSaveButton(false);
                            }}
                            className="cursor-pointer"
                          >
                            <X
                              size={18}
                              className={`rounded-full border p-[1px] ${skills.includes(skill) && "border-primary text-black"}`}
                            />
                          </div>
                        </Chips>
                      </CarouselItem>
                    ))}
                  </SuggestionBox>
                )}
              </div>
            </section>

            <Separator
              orientation="horizontal"
              className="mb-5 w-full border-separate border-t-2"
            />

            <section className="container mt-10 flex w-11/12 flex-col gap-5 rounded-md  bg-secondary/60 p-10">
              <h4 className="flex items-center justify-between text-wrap text-lg font-medium">
                Add Social Media Links
                <span
                  className={`overflow-hidden text-base ${
                    Object.keys(socialLinks).length == totalSocialLinks
                      ? "text-destructive"
                      : ""
                  }`}
                >
                  {Object.keys(socialLinks).length}/{totalSocialLinks}
                </span>
              </h4>

              <div>
                <AddSocialLinksForm addSocial={handleSocialLinks} />

                <div className="p-2 pl-0 text-sm text-muted-foreground">
                  {Object.keys(socialLinks).length > 0
                    ? "Click on link to delete"
                    : "Enter to add the links"}
                </div>
              </div>

              <div>
                {Object.keys(socialLinks).length > 0 && (
                  <>
                    <h4 className="mt-5 text-wrap text-lg font-medium text-primary">
                      Your Skills
                    </h4>
                    <div className="flex w-full flex-wrap gap-3 rounded-md border-2  p-3">
                      {Object.keys(socialLinks).map((social, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSocialLinks((prevSkills) =>
                              Object.keys(prevSkills).reduce((acc, key) => {
                                if (key !== social) {
                                  acc[key as keyof Social] =
                                    prevSkills[key as keyof Social];
                                }
                                return acc;
                              }, {} as Social),
                            );
                          }}
                          className="flex w-fit cursor-pointer items-center justify-start gap-1 rounded-lg border-2 border-primary pr-2 text-primary hover:bg-gray-200"
                        >
                          <span className="flex items-center justify-center rounded-l-md bg-primary p-1.5 text-white">
                            {socialIcons[social as keyof Social]}
                          </span>

                          <span>{socialLinks[social as keyof Social]}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {Object.keys(socialSuggestions).length > 0 && (
                  <SuggestionBox className="mt-10 border-none">
                    {Object.keys(socialSuggestions).map((social, index) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-1/3 lg:basis-1/3"
                      >
                        <Chips
                          className={`group m-1 flex cursor-pointer items-center justify-center gap-2 border-2 border-primary transition-all hover:border-0 ${
                            socialLinks[social as keyof Social] &&
                            "grainy-gradient2 border-0 text-black"
                          }`}
                          key={index}
                        >
                          <div
                            onClick={() => {
                              if (
                                Object.keys(socialLinks).length <=
                                totalSocialLinks
                              ) {
                                if (socialLinks[social as keyof Social]) return;
                                setSocialLinks((prevSkills) => {
                                  return {
                                    ...prevSkills,
                                    [social as keyof Social]:
                                      socialSuggestions[social as keyof Social],
                                  };
                                });
                              }
                            }}
                          >
                            {social}
                          </div>
                          <div
                            onClick={() => {
                              setSocialSuggestions((prevSkills) =>
                                Object.keys(prevSkills).reduce((acc, key) => {
                                  if (key !== social) {
                                    acc[key as keyof Social] =
                                      prevSkills[key as keyof Social];
                                  }
                                  return acc;
                                }, {} as Social),
                              );

                              setDisabledSaveButton(false);
                            }}
                            className="cursor-pointer"
                          >
                            <X
                              size={18}
                              className={`rounded-full border p-[1px] ${socialLinks[social as keyof Social] && "border-primary text-black"}`}
                            />
                          </div>
                        </Chips>
                      </CarouselItem>
                    ))}
                  </SuggestionBox>
                )}
              </div>
            </section>

            <Separator
              orientation="horizontal"
              className="mb-5 w-full border-t-2 border-primary"
            />

            <LoadingButton
              className="w-full max-w-sm items-center gap-5"
              disabled={disabledSaveButton}
              loading={isSocialAndSkillSaving}
              onClick={handleSave}
            >
              Save
            </LoadingButton>
          </div>
        </section>

        <section
          className={`relative max-w-xl overflow-hidden rounded-lg border-primary transition-all lg:max-w-none ${
            showResume
              ? "h-screen w-full max-w-xl border-2 p-1 lg:h-auto lg:w-1/2"
              : "h-0 max-w-xl lg:h-auto lg:w-0"
          }`}
        >
          <div
            className="relative flex h-full w-full items-center justify-center bg-white"
            // id="pdf"
          >
            <PdfDoc
              personalInfo={{
                id: "1",
                name: "John Doe",
                email: "abc@gmail.com",
                address1: "123, abc street",
                address2: "xyz city",
                phone: "1234567890",
                jobTitle: "Software Developer",
                website: "www.abc.com",
              }}
              skills={skills}
              social={socialLinks}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
