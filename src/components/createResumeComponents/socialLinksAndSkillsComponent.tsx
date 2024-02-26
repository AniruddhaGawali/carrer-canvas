"use client";

import { StepsLinks as Steps } from "@/data/resume-step";
import React, { useEffect, useRef, useState } from "react";
import PdfDoc from "../pdfDoc";
import useResume from "@/redux/dispatch/useResume";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import Chips from "../chips";
import { redirect } from "next/navigation";
import templetes from "@/data/resume-templete";
import { socialIcons } from "@/data/socialIcons";
import LoadingButton from "../loadingButton";
import SuggestionBox from "../suggestionBox";
import { CarouselItem } from "../ui/carousel";
import { SelectSkillForm } from "../forms/selectSkillForm";
import { SkillLevel } from "@/types/enum";
import AddSocialLinksForm from "../forms/addSocialLinksFrom";

type Props = {};

export default function SocialLinksAndSkills({}: Props) {
  const { resumeState, setResumePersonalInfo } = useResume();

  const [showResume, setShowResume] = useState<boolean>(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [socialLinks, setSocialLinks] = useState<Social>({});
  const [disabledSaveButton, setDisabledSaveButton] = useState<boolean>(true);
  const [isSocialAndSkillSaving, setIsSocialAndSkillSaving] =
    useState<boolean>(false);

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
        { skills: skill, level: level as SkillLevel },
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
    }
  };

  const handleSave = async () => {};

  useEffect(() => {
    if (skills.length > 0 || Object.keys(socialLinks).length > 0) {
      setDisabledSaveButton(false);
    } else {
      setDisabledSaveButton(true);
    }
  }, [skills, socialLinks]);

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

          <div className="flex w-full flex-col items-center justify-evenly gap-5">
            <section className="container mt-10 flex w-5/6 flex-col gap-5">
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
                <div className="flex w-full flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <Chips
                      key={index}
                      onClick={() => {
                        setSkills((prevSkills) =>
                          prevSkills.filter((s) => s !== skill),
                        );
                      }}
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

                <SuggestionBox className="border-none">
                  {skillssuggestions.map((skill, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/3 lg:basis-1/3"
                    >
                      <Chips
                        className={`group m-1 border-2 border-primary transition-all hover:border-0 ${
                          skills.includes(skill) &&
                          "grainy-gradient2 border-0 p-[2px] hover:p-0 "
                        }`}
                        key={index}
                        onClick={() => {
                          if (skills.length < totalSkills) {
                            if (
                              skills.find((item) => item.skills == skill.skills)
                            ) {
                              setSkills((prevSkills) =>
                                prevSkills.filter(
                                  (s) => s.skills != skill.skills,
                                ),
                              );
                              return;
                            }
                            setSkills((prevSkills) => [...prevSkills, skill]);
                          }
                        }}
                      >
                        <div
                          className={`flex h-full w-full items-center justify-center gap-1 rounded-sm bg-primary text-start transition-all group-hover:bg-transparent group-hover:text-white ${
                            skills.includes(skill) && "bg-white text-black"
                          }`}
                        >
                          <span className="space-x-0.5">
                            <span>{skill.skills}</span>
                            <span className="text-[.65rem]">
                              ({skill.level.slice(0, 3)})
                            </span>
                          </span>
                        </div>
                      </Chips>
                    </CarouselItem>
                  ))}
                </SuggestionBox>
              </div>
            </section>

            <section className="container mt-10 flex flex-col gap-5 md:w-5/6">
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
                <div className="flex w-full flex-col flex-wrap gap-3">
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

                <SuggestionBox className="border-none">
                  {Object.keys(socialsuggestions).map((social, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/3 lg:basis-1/3"
                    >
                      <Chips
                        className={`group m-1 border-2 border-primary transition-all hover:border-0 ${
                          socialLinks[social as keyof Social] &&
                          "grainy-gradient2 border-0 p-[2px] hover:p-0 "
                        }`}
                        key={index}
                        onClick={() => {
                          if (
                            Object.keys(socialLinks).length <= totalSocialLinks
                          ) {
                            if (socialLinks[social as keyof Social]) return;
                            setSocialLinks((prevSkills) => {
                              return {
                                ...prevSkills,
                                [social as keyof Social]:
                                  socialsuggestions[social as keyof Social],
                              };
                            });
                          }
                        }}
                      >
                        <div
                          className={`flex h-full w-full items-center justify-center text-wrap rounded-sm bg-primary transition-all group-hover:bg-transparent group-hover:text-white ${
                            socialLinks[social as keyof Social] &&
                            "bg-white text-black"
                          }`}
                        >
                          {social}
                        </div>
                      </Chips>
                    </CarouselItem>
                  ))}
                </SuggestionBox>
              </div>
            </section>

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
            id="pdf"
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
            />
          </div>
        </section>
      </div>
    </div>
  );
}

const skillssuggestions: Skill[] = [
  { skills: "React", level: SkillLevel.Expert },
  { skills: "Node", level: SkillLevel.Expert },
  { skills: "Express", level: SkillLevel.Expert },
  { skills: "MongoDB", level: SkillLevel.Expert },
  { skills: "TypeScript", level: SkillLevel.Expert },
  { skills: "JavaScript", level: SkillLevel.Expert },
  { skills: "HTML", level: SkillLevel.Expert },
  { skills: "CSS", level: SkillLevel.Expert },
  { skills: "SASS", level: SkillLevel.Expert },
  { skills: "Tailwind CSS", level: SkillLevel.Expert },
  { skills: "Bootstrap", level: SkillLevel.Expert },
  { skills: "Material UI", level: SkillLevel.Expert },
  { skills: "Chakra UI", level: SkillLevel.Expert },
  { skills: "React Native", level: SkillLevel.Expert },
  { skills: "Next.js", level: SkillLevel.Expert },
  { skills: "Gatsby", level: SkillLevel.Expert },
  { skills: "GraphQL", level: SkillLevel.Expert },
  { skills: "Apollo", level: SkillLevel.Expert },
  { skills: "REST API", level: SkillLevel.Expert },
  { skills: "Firebase", level: SkillLevel.Expert },
  { skills: "AWS", level: SkillLevel.Expert },
  { skills: "Azure", level: SkillLevel.Expert },
  { skills: "Google Cloud", level: SkillLevel.Expert },
  { skills: "Heroku", level: SkillLevel.Expert },
  { skills: "Netlify", level: SkillLevel.Expert },
  { skills: "Vercel", level: SkillLevel.Expert },
  { skills: "Jest", level: SkillLevel.Expert },
  { skills: "Mocha", level: SkillLevel.Expert },
  { skills: "Chai", level: SkillLevel.Expert },
  { skills: "Cypress", level: SkillLevel.Expert },
  { skills: "Puppeteer", level: SkillLevel.Expert },
  { skills: "Selenium", level: SkillLevel.Expert },
  { skills: "Jasmine", level: SkillLevel.Expert },
  { skills: "Karma", level: SkillLevel.Expert },
  { skills: "React Testing Library", level: SkillLevel.Expert },
];

const socialsuggestions = {
  linkedin: "https://www.linkedin.com/in/username",
  github: "https://www.github.com/username",
  twitter: "https://www.twitter.com/username",
  instagram: "https://www.instagram.com/username",
};
