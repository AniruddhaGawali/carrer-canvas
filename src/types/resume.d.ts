type ResumeTemplate = {
  id: number;
  templeteName: string;
  description: string;
  image: string;
  personalInfo: {
    name: boolean;
    email: boolean;
    phone: boolean;
    address: boolean;
    website: boolean;
    jobTitle: boolean;
  };
  social: 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  skills: 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
};

type Resume = {
  id: string;
  title: string;
  userId: string;
  template: number | null;
  personalInfo?: PersonalInfo | null;
  social?: Social | null;
  skills?: Skill[] | null;
};

type PersonalInfo = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  website?: string;
  jobTitle: string;
};

type Social = {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
};

type SocialLinks = {
  linkedin?: string | null;
  github?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  facebook?: string | null;
};

type Skill = {
  skills: string;
  level: "Newbie" | "Intermediate" | "Advanced" | "Expert";
};

type Experience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills: string[];
};

type Projects = {
  name: string;
  projectType: string;
  link: string;
  startDate: string;
  endDate: string;
  description: string[];
  tech: string[];
};

type Education = {
  college: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string[];
};

type AwardsAndCertifications = {
  name: string;
  date: string;
  description: string[];
};
