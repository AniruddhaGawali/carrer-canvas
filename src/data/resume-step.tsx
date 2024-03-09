import SelectTempleteComponent from "@/components/createResumeComponents/selectTemplateComponent";
import PersonalInformationComponent from "@/components/createResumeComponents/personalInformationComponent";
import SocialLinksAndSkillsComponent from "@/components/createResumeComponents/socialLinksAndSkillsComponent";
import { toast } from "sonner";
import * as action from "@/actions";
import ExperienceComponent from "@/components/createResumeComponents/experienceComponent";
import ProjectComponent from "@/components/createResumeComponents/projectComponent";
import EducationAndCertificationComponents from "@/components/createResumeComponents/educationAndCertificationComponents";
import templetes from "./resume-templete";

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
        await action.setResumeTemplete(resumeState.id, resumeState.template);
        return true;
      } else {
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
      const templete = templetes[resumeState.template!];

      if (!resumeState.personalInfo) {
        toast.error("Please enter your personal details");
        return false;
      }

      if (templete.personalInfo.name && !resumeState.personalInfo.name) {
        toast.error("Please enter your name");
        return false;
      }

      if (templete.personalInfo.email && !resumeState.personalInfo.email) {
        toast.error("Please enter your email");
        return false;
      }

      if (templete.personalInfo.phone && !resumeState.personalInfo.phone) {
        toast.error("Please enter your phone number");
        return false;
      }

      if (
        templete.personalInfo.jobTitle &&
        !resumeState.personalInfo.jobTitle
      ) {
        toast.error("Please enter your job title");
        return false;
      }

      if (
        templete.personalInfo.address &&
        !(
          resumeState.personalInfo.address1 && resumeState.personalInfo.address2
        )
      ) {
        toast.error("Please enter your address");
        return false;
      }

      if (templete.personalInfo.website && !resumeState.personalInfo.website) {
        toast.error("Please enter your website");
        return false;
      }

      return true;
    },
  },
  {
    name: "Social Links & Skills",
    stepNo: 3,
    desc: "Enter your social links and skills",
    component: <SocialLinksAndSkillsComponent />,
    path: "social-skills",
    validation: (resumeState: Resume) => {
      if (
        resumeState.social &&
        resumeState.skills &&
        Object.keys(resumeState.social).length > 0 &&
        resumeState.skills.length > 0
      ) {
        return true;
      }
      toast.error("Please enter your social links and skills");
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
  {
    name: "Education & Certifications",
    stepNo: 6,
    desc: "Enter your education and certifications",
    component: <EducationAndCertificationComponents />,
    path: "education-certifications",
    validation: (resumeState: Resume) => {
      return true;
    },
  },
];
