import SelectTempleteComponent from "@/components/createResumeComponents/selectTemplateComponent";
import PersonalInformationComponent from "@/components/createResumeComponents/personalInformationComponent";
import SocialLinksAndSkillsComponent from "@/components/createResumeComponents/socialLinksAndSkillsComponent";
import { toast } from "sonner";
import * as action from "@/actions";
import ExperienceComponent from "@/components/createResumeComponents/experienceComponent";
import ProjectComponent from "@/components/createResumeComponents/projectComponent";

export const StepsLinks: {
  name: string;
  stepNo: number;
  desc: string;
  component: React.ReactNode;
  path: string;
  validation: (resumeState: Resume) => Promise<boolean> | boolean;
}[] = [
  {
    name: "Select Resume Templete",
    stepNo: 1,
    desc: "Select your design template from our collection of templates",
    component: <SelectTempleteComponent />,
    path: "select-template",
    validation: async (resumeState: Resume) => {
      if (resumeState.template != null) {
        console.log("resumeState", resumeState);
        await action.setResumeTemplete(resumeState.id, resumeState.template);
        return true;
      } else {
        console.log("Please select a template");
        toast.error("Please select a template");
        return false;
      }
    },
  },
  {
    name: "Personal Details",
    stepNo: 2,
    desc: "Enter your personal details",
    component: <PersonalInformationComponent />,
    path: "personal-details",
    validation: (resumeState: Resume) => {
      console.log(
        "resumeState",
        resumeState,
        resumeState.personalInfo,
        resumeState.personalInfo != null,
      );
      if (
        resumeState.personalInfo &&
        resumeState.personalInfo.name &&
        resumeState.personalInfo.jobTitle &&
        resumeState.personalInfo.email &&
        resumeState.personalInfo.phone &&
        resumeState.personalInfo.address1 &&
        resumeState.personalInfo.address2
      ) {
        return true;
      }
      toast.error("Please enter your personal details");
      return false;
    },
  },
  {
    name: "Social Links & Skills",
    stepNo: 3,
    desc: "Enter your social links and skills",
    component: <SocialLinksAndSkillsComponent />,
    path: "social-skills",
    validation: (resumeState: Resume) => {
      if (resumeState.social && resumeState.skills) {
        return true;
      }
      return false;
    },
  },
  {
    name: "Experience",
    stepNo: 4,
    desc: "Enter your work experience",
    component: <ExperienceComponent />,
    path: "experience",
    validation: (_resumeState: Resume) => {
      return true;
    },
  },
  {
    name: "Projects",
    stepNo: 5,
    desc: "Enter your projects",
    component: <ProjectComponent />,
    path: "projects",
    validation: (_resumeState: Resume) => {
      return true;
    },
  },
  // {
  //   name: "Education",
  //   stepNo: 3,
  //   desc: "Enter your educational details",
  //   component: <></>,
  //   path: "education",
  //   validation: (resumeState: Resume) => {
  //     if (resumeState.experience) {
  //       return true;
  //     }
  //     return false;
  //   },
  // },
];
