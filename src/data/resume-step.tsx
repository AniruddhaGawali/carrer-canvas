import SelectTemplete from "@/components/createResumeComponents/selectTemplateComponent";
import { toast } from "sonner";

export const StepsLinks: {
  name: string;
  stepNo: number;
  desc: string;
  component: React.ReactNode;
  path: string;
  validation: (resumeState: Resume) => boolean;
}[] = [
  {
    name: "Select Resume Templete",
    stepNo: 1,
    desc: "Select your design template from our collection of templates",
    component: <SelectTemplete />,
    path: "select-template",
    validation: (resumeState: Resume) => {
      if (resumeState.template != null) {
        return true;
      }
      toast.error("Please select a template");
      return false;
    },
  },
  {
    name: "Personal Details",
    stepNo: 2,
    desc: "Enter your personal details",
    component: <SelectTemplete />,
    path: "personal-details",
    validation: (resumeState: Resume) => {
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
    component: <SelectTemplete />,
    path: "social-skills",
    validation: (resumeState: Resume) => {
      if (resumeState.social && resumeState.skills) {
        return true;
      }
      return false;
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
